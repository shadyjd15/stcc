import type { CollectionAfterChangeHook, CollectionBeforeChangeHook } from 'payload'
import { APIError } from 'payload'

import type { Vendor } from '@/payload-types'
import { isVendorUser } from '@/access'
import { EDITABLE_BY_VENDOR, type VendorStatus } from './constants'
import { completenessChecks, completenessPercent, getVendorSettings } from './workflow'

const PROTECTED: (keyof Vendor)[] = [
  'status',
  'referenceNumber',
  'vendorCode',
  'submittedAt',
  'approvedAt',
  'validUntil',
  'assignedTo',
  'riskRating',
  'performanceScore',
  'internalNotes',
  'statusHistory',
  'completeness',
  'declaredAt',
  'declaredIp',
]

export const vendorBeforeChange: CollectionBeforeChangeHook<Vendor> = async ({ data, originalDoc, req, operation }) => {
  const { payload } = req

  if (isVendorUser(req.user) && operation === 'update' && !req.context.vendorTransition && !req.context.vendorSystem) {
    const status = (originalDoc?.status || 'draft') as VendorStatus
    const touchesProfile = Object.keys(data).some((k) => !['password', 'documents', 'updatedAt'].includes(k))
    if (touchesProfile && !EDITABLE_BY_VENDOR.includes(status)) {
      throw new APIError(
        'Your registration is being reviewed. You can update it if STCC asks for clarification.',
        403,
        null,
        true,
      )
    }
    for (const key of PROTECTED) delete (data as Record<string, unknown>)[key]

    // Vendors cannot accept their own documents
    if (Array.isArray(data.documents)) {
      const prev = new Map((originalDoc?.documents || []).map((d) => [d.id, d]))
      data.documents = data.documents.map((d) => {
        const old = d.id ? prev.get(d.id) : undefined
        const sameFile = old && (typeof old.file === 'object' ? old.file?.id : old.file) === (typeof d.file === 'object' ? d.file?.id : d.file)
        return {
          ...d,
          reviewStatus: sameFile ? old!.reviewStatus : 'pending',
          reviewNote: sameFile ? old!.reviewNote : undefined,
        }
      })
      // Every referenced file must belong to this vendor
      const ids = data.documents.map((d) => (typeof d.file === 'object' ? d.file?.id : d.file)).filter(Boolean)
      if (ids.length) {
        const owned = await payload.count({
          collection: 'vendor-documents',
          where: { and: [{ id: { in: ids } }, { owner: { equals: req.user!.id } }] },
          overrideAccess: true,
          req,
        })
        if (owned.totalDocs !== new Set(ids).size) throw new APIError('Invalid document reference', 400, null, true)
      }
    }
  }

  // Internal notes: stamp author/time
  if (Array.isArray(data.internalNotes)) {
    data.internalNotes = data.internalNotes.map((n) => ({
      ...n,
      createdAt: n.createdAt || new Date().toISOString(),
      author: n.author || (isVendorUser(req.user) ? undefined : req.user?.id),
    }))
  }

  // Keep completeness % up to date for list views and the portal
  try {
    const settings = await getVendorSettings(payload, req)
    const merged = { ...(originalDoc || {}), ...data } as Partial<Vendor>
    data.completeness = completenessPercent(completenessChecks(merged, settings))
  } catch {
    /* settings not available during first migration */
  }
  return data
}

export const vendorAfterChange: CollectionAfterChangeHook<Vendor> = ({ doc }) => doc
