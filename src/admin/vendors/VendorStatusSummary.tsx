import type { Payload } from 'payload'
import React from 'react'

import { VENDOR_STATUSES } from '@/lib/vendors/constants'

import '../admin.css'

const isoFromNow = (days: number) => new Date(Date.now() + days * 86400_000).toISOString()

/** Counts per status above the vendors list; each chip filters the list */
export async function VendorStatusSummary({ payload }: { payload: Payload }) {
  const counts = await Promise.all(
    VENDOR_STATUSES.map(async (s) => ({
      ...s,
      n: (await payload.count({ collection: 'vendors', where: { status: { equals: s.value } }, overrideAccess: true })).totalDocs,
    })),
  )
  const admin = payload.config.routes.admin
  const visible = counts.filter((c) => c.n > 0 || ['submitted', 'document_review', 'approved'].includes(c.value))
  const expiring = await payload.count({
    collection: 'vendors',
    overrideAccess: true,
    where: {
      'documents.expiryDate': {
        less_than: isoFromNow(30),
        greater_than: isoFromNow(0),
      },
    },
  }).catch(() => ({ totalDocs: 0 }))

  return (
    <div className="stcc-strip stcc-strip--list" style={{ marginTop: 12 }}>
      {visible.map((c) => (
        <a key={c.value} href={`${admin}/collections/vendors?where[status][equals]=${c.value}`}>
          <i className={`stcc-dot stcc-dot--${c.value}`} />
          {c.label} <b>{c.n}</b>
        </a>
      ))}
      {expiring.totalDocs ? (
        <a href={`${admin}/collections/vendors?where[documents.expiryDate][less_than]=${isoFromNow(30).slice(0, 10)}`}>
          ⚠ Vendors with documents expiring in 30 days <b>{expiring.totalDocs}</b>
        </a>
      ) : null}
    </div>
  )
}
