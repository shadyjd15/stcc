import type { Payload, PayloadRequest } from 'payload'

import type { Vendor, VendorSetting } from '@/payload-types'
import { composeEmail } from '@/lib/email/compose'
import { queueEmail } from '@/lib/email/send'
import { getEmailSettings } from '@/lib/email/settings'
import { statusLabel, timelineSteps, TRANSITIONS, type VendorStatus } from './constants'

export async function getVendorSettings(payload: Payload, req?: PayloadRequest): Promise<VendorSetting> {
  return payload.findGlobal({ slug: 'vendor-settings', overrideAccess: true, depth: 0, req })
}

/** Documents required for this vendor's type (as configured in Vendor settings) */
export const requiredDocTypes = (settings: VendorSetting, vendorType?: string | null) =>
  (settings.documentTypes || []).filter(
    (d) => d.required && (!d.requiredFor?.length || (vendorType && d.requiredFor.includes(vendorType as never))),
  )

type Check = { key: string; label: string; ok: boolean; step: number }

/** What is still missing before the vendor can submit; also drives the completeness % */
export function completenessChecks(v: Partial<Vendor>, settings: VendorSetting): Check[] {
  const c: Check[] = [
    { key: 'companyName', label: 'Company name', ok: Boolean(v.companyName), step: 1 },
    { key: 'vendorType', label: 'Vendor type', ok: Boolean(v.vendorType), step: 1 },
    { key: 'city', label: 'City', ok: Boolean(v.city), step: 1 },
    { key: 'primaryContact', label: 'Primary contact details', ok: Boolean(v.primaryContact?.name && v.primaryContact?.email && v.primaryContact?.phone), step: 2 },
    { key: 'crNumber', label: 'Commercial Registration number', ok: Boolean(v.crNumber), step: 3 },
    { key: 'crExpiry', label: 'CR expiry date', ok: Boolean(v.crExpiry), step: 3 },
    { key: 'vatNumber', label: 'VAT number', ok: Boolean(v.vatNumber) || v.country !== 'Saudi Arabia', step: 3 },
    { key: 'categories', label: 'At least one category', ok: Boolean(v.categories?.length), step: 4 },
    { key: 'bank', label: 'Bank name, account holder and IBAN', ok: Boolean(v.bankName && v.accountHolder && v.iban), step: 5 },
  ]
  for (const d of requiredDocTypes(settings, v.vendorType)) {
    const doc = (v.documents || []).find((x) => x.docType === d.key && x.reviewStatus !== 'rejected')
    c.push({
      key: `doc:${d.key}`,
      label: d.label,
      ok: Boolean(doc?.file) && (!d.requiresExpiry || Boolean(doc?.expiryDate)),
      step: 6,
    })
  }
  c.push({
    key: 'declaration',
    label: 'Declarations and signature',
    ok: Boolean(v.acceptCodeOfConduct && v.acceptHse && v.signatoryName && v.signature),
    step: 7,
  })
  return c
}

export const completenessPercent = (checks: Check[]) =>
  checks.length ? Math.round((checks.filter((c) => c.ok).length / checks.length) * 100) : 0

export const canTransition = (from: string | null | undefined, to: VendorStatus) =>
  (TRANSITIONS[(from || 'draft') as VendorStatus] || []).includes(to)

const nextNumber = async (payload: Payload, field: 'referenceNumber' | 'vendorCode', prefix: string, withYear: boolean) => {
  const year = new Date().getFullYear()
  const base = withYear ? `${prefix}-${year}-` : `${prefix}-`
  const latest = await payload.find({
    collection: 'vendors',
    where: { [field]: { like: base } },
    sort: `-${field}`,
    limit: 1,
    depth: 0,
    overrideAccess: true,
    select: { [field]: true },
  })
  const last = (latest.docs[0] as unknown as Record<string, string> | undefined)?.[field]
  const n = last ? Number(last.slice(base.length)) + 1 : 1
  return `${base}${String(n).padStart(withYear ? 5 : 4, '0')}`
}

/**
 * Moves a vendor to a new status, records history and emails the vendor (and the team on
 * submission). The single place every status change goes through.
 */
export async function transitionVendor(
  payload: Payload,
  vendorId: string | number,
  to: VendorStatus,
  opts: { by: string; note?: string; notifyVendor?: boolean; req?: PayloadRequest; skipValidation?: boolean },
): Promise<Vendor> {
  const vendor = (await payload.findByID({ collection: 'vendors', id: vendorId, depth: 0, overrideAccess: true, req: opts.req })) as Vendor
  const from = (vendor.status || 'draft') as VendorStatus
  if (!opts.skipValidation && !canTransition(from, to)) {
    throw new Error(`Cannot move a vendor from "${statusLabel(from)}" to "${statusLabel(to)}"`)
  }
  const settings = await getVendorSettings(payload, opts.req)
  const now = new Date().toISOString()
  const data: Partial<Vendor> = { status: to }

  if (to === 'submitted' && !vendor.referenceNumber) {
    data.referenceNumber = await nextNumber(payload, 'referenceNumber', settings.referencePrefix || 'VR', true)
  }
  if (to === 'submitted') data.submittedAt = now
  if (to === 'approved') {
    data.approvedAt = now
    if (!vendor.vendorCode) data.vendorCode = await nextNumber(payload, 'vendorCode', settings.vendorCodePrefix || 'STCC-V', false)
    const months = settings.approvalValidityMonths || 24
    const until = new Date()
    until.setMonth(until.getMonth() + months)
    data.validUntil = until.toISOString()
    // documents that were pending are accepted with the approval
    data.documents = (vendor.documents || []).map((d) => ({ ...d, reviewStatus: d.reviewStatus === 'pending' ? 'accepted' : d.reviewStatus }))
  }

  const notify = opts.notifyVendor !== false
  data.statusHistory = [
    ...(vendor.statusHistory || []),
    { status: to, at: now, by: opts.by, note: opts.note || undefined, notified: notify },
  ]

  const updated = (await payload.update({
    collection: 'vendors',
    id: vendor.id,
    data,
    overrideAccess: true,
    depth: 0,
    req: opts.req,
    context: { vendorTransition: true },
  })) as Vendor

  const emailSettings = await getEmailSettings(payload)
  const portalUrl = `${emailSettings.brand.siteUrl}/vendor-portal`
  const vars = {
    companyName: updated.companyName,
    contactName: updated.primaryContact?.name || updated.companyName,
    reference: updated.referenceNumber || '',
    vendorCode: updated.vendorCode || '',
    status: statusLabel(to),
    note: opts.note || '',
    portalUrl,
  }

  if (notify) {
    const tpl = (settings.statusEmails || []).find((t) => t.status === to && t.enabled !== false)
    if (tpl) {
      const recipients = [updated.email, updated.primaryContact?.email].filter(Boolean) as string[]
      const { subject, html } = await composeEmail(payload, tpl, vars, {
        eyebrow: `Vendor registration · ${updated.referenceNumber || ''}`,
        steps: to === 'rejected' || to === 'suspended' ? undefined : timelineSteps(to),
        details: [
          { label: 'Company', value: updated.companyName },
          { label: 'Reference', value: updated.referenceNumber || '' },
          ...(updated.vendorCode ? [{ label: 'Vendor code', value: updated.vendorCode }] : []),
          { label: 'Status', value: statusLabel(to) },
          ...(opts.note ? [{ label: 'Message from STCC', value: opts.note }] : []),
        ],
        cta: { label: 'Open vendor portal', url: portalUrl },
      })
      await queueEmail(payload, { to: [...new Set(recipients)], subject, html, category: `vendors.${to}`, related: { collection: 'vendors', id: updated.id } }, opts.req)
    }
  }

  // Tell procurement about new and re-submitted registrations
  if (to === 'submitted' || (from === 'clarification' && to === 'document_review')) {
    const staff = await payload.find({
      collection: 'users',
      where: { 'notifications.newVendors': { equals: true } },
      overrideAccess: true,
      depth: 0,
      limit: 50,
      select: { email: true },
    })
    const tpl = settings.newSubmission || {}
    const { subject, html } = await composeEmail(
      payload,
      {
        subject:
          from === 'clarification'
            ? 'Vendor re-submitted after clarification · {{companyName}} ({{reference}})'
            : tpl.subject || 'Vendor registration · {{companyName}}',
        body: (from === 'clarification' ? 'Updated information has been provided by **{{companyName}}** after a clarification request.' : tpl.body) || '' },
      vars,
      {
        eyebrow: 'Procurement · Vendor registration',
        details: [
          { label: 'Company', value: updated.companyName },
          { label: 'Type', value: updated.vendorType || '' },
          { label: 'CR number', value: updated.crNumber || '' },
          { label: 'Categories', value: (updated.categories || []).join(', ') },
          { label: 'Completeness', value: `${updated.completeness ?? 0}%` },
          { label: 'Contact', value: [updated.primaryContact?.name, updated.primaryContact?.phone].filter(Boolean).join(' · ') },
        ],
        cta: { label: 'Review in CMS', url: `${emailSettings.brand.siteUrl}/admin/collections/vendors/${updated.id}` },
      },
    )
    await queueEmail(
      payload,
      {
        to: [...new Set([...emailSettings.recipients.vendors, ...staff.docs.map((s) => s.email)])],
        subject,
        html,
        replyTo: updated.email,
        category: 'vendors.team-notification',
        related: { collection: 'vendors', id: updated.id },
      },
      opts.req,
    )
  }

  return updated
}
