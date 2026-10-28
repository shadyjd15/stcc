/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Payload } from 'payload'
import type { QueryResult } from 'pg'

import { ensureAnalyticsSchema, getPool } from './db'

export const CONVERSION_EVENTS = [
  'form_submit',
  'quote_request',
  'job_application',
  'vendor_signup',
  'vendor_submitted',
  'call',
  'email',
  'whatsapp',
]

export type Range = { from: Date; to: Date; bucket: 'hour' | 'day' | 'week' }

export const parseRange = (range: string | null, fromStr?: string | null, toStr?: string | null): Range => {
  const to = toStr ? new Date(toStr) : new Date()
  let from: Date
  switch (range) {
    case 'today':
      from = new Date(new Date().setUTCHours(0, 0, 0, 0))
      break
    case '24h':
      from = new Date(to.getTime() - 86400_000)
      break
    case '7d':
      from = new Date(to.getTime() - 7 * 86400_000)
      break
    case '90d':
      from = new Date(to.getTime() - 90 * 86400_000)
      break
    case '12m':
      from = new Date(to.getTime() - 365 * 86400_000)
      break
    case 'custom':
      from = fromStr ? new Date(fromStr) : new Date(to.getTime() - 30 * 86400_000)
      break
    default:
      from = new Date(to.getTime() - 30 * 86400_000)
  }
  const days = (to.getTime() - from.getTime()) / 86400_000
  return { from, to, bucket: days <= 2 ? 'hour' : days > 120 ? 'week' : 'day' }
}

type Filters = { path?: string; country?: string; source?: string; device?: string }

const whereClause = (f: Filters, startIndex: number) => {
  const parts: string[] = []
  const params: unknown[] = []
  let i = startIndex
  if (f.path) {
    parts.push(`path = $${i++}`)
    params.push(f.path)
  }
  if (f.country) {
    parts.push(`country = $${i++}`)
    params.push(f.country)
  }
  if (f.device) {
    parts.push(`device = $${i++}`)
    params.push(f.device)
  }
  if (f.source) {
    if (f.source === 'Direct') parts.push(`referrer_host IS NULL AND utm_source IS NULL`)
    else {
      parts.push(`COALESCE(utm_source, referrer_host) = $${i++}`)
      params.push(f.source)
    }
  }
  return { sql: parts.length ? ` AND ${parts.join(' AND ')}` : '', params }
}

async function overview(payload: Payload, from: Date, to: Date, f: Filters) {
  const pool = getPool(payload)
  const w = whereClause(f, 3)
  const { rows } = await pool.query(
    `WITH ev AS (
       SELECT * FROM analytics.events WHERE ts >= $1 AND ts < $2 ${w.sql}
     ),
     sess AS (
       SELECT session_id,
              COUNT(*) FILTER (WHERE type = 'pageview') AS pv,
              COALESCE(SUM(duration_ms) FILTER (WHERE type = 'engagement'), 0) AS dur,
              COUNT(*) FILTER (WHERE type = 'event' AND name = ANY($${w.params.length + 3})) AS conv
       FROM ev GROUP BY session_id
     )
     SELECT
       (SELECT COUNT(DISTINCT visitor_id) FROM ev) AS visitors,
       (SELECT COUNT(*) FROM ev WHERE type = 'pageview') AS pageviews,
       (SELECT COUNT(*) FROM sess WHERE pv > 0) AS sessions,
       (SELECT COUNT(*) FROM sess WHERE pv = 1 AND dur < 10000) AS bounces,
       (SELECT COALESCE(AVG(dur), 0) FROM sess WHERE pv > 0) AS avg_duration,
       (SELECT COUNT(*) FROM ev WHERE type = 'event' AND name = ANY($${w.params.length + 3})) AS conversions,
       (SELECT COUNT(*) FROM sess WHERE conv > 0) AS converting_sessions`,
    [from, to, ...w.params, CONVERSION_EVENTS],
  )
  const r = rows[0]
  const sessions = Number(r.sessions)
  return {
    visitors: Number(r.visitors),
    pageviews: Number(r.pageviews),
    sessions,
    bounceRate: sessions ? Math.round((Number(r.bounces) / sessions) * 1000) / 10 : 0,
    avgDurationSec: Math.round(Number(r.avg_duration) / 1000),
    pagesPerSession: sessions ? Math.round((Number(r.pageviews) / sessions) * 10) / 10 : 0,
    conversions: Number(r.conversions),
    conversionRate: sessions ? Math.round((Number(r.converting_sessions) / sessions) * 1000) / 10 : 0,
  }
}

async function top(payload: Payload, range: Range, f: Filters, dimension: string, opts: { type?: string; limit?: number; extra?: string } = {}) {
  const pool = getPool(payload)
  const w = whereClause(f, 3)
  const { rows } = await pool.query(
    `SELECT ${dimension} AS key, COUNT(DISTINCT visitor_id) AS visitors, COUNT(*) AS hits
     FROM analytics.events
     WHERE ts >= $1 AND ts < $2 AND type = '${opts.type || 'pageview'}' ${opts.extra || ''} ${w.sql}
     GROUP BY 1 ORDER BY visitors DESC, hits DESC LIMIT ${opts.limit || 10}`,
    [range.from, range.to, ...w.params],
  )
  return rows.map((r: Record<string, any>) => ({ key: r.key ?? 'Unknown', visitors: Number(r.visitors), hits: Number(r.hits) }))
}

export async function buildReport(
  payload: Payload,
  opts: { range: Range; filters?: Filters; compare?: boolean },
) {
  await ensureAnalyticsSchema(payload)
  const pool = getPool(payload)
  const { range } = opts
  const f = opts.filters || {}
  const span = range.to.getTime() - range.from.getTime()
  const prevFrom = new Date(range.from.getTime() - span)

  const w = whereClause(f, 4)
  const [current, previous, series, pages, entries, exits, sources, campaigns, countries, cities, devices, browsers, oses, languages, locales, events, notFound, searches, realtime, funnels] =
    await Promise.all([
      overview(payload, range.from, range.to, f),
      opts.compare ? overview(payload, prevFrom, range.from, f) : Promise.resolve(null),
      pool
        .query(
          `SELECT date_trunc($3, ts) AS bucket,
                  COUNT(DISTINCT visitor_id) AS visitors,
                  COUNT(*) FILTER (WHERE type = 'pageview') AS pageviews,
                  COUNT(*) FILTER (WHERE type = 'event' AND name = ANY($${w.params.length + 4})) AS conversions
           FROM analytics.events WHERE ts >= $1 AND ts < $2 ${w.sql}
           GROUP BY 1 ORDER BY 1`,
          [range.from, range.to, range.bucket, ...w.params, CONVERSION_EVENTS],
        )
        .then((r: QueryResult) =>
          r.rows.map((x: Record<string, any>) => ({
            t: new Date(x.bucket).toISOString(),
            visitors: Number(x.visitors),
            pageviews: Number(x.pageviews),
            conversions: Number(x.conversions),
          })),
        ),
      // pages with average engaged time and scroll depth
      pool
        .query(
          `SELECT path AS key,
                  COUNT(DISTINCT visitor_id) FILTER (WHERE type = 'pageview') AS visitors,
                  COUNT(*) FILTER (WHERE type = 'pageview') AS hits,
                  COALESCE(AVG(duration_ms) FILTER (WHERE type = 'engagement'), 0) AS avg_ms,
                  COALESCE(AVG(scroll_pct) FILTER (WHERE type = 'engagement'), 0) AS scroll
           FROM analytics.events WHERE ts >= $1 AND ts < $2 ${whereClause(f, 3).sql}
           GROUP BY 1 HAVING COUNT(*) FILTER (WHERE type = 'pageview') > 0
           ORDER BY visitors DESC LIMIT 15`,
          [range.from, range.to, ...whereClause(f, 3).params],
        )
        .then((r: QueryResult) =>
          r.rows.map((x: Record<string, any>) => ({
            key: x.key,
            visitors: Number(x.visitors),
            hits: Number(x.hits),
            avgSec: Math.round(Number(x.avg_ms) / 1000),
            scroll: Math.round(Number(x.scroll)),
          })),
        ),
      top(payload, range, f, 'path', { extra: 'AND is_entry' }),
      pool
        .query(
          `SELECT path AS key, COUNT(*) AS hits FROM (
             SELECT DISTINCT ON (session_id) session_id, path FROM analytics.events
             WHERE ts >= $1 AND ts < $2 AND type = 'pageview' ${whereClause(f, 3).sql}
             ORDER BY session_id, ts DESC
           ) s GROUP BY 1 ORDER BY 2 DESC LIMIT 10`,
          [range.from, range.to, ...whereClause(f, 3).params],
        )
        .then((r: QueryResult) => r.rows.map((x: Record<string, any>) => ({ key: x.key, visitors: Number(x.hits), hits: Number(x.hits) }))),
      top(payload, range, f, `COALESCE(utm_source, referrer_host, 'Direct')`, { extra: 'AND is_entry', limit: 12 }),
      top(payload, range, f, `utm_campaign`, { extra: 'AND is_entry AND utm_campaign IS NOT NULL' }),
      top(payload, range, f, 'country', { limit: 15 }),
      top(payload, range, f, `COALESCE(city, '') || CASE WHEN country IS NOT NULL THEN ', ' || country ELSE '' END`, { extra: 'AND city IS NOT NULL', limit: 10 }),
      top(payload, range, f, 'device'),
      top(payload, range, f, 'browser'),
      top(payload, range, f, 'os'),
      top(payload, range, f, `split_part(lang, '-', 1)`),
      top(payload, range, f, `COALESCE(locale, 'en')`),
      pool
        .query(
          `SELECT name AS key, COUNT(*) AS hits, COUNT(DISTINCT visitor_id) AS visitors
           FROM analytics.events WHERE ts >= $1 AND ts < $2 AND type = 'event' ${whereClause(f, 3).sql}
           GROUP BY 1 ORDER BY 2 DESC LIMIT 20`,
          [range.from, range.to, ...whereClause(f, 3).params],
        )
        .then((r: QueryResult) => r.rows.map((x: Record<string, any>) => ({ key: x.key, hits: Number(x.hits), visitors: Number(x.visitors), conversion: CONVERSION_EVENTS.includes(x.key) }))),
      pool
        .query(
          `SELECT path AS key, COUNT(*) AS hits, MAX(referrer_host) AS referrer
           FROM analytics.events WHERE ts >= $1 AND ts < $2 AND type = 'pageview' AND status = 404
           GROUP BY 1 ORDER BY 2 DESC LIMIT 15`,
          [range.from, range.to],
        )
        .then((r: QueryResult) => r.rows.map((x: Record<string, any>) => ({ key: x.key, hits: Number(x.hits), referrer: x.referrer }))),
      pool
        .query(
          `SELECT lower(props->>'q') AS key, COUNT(*) AS hits
           FROM analytics.events WHERE ts >= $1 AND ts < $2 AND type = 'event' AND name = 'search' AND props ? 'q'
           GROUP BY 1 ORDER BY 2 DESC LIMIT 15`,
          [range.from, range.to],
        )
        .then((r: QueryResult) => r.rows.map((x: Record<string, any>) => ({ key: x.key, hits: Number(x.hits) }))),
      pool
        .query(
          `SELECT COUNT(DISTINCT visitor_id) AS visitors,
                  json_agg(DISTINCT path) FILTER (WHERE path IS NOT NULL) AS paths
           FROM analytics.events WHERE ts > now() - interval '5 minutes'`,
        )
        .then((r: QueryResult) => ({ visitors: Number(r.rows[0]?.visitors || 0), paths: (r.rows[0]?.paths || []).slice(0, 8) as string[] })),
      pool
        .query(
          `SELECT
             COUNT(DISTINCT visitor_id) FILTER (WHERE type = 'pageview' AND path LIKE '/careers%') AS careers_visitors,
             COUNT(DISTINCT visitor_id) FILTER (WHERE type = 'pageview' AND path ~ '^/careers/.+') AS job_viewers,
             COUNT(*) FILTER (WHERE type = 'event' AND name = 'job_application') AS applications,
             COUNT(DISTINCT visitor_id) FILTER (WHERE type = 'pageview' AND path LIKE '/vendor-registration%') AS vendor_visitors,
             COUNT(*) FILTER (WHERE type = 'event' AND name = 'vendor_signup') AS vendor_signups,
             COUNT(*) FILTER (WHERE type = 'event' AND name = 'vendor_submitted') AS vendor_submissions,
             COUNT(DISTINCT visitor_id) FILTER (WHERE type = 'pageview' AND (path LIKE '/contact%' OR path LIKE '/request-a-quote%')) AS contact_visitors,
             COUNT(*) FILTER (WHERE type = 'event' AND name IN ('form_submit', 'quote_request')) AS enquiries
           FROM analytics.events WHERE ts >= $1 AND ts < $2`,
          [range.from, range.to],
        )
        .then((r: QueryResult) => {
          const x = r.rows[0] || {}
          const n = (k: string) => Number(x[k] || 0)
          return {
            careers: [
              { label: 'Visited careers', value: n('careers_visitors') },
              { label: 'Viewed a job', value: n('job_viewers') },
              { label: 'Applied', value: n('applications') },
            ],
            vendors: [
              { label: 'Visited vendor registration', value: n('vendor_visitors') },
              { label: 'Created an account', value: n('vendor_signups') },
              { label: 'Submitted for review', value: n('vendor_submissions') },
            ],
            enquiries: [
              { label: 'Visited contact / quote', value: n('contact_visitors') },
              { label: 'Sent an enquiry', value: n('enquiries') },
            ],
          }
        }),
    ])

  return {
    range: { from: range.from.toISOString(), to: range.to.toISOString(), bucket: range.bucket },
    current,
    previous,
    series,
    pages,
    entries,
    exits,
    sources,
    campaigns,
    countries,
    cities,
    devices,
    browsers,
    oses,
    languages,
    locales,
    events,
    notFound,
    searches,
    realtime,
    funnels,
  }
}

export async function purgeOldEvents(payload: Payload, days: number): Promise<number> {
  await ensureAnalyticsSchema(payload)
  const res = await getPool(payload).query(`DELETE FROM analytics.events WHERE ts < now() - ($1 || ' days')::interval`, [String(days)])
  return res.rowCount || 0
}

export async function exportCsv(payload: Payload, range: Range): Promise<string> {
  await ensureAnalyticsSchema(payload)
  const { rows } = await getPool(payload).query(
    `SELECT ts, type, name, path, referrer_host, utm_source, utm_medium, utm_campaign, country, city, device, browser, os, locale, duration_ms, scroll_pct
     FROM analytics.events WHERE ts >= $1 AND ts < $2 ORDER BY ts LIMIT 200000`,
    [range.from, range.to],
  )
  const cols = ['ts', 'type', 'name', 'path', 'referrer_host', 'utm_source', 'utm_medium', 'utm_campaign', 'country', 'city', 'device', 'browser', 'os', 'locale', 'duration_ms', 'scroll_pct']
  const esc = (v: unknown) => {
    const s = v instanceof Date ? v.toISOString() : v === null || v === undefined ? '' : String(v)
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
  }
  return [cols.join(','), ...rows.map((r: Record<string, unknown>) => cols.map((c) => esc(r[c])).join(','))].join('\n')
}
