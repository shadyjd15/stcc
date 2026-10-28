import type { Endpoint } from 'payload'

import { userHasRole } from '@/access'
import { getCloudflareZoneStats, purgeCloudflare } from '@/lib/cloudflare'
import { buildReport, exportCsv, parseRange } from '@/lib/analytics/queries'
import { renderEmailLayout } from '@/lib/email/layout'
import { deliverEmail } from '@/lib/email/send'
import { getEmailSettings } from '@/lib/email/settings'
import { json } from '@/lib/publicGuard'

const analyticsReport: Endpoint = {
  path: '/analytics/report',
  method: 'get',
  handler: async (req) => {
    if (!userHasRole(req.user, 'analyst', 'editor')) return json({ error: 'Forbidden' }, 403)
    const q = req.searchParams
    const range = parseRange(q.get('range'), q.get('from'), q.get('to'))
    const report = await buildReport(req.payload, {
      range,
      compare: q.get('compare') !== '0',
      filters: {
        path: q.get('path') || undefined,
        country: q.get('country') || undefined,
        source: q.get('source') || undefined,
        device: q.get('device') || undefined,
      },
    })
    return json(report)
  },
}

const analyticsExport: Endpoint = {
  path: '/analytics/export',
  method: 'get',
  handler: async (req) => {
    if (!userHasRole(req.user, 'analyst', 'editor')) return json({ error: 'Forbidden' }, 403)
    const q = req.searchParams
    const csv = await exportCsv(req.payload, parseRange(q.get('range'), q.get('from'), q.get('to')))
    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="stcc-analytics-${new Date().toISOString().slice(0, 10)}.csv"`,
        'Cache-Control': 'no-store',
      },
    })
  },
}

const cloudflareStats: Endpoint = {
  path: '/analytics/cloudflare',
  method: 'get',
  handler: async (req) => {
    if (!userHasRole(req.user, 'analyst', 'editor')) return json({ error: 'Forbidden' }, 403)
    const days = Math.min(365, Math.max(1, Number(req.searchParams.get('days') || 30)))
    return json(await getCloudflareZoneStats(req.payload, days))
  },
}

const purgeCache: Endpoint = {
  path: '/admin-tools/purge-cache',
  method: 'post',
  handler: async (req) => {
    if (!userHasRole(req.user, 'editor')) return json({ ok: false, error: 'Forbidden' }, 403)
    const body = (await req.json!().catch(() => ({}))) as { urls?: string[] }
    const result = await purgeCloudflare(req.payload, body.urls?.length ? { urls: body.urls } : { everything: true })
    return json(result, result.ok ? 200 : 400)
  },
}

const testEmail: Endpoint = {
  path: '/admin-tools/test-email',
  method: 'post',
  handler: async (req) => {
    if (!userHasRole(req.user)) return json({ ok: false, error: 'Forbidden' }, 403)
    const body = (await req.json!().catch(() => ({}))) as { to?: string }
    const to = body.to || req.user?.email
    if (!to) return json({ ok: false, error: 'No recipient' }, 400)
    const s = await getEmailSettings(req.payload)
    const html = renderEmailLayout(
      {
        eyebrow: 'Email settings',
        heading: 'Test email from your website',
        bodyHtml: `<p style="margin:0 0 16px">If you can read this, outgoing email is working.</p>`,
        details: [
          { label: 'Server', value: `${s.host}:${s.port} (${s.secure})` },
          { label: 'From', value: `${s.fromName} <${s.fromAddress}>` },
          { label: 'Sent at', value: new Date().toUTCString() },
        ],
      },
      s.brand,
    )
    const r = await deliverEmail(req.payload, { to, subject: 'Test email · STCC website', html, category: 'system.test' })
    return json(
      r.skipped
        ? { ok: false, error: 'Sending is turned off or no SMTP server is set, so nothing was sent.' }
        : r.ok
          ? { ok: true, message: `Sent to ${to}` }
          : { ok: false, error: r.error },
      r.ok && !r.skipped ? 200 : 400,
    )
  },
}

/** Numbers for the CMS home dashboard */
const dashboardStats: Endpoint = {
  path: '/admin-tools/dashboard',
  method: 'get',
  handler: async (req) => {
    if (!req.user) return json({ error: 'Forbidden' }, 403)
    const p = req.payload
    const since = new Date(Date.now() - 7 * 86400_000).toISOString()
    const can = (...r: Parameters<typeof userHasRole>[1][]) => userHasRole(req.user, ...r)

    const [apps, newApps, vendorsPending, vendorsClar, submissions, failedEmails, openJobs, report, drafts] = await Promise.all([
      can('hr') ? p.count({ collection: 'applications', where: { createdAt: { greater_than: since } } }) : null,
      can('hr') ? p.count({ collection: 'applications', where: { stage: { equals: 'new' } } }) : null,
      can('procurement') ? p.count({ collection: 'vendors', where: { status: { in: ['submitted', 'document_review', 'technical_review', 'compliance_review'] } } }) : null,
      can('procurement') ? p.count({ collection: 'vendors', where: { status: { equals: 'clarification' } } }) : null,
      can('editor') ? p.count({ collection: 'form-submissions', where: { createdAt: { greater_than: since } } }) : null,
      can() ? p.count({ collection: 'email-logs', where: { and: [{ status: { equals: 'failed' } }, { createdAt: { greater_than: since } }] } }) : null,
      can('hr') ? p.count({ collection: 'job-openings', where: { status: { equals: 'open' } } }) : null,
      can('analyst', 'editor') ? buildReport(p, { range: parseRange('7d'), compare: true }).catch(() => null) : null,
      can('editor') ? p.find({ collection: 'pages', where: { _status: { equals: 'draft' } }, limit: 5, depth: 0, draft: true, select: { title: true, updatedAt: true } }).catch(() => null) : null,
    ])

    return json({
      applicationsThisWeek: apps?.totalDocs ?? null,
      applicationsNew: newApps?.totalDocs ?? null,
      openJobs: openJobs?.totalDocs ?? null,
      vendorsInReview: vendorsPending?.totalDocs ?? null,
      vendorsClarification: vendorsClar?.totalDocs ?? null,
      formSubmissionsThisWeek: submissions?.totalDocs ?? null,
      failedEmailsThisWeek: failedEmails?.totalDocs ?? null,
      analytics: report ? { current: report.current, previous: report.previous, series: report.series, realtime: report.realtime, pages: report.pages.slice(0, 5) } : null,
      drafts: drafts?.docs ?? null,
    })
  },
}

export const rootEndpoints: Endpoint[] = [analyticsReport, analyticsExport, cloudflareStats, purgeCache, testEmail, dashboardStats]
