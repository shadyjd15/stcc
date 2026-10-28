import type { Endpoint } from 'payload'
import { z } from 'zod'

import type { Vendor } from '@/payload-types'
import { isVendorUser, userHasRole } from '@/access'
import { getClientIp } from '@/lib/cloudflare'
import { guardPublicRequest, json, MIME_FOR, safeFilename, sniffFileType } from '@/lib/publicGuard'
import { recordServerEvent } from '@/lib/analytics/record'
import { EDITABLE_BY_VENDOR, statusLabel, timelineSteps, VENDOR_STATUSES, type VendorStatus } from './constants'
import { completenessChecks, completenessPercent, getVendorSettings, transitionVendor } from './workflow'

const registerSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(160),
  password: z
    .string()
    .min(10, 'Password must be at least 10 characters')
    .max(128)
    .regex(/[A-Za-z]/, 'Password needs a letter')
    .regex(/[0-9]/, 'Password needs a number'),
  companyName: z.string().trim().min(2).max(200),
  contactName: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(6).max(40),
  vendorType: z.enum(['manufacturer', 'distributor', 'subcontractor', 'service', 'consultant']),
  crNumber: z.string().trim().max(40).optional(),
})

const register: Endpoint = {
  path: '/register',
  method: 'post',
  handler: async (req) => {
    const body = (await req.json!().catch(() => ({}))) as Record<string, string>
    const blocked = await guardPublicRequest(req, {
      key: 'vendor-register',
      limit: 5,
      windowMs: 30 * 60_000,
      turnstileToken: body['cf-turnstile-response'],
      honeypot: body.website,
    })
    if (blocked) return blocked
    const parsed = registerSchema.safeParse(body)
    if (!parsed.success) return json({ ok: false, error: parsed.error.issues[0].message, field: parsed.error.issues[0].path[0] }, 400)
    const d = parsed.data

    const existing = await req.payload.count({ collection: 'vendors', where: { email: { equals: d.email } }, overrideAccess: true })
    if (existing.totalDocs) {
      return json({ ok: false, error: 'An account with this email already exists. Please sign in or reset your password.', field: 'email' }, 409)
    }
    if (d.crNumber) {
      const crDupe = await req.payload.count({ collection: 'vendors', where: { crNumber: { equals: d.crNumber } }, overrideAccess: true })
      if (crDupe.totalDocs) return json({ ok: false, error: 'A registration with this CR number already exists. Please contact procurement.', field: 'crNumber' }, 409)
    }

    await req.payload.create({
      collection: 'vendors',
      overrideAccess: true,
      req,
      data: {
        email: d.email,
        password: d.password,
        companyName: d.companyName,
        vendorType: d.vendorType,
        crNumber: d.crNumber,
        primaryContact: { name: d.contactName, email: d.email, phone: d.phone },
        status: 'draft',
      },
    })
    void recordServerEvent(req, { name: 'vendor_signup', path: '/vendor-registration' })
    return json({ ok: true }, 201)
  },
}

/** Everything the portal dashboard needs in one call */
const portal: Endpoint = {
  path: '/portal',
  method: 'get',
  handler: async (req) => {
    if (!isVendorUser(req.user)) return json({ ok: false, error: 'Please sign in' }, 401)
    const vendor = (await req.payload.findByID({ collection: 'vendors', id: req.user!.id, depth: 1, overrideAccess: false, user: req.user })) as Vendor
    const settings = await getVendorSettings(req.payload)
    const checks = completenessChecks(vendor, settings)
    return json({
      ok: true,
      vendor,
      status: { value: vendor.status, label: statusLabel(vendor.status), editable: EDITABLE_BY_VENDOR.includes((vendor.status || 'draft') as VendorStatus) },
      timeline: vendor.status === 'draft' ? null : timelineSteps(vendor.status || 'draft'),
      checks,
      completeness: completenessPercent(checks),
      documentTypes: settings.documentTypes || [],
      categories: (settings.categories || []).map((c) => c.label),
      history: (vendor.statusHistory || []).filter((h) => h.notified).map((h) => ({ status: statusLabel(h.status), at: h.at, note: h.note })),
    })
  },
}

const submit: Endpoint = {
  path: '/submit',
  method: 'post',
  handler: async (req) => {
    if (!isVendorUser(req.user)) return json({ ok: false, error: 'Please sign in' }, 401)
    const vendor = (await req.payload.findByID({ collection: 'vendors', id: req.user!.id, depth: 0, overrideAccess: true })) as Vendor
    const status = (vendor.status || 'draft') as VendorStatus
    if (!EDITABLE_BY_VENDOR.includes(status)) return json({ ok: false, error: 'This registration has already been submitted.' }, 409)
    const settings = await getVendorSettings(req.payload)
    const missing = completenessChecks(vendor, settings).filter((c) => !c.ok)
    if (missing.length) return json({ ok: false, error: 'Please complete all required items first.', missing }, 400)

    await req.payload.update({
      collection: 'vendors',
      id: vendor.id,
      overrideAccess: true,
      context: { vendorSystem: true },
      data: { declaredAt: new Date().toISOString(), declaredIp: getClientIp(req.headers) },
    })
    const updated = await transitionVendor(req.payload, vendor.id, status === 'draft' ? 'submitted' : 'document_review', {
      by: `vendor: ${vendor.email}`,
      note: status === 'clarification' ? 'Vendor provided the requested information.' : undefined,
      notifyVendor: true,
    })
    void recordServerEvent(req, { name: 'vendor_submitted', path: '/vendor-portal' })
    return json({ ok: true, reference: updated.referenceNumber, status: updated.status })
  },
}

const uploadDocument: Endpoint = {
  path: '/upload-document',
  method: 'post',
  handler: async (req) => {
    if (!isVendorUser(req.user)) return json({ ok: false, error: 'Please sign in' }, 401)
    const vendor = (await req.payload.findByID({ collection: 'vendors', id: req.user!.id, depth: 0, overrideAccess: true })) as Vendor
    const status = (vendor.status || 'draft') as VendorStatus
    if (![...EDITABLE_BY_VENDOR, 'approved'].includes(status)) {
      return json({ ok: false, error: 'Documents cannot be changed while your registration is under review.' }, 403)
    }
    const form = await req.formData!()
    const docType = String(form.get('docType') || '')
    const settings = await getVendorSettings(req.payload)
    const type = (settings.documentTypes || []).find((d) => d.key === docType)
    if (!type) return json({ ok: false, error: 'Unknown document type' }, 400)
    const file = form.get('file')
    if (!(file instanceof File) || !file.size) return json({ ok: false, error: 'Please choose a file' }, 400)
    if (file.size > 10 * 1024 * 1024) return json({ ok: false, error: 'Files must be 10 MB or smaller' }, 400)
    const buffer = Buffer.from(await file.arrayBuffer())
    const kind = sniffFileType(buffer)
    if (!kind || !['pdf', 'png', 'jpg', 'webp'].includes(kind)) return json({ ok: false, error: 'Upload a PDF, PNG or JPG' }, 400)
    const expiryDate = String(form.get('expiryDate') || '') || undefined
    if (type.requiresExpiry && !expiryDate) return json({ ok: false, error: 'Please enter the expiry date' }, 400)

    const stored = await req.payload.create({
      collection: 'vendor-documents',
      overrideAccess: true,
      data: { owner: vendor.id, docType },
      file: { data: buffer, mimetype: MIME_FOR[kind], name: safeFilename(`${vendor.companyName}-${docType}`, kind), size: buffer.length },
    })

    const rows = (vendor.documents || []).filter((d) => d.docType !== docType)
    rows.push({
      docType,
      file: stored.id,
      number: String(form.get('number') || '') || undefined,
      issueDate: String(form.get('issueDate') || '') || undefined,
      expiryDate,
      reviewStatus: 'pending',
    })
    await req.payload.update({
      collection: 'vendors',
      id: vendor.id,
      overrideAccess: true,
      context: { vendorSystem: true },
      data: { documents: rows.map((r) => ({ ...r, file: typeof r.file === 'object' ? r.file?.id : r.file })) },
    })
    // remove the replaced file
    const replaced = (vendor.documents || []).find((d) => d.docType === docType)
    const replacedId = replaced ? (typeof replaced.file === 'object' ? replaced.file?.id : replaced.file) : null
    if (replacedId) await req.payload.delete({ collection: 'vendor-documents', id: replacedId, overrideAccess: true }).catch(() => null)

    return json({ ok: true })
  },
}

const transition: Endpoint = {
  path: '/:id/transition',
  method: 'post',
  handler: async (req) => {
    if (!userHasRole(req.user, 'procurement')) return json({ ok: false, error: 'Forbidden' }, 403)
    const body = (await req.json!().catch(() => ({}))) as { to?: string; note?: string; notify?: boolean }
    const to = body.to as VendorStatus
    if (!VENDOR_STATUSES.some((s) => s.value === to)) return json({ ok: false, error: 'Unknown status' }, 400)
    try {
      const user = req.user as { name?: string; email?: string }
      const vendor = await transitionVendor(req.payload, req.routeParams!.id as string, to, {
        by: user.name || user.email || 'staff',
        note: body.note?.slice(0, 2000),
        notifyVendor: body.notify !== false,
      })
      return json({ ok: true, status: vendor.status, vendorCode: vendor.vendorCode })
    } catch (err) {
      return json({ ok: false, error: err instanceof Error ? err.message : String(err) }, 400)
    }
  },
}

export const vendorEndpoints: Endpoint[] = [register, portal, submit, uploadDocument, transition]
