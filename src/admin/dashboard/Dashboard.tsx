'use client'
import { useAuth, useConfig } from '@payloadcms/ui'
import React, { useEffect, useState } from 'react'

import { TrafficChart, type Point } from '../analytics/Charts'
import { delta, duration, num } from '../analytics/format'

import '../admin.css'

type Stats = {
  applicationsThisWeek: number | null
  applicationsNew: number | null
  openJobs: number | null
  vendorsInReview: number | null
  vendorsClarification: number | null
  formSubmissionsThisWeek: number | null
  failedEmailsThisWeek: number | null
  analytics: {
    current: { visitors: number; pageviews: number; avgDurationSec: number; conversions: number }
    previous: { visitors: number; pageviews: number; avgDurationSec: number; conversions: number } | null
    series: Point[]
    realtime: { visitors: number }
    pages: { key: string; visitors: number }[]
  } | null
  drafts: { id: number; title: string; updatedAt: string }[] | null
}

const greeting = () => {
  const h = new Date().getHours()
  return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'
}

function Tile({ label, value, href, alert, sub }: { label: string; value: number | string | null; href?: string; alert?: boolean; sub?: React.ReactNode }) {
  if (value === null) return null
  const Tag = href ? 'a' : 'div'
  return (
    <Tag className={`stcc-card stcc-kpi ${alert ? 'stcc-kpi--alert' : ''}`} {...(href ? { href } : {})}>
      <div className="stcc-kpi__label">{label}</div>
      <div className="stcc-kpi__value">{value}</div>
      {sub ? <div className="stcc-kpi__delta">{sub}</div> : null}
    </Tag>
  )
}

/** Above the collection cards on the CMS home */
export const Dashboard: React.FC = () => {
  const { user } = useAuth()
  const {
    config: {
      routes: { admin, api },
    },
  } = useConfig()
  const [s, setS] = useState<Stats | null>(null)

  useEffect(() => {
    fetch(`${api}/admin-tools/dashboard`, { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : null))
      .then(setS)
      .catch(() => setS(null))
  }, [api])

  const name = (user as { name?: string })?.name?.split(' ')[0]
  const a = s?.analytics
  const d = (cur?: number, prev?: number) => {
    const x = delta(cur, prev)
    return x ? <span className={x.good ? 'stcc-up' : 'stcc-down'}>{x.text} vs last week</span> : null
  }

  const quick = [
    { label: 'New page', href: `${admin}/collections/pages/create` },
    { label: 'Upload images', href: `${admin}/collections/media` },
    { label: 'Post a job', href: `${admin}/collections/job-openings/create` },
    { label: 'Edit menu', href: `${admin}/globals/header` },
    { label: 'Email settings', href: `${admin}/globals/email-settings` },
  ]

  return (
    <div className="stcc-section" style={{ marginTop: 8 }}>
      <div className="stcc-view__head" style={{ marginBottom: 16 }}>
        <div>
          <h2 style={{ margin: 0 }}>
            {greeting()}
            {name ? `, ${name}` : ''}
          </h2>
          <p className="stcc-muted" style={{ margin: '4px 0 0' }}>
            Here’s what happened on stcc.sa in the last 7 days.
          </p>
        </div>
        <div className="stcc-toolbar" style={{ margin: 0 }}>
          {quick.map((q) => (
            <a key={q.href} className="stcc-btn" href={q.href}>
              {q.label}
            </a>
          ))}
        </div>
      </div>

      {!s ? (
        <div className="stcc-empty">Loading overview…</div>
      ) : (
        <div className="stcc-grid">
          <div className="stcc-grid stcc-grid--kpi">
            {a ? (
              <>
                <Tile label="Visitors" value={num(a.current.visitors)} href={`${admin}/analytics`} sub={d(a.current.visitors, a.previous?.visitors)} />
                <Tile label="Page views" value={num(a.current.pageviews)} href={`${admin}/analytics`} sub={d(a.current.pageviews, a.previous?.pageviews)} />
                <Tile label="Avg. engaged time" value={duration(a.current.avgDurationSec)} href={`${admin}/analytics`} />
                <Tile label="On site now" value={num(a.realtime.visitors)} href={`${admin}/analytics`} />
              </>
            ) : null}
            <Tile label="Enquiries this week" value={s.formSubmissionsThisWeek} href={`${admin}/collections/form-submissions`} />
            <Tile
              label="New applications"
              value={s.applicationsNew}
              href={`${admin}/careers-pipeline`}
              sub={s.applicationsThisWeek !== null ? <span className="stcc-muted">{s.applicationsThisWeek} this week · {s.openJobs} open jobs</span> : null}
            />
            <Tile
              label="Vendors awaiting review"
              value={s.vendorsInReview}
              href={`${admin}/collections/vendors?where[status][in]=submitted,document_review,technical_review,compliance_review`}
              sub={s.vendorsClarification ? <span className="stcc-muted">{s.vendorsClarification} waiting on vendor</span> : null}
            />
            {s.failedEmailsThisWeek ? (
              <Tile label="Emails that failed" value={s.failedEmailsThisWeek} href={`${admin}/collections/email-logs?where[status][equals]=failed`} alert />
            ) : null}
          </div>

          {a || s.drafts?.length ? (
            <div className="stcc-grid stcc-grid--2">
              {a ? (
                <div className="stcc-card">
                  <div className="stcc-card__head">
                    <h3>Traffic</h3>
                    <a className="stcc-muted" href={`${admin}/analytics`}>
                      Full analytics →
                    </a>
                  </div>
                  <TrafficChart data={a.series} bucket="day" height={200} />
                </div>
              ) : null}
              <div className="stcc-card">
                <h3>Top pages</h3>
                {a?.pages.length ? (
                  <ul className="stcc-bars">
                    {a.pages.map((p) => (
                      <li key={p.key} style={{ ['--w' as string]: `${(p.visitors / Math.max(a.pages[0].visitors, 1)) * 100}%` }}>
                        <span>{p.key}</span>
                        <span>{num(p.visitors)}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="stcc-muted">No visits yet.</div>
                )}
                {s.drafts?.length ? (
                  <>
                    <h3 style={{ marginTop: 20 }}>Unpublished drafts</h3>
                    <ul className="stcc-bars">
                      {s.drafts.map((p) => (
                        <li key={p.id}>
                          <span>
                            <a href={`${admin}/collections/pages/${p.id}`}>{p.title}</a>
                          </span>
                          <span>{new Date(p.updatedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}
