import { DefaultTemplate } from '@payloadcms/next/templates'
import { Gutter } from '@payloadcms/ui'
import { redirect } from 'next/navigation'
import type { AdminViewServerProps } from 'payload'
import React from 'react'

import { userHasRole } from '@/access'

import { PipelineBoard } from './PipelineBoard'

import '../admin.css'

/** /admin/careers-pipeline – kanban + ranked view across jobs */
export async function PipelineView({ initPageResult, params, searchParams }: AdminViewServerProps) {
  const { req, visibleEntities, permissions, locale } = initPageResult
  const { payload, user, i18n } = req
  if (!user) redirect(`${payload.config.routes.admin}/login`)
  const allowed = userHasRole(user, 'hr', 'analyst')

  const jobs = allowed
    ? await payload.find({
        collection: 'job-openings',
        limit: 200,
        depth: 0,
        sort: '-updatedAt',
        overrideAccess: true,
        select: { title: true, status: true },
      })
    : { docs: [] }

  const counts = allowed
    ? await Promise.all(
        jobs.docs.map(async (j) => ({
          id: j.id,
          n: (await payload.count({ collection: 'applications', where: { job: { equals: j.id } }, overrideAccess: true })).totalDocs,
        })),
      )
    : []

  const initialJob = typeof searchParams?.job === 'string' ? searchParams.job : ''

  return (
    <DefaultTemplate
      i18n={i18n}
      locale={locale}
      params={params}
      payload={payload}
      permissions={permissions}
      searchParams={searchParams}
      user={user}
      visibleEntities={visibleEntities}
    >
      <Gutter className="stcc-view">
        <div className="stcc-view__head">
          <div>
            <h1>Careers pipeline</h1>
            <p className="stcc-muted" style={{ margin: 0 }}>
              Drag candidates between stages, or switch to the ranked list to find the closest matches.
            </p>
          </div>
        </div>
        {allowed ? (
          <PipelineBoard
            jobs={jobs.docs.map((j) => ({
              id: j.id,
              title: j.title,
              status: j.status ?? null,
              count: counts.find((c) => c.id === j.id)?.n ?? 0,
            }))}
            initialJob={initialJob}
          />
        ) : (
          <div className="stcc-empty">You need the HR role to view the careers pipeline.</div>
        )}
      </Gutter>
    </DefaultTemplate>
  )
}
