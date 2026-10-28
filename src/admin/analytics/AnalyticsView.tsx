import { DefaultTemplate } from '@payloadcms/next/templates'
import { Gutter } from '@payloadcms/ui'
import { redirect } from 'next/navigation'
import type { AdminViewServerProps } from 'payload'
import React from 'react'

import { userHasRole } from '@/access'

import { AnalyticsDashboard } from './AnalyticsDashboard'

import '../admin.css'

/** /admin/analytics */
export async function AnalyticsView({ initPageResult, params, searchParams }: AdminViewServerProps) {
  const { req, visibleEntities, permissions, locale } = initPageResult
  const { payload, user, i18n } = req
  if (!user) redirect(`${payload.config.routes.admin}/login`)

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
            <h1>Analytics</h1>
            <p className="stcc-muted" style={{ margin: 0 }}>
              First-party and cookie-free: no consent banner needed, nothing shared with third parties. Click any row to filter.
            </p>
          </div>
        </div>
        {userHasRole(user, 'analyst', 'editor') ? (
          <AnalyticsDashboard />
        ) : (
          <div className="stcc-empty">You need the Analyst or Editor role to view analytics.</div>
        )}
      </Gutter>
    </DefaultTemplate>
  )
}
