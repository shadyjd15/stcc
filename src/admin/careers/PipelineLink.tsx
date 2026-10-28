import type { Payload } from 'payload'
import React from 'react'

import { STAGES } from '@/collections/careers/Applications'

import '../admin.css'

/** Shown above the applications list: stage counts + link to the board */
export async function PipelineLink({ payload }: { payload: Payload }) {
  const admin = payload.config.routes.admin
  const counts = await Promise.all(
    STAGES.filter((s) => s.value !== 'withdrawn').map(async (s) => ({
      ...s,
      n: (await payload.count({ collection: 'applications', where: { stage: { equals: s.value } }, overrideAccess: true })).totalDocs,
    })),
  )
  return (
    <div className="stcc-strip stcc-strip--list" style={{ marginTop: 12 }}>
      <a href={`${admin}/careers-pipeline`} style={{ fontWeight: 600, borderColor: 'var(--stcc-accent)' }}>
        Open pipeline board →
      </a>
      {counts.map((c) => (
        <a key={c.value} href={`${admin}/collections/applications?where[stage][equals]=${c.value}`}>
          {c.label} <b>{c.n}</b>
        </a>
      ))}
    </div>
  )
}
