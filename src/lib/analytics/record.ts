import crypto from 'crypto'
import { isbot } from 'isbot'
import type { Payload, PayloadRequest } from 'payload'
import { UAParser } from 'ua-parser-js'

import { getClientIp, getCountry } from '@/lib/cloudflare'
import { dailySalt, ensureAnalyticsSchema, getPool, visitorHash } from './db'

export type HitInput = {
  type: 'pageview' | 'event' | 'engagement'
  name?: string | null
  path: string
  title?: string | null
  locale?: string | null
  referrer?: string | null
  utm?: { source?: string | null; medium?: string | null; campaign?: string | null }
  screenW?: number | null
  lang?: string | null
  durationMs?: number | null
  scrollPct?: number | null
  status?: number | null
  props?: Record<string, unknown> | null
}

let settingsCache: { at: number; enabled: boolean; excluded: string[] } | null = null

async function analyticsSettings(payload: Payload) {
  if (settingsCache && Date.now() - settingsCache.at < 60_000) return settingsCache
  try {
    const i = await payload.findGlobal({ slug: 'integrations', overrideAccess: true, depth: 0 })
    settingsCache = {
      at: Date.now(),
      enabled: i?.analytics?.enabled !== false,
      excluded: String(i?.analytics?.excludedPaths || '')
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
    }
  } catch {
    settingsCache = { at: Date.now(), enabled: true, excluded: [] }
  }
  return settingsCache
}

const deviceOf = (ua: UAParser.IResult, screenW?: number | null) => {
  const t = ua.device.type
  if (t === 'mobile') return 'Mobile'
  if (t === 'tablet') return 'Tablet'
  if (screenW && screenW < 768) return 'Mobile'
  if (screenW && screenW < 1024) return 'Tablet'
  return 'Desktop'
}

const clip = (s: unknown, n: number) => (s === undefined || s === null ? null : String(s).slice(0, n))

export async function recordHit(payload: Payload, headers: Headers, hit: HitInput): Promise<boolean> {
  const ua = headers.get('user-agent') || ''
  if (!ua || isbot(ua)) return false
  if (headers.get('purpose') === 'prefetch' || headers.get('sec-purpose')?.includes('prefetch')) return false

  const settings = await analyticsSettings(payload)
  if (!settings.enabled) return false
  const path = (hit.path || '/').split('?')[0].slice(0, 300)
  if (path.startsWith('/admin') || path.startsWith('/api') || path.startsWith('/next/')) return false
  if (settings.excluded.some((p) => path.startsWith(p))) return false

  await ensureAnalyticsSchema(payload)
  const host = headers.get('host') || ''
  const salt = await dailySalt(payload)
  const visitor = visitorHash(salt, getClientIp(headers), ua, host)
  const pool = getPool(payload)

  // Session = same visitor with less than 30 minutes of inactivity
  const last = await pool.query(
    `SELECT session_id FROM analytics.events WHERE visitor_id = $1 AND ts > now() - interval '30 minutes' ORDER BY ts DESC LIMIT 1`,
    [visitor],
  )
  const isNewSession = last.rowCount === 0
  const session = isNewSession ? crypto.randomBytes(9).toString('base64url') : last.rows[0].session_id

  let referrerHost: string | null = null
  let referrer: string | null = null
  if (hit.referrer) {
    try {
      const r = new URL(hit.referrer)
      if (r.host !== host) {
        referrerHost = r.hostname.replace(/^www\./, '')
        referrer = `${r.hostname}${r.pathname}`.slice(0, 300)
      }
    } catch {
      /* ignore */
    }
  }

  const parsed = new UAParser(ua).getResult()
  await pool.query(
    `INSERT INTO analytics.events
      (type, name, path, title, locale, referrer, referrer_host, utm_source, utm_medium, utm_campaign,
       country, city, device, browser, os, screen_w, lang, visitor_id, session_id, is_entry,
       duration_ms, scroll_pct, status, props)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24)`,
    [
      hit.type,
      clip(hit.name, 60),
      path,
      clip(hit.title, 200),
      clip(hit.locale, 5),
      referrer,
      referrerHost,
      clip(hit.utm?.source, 100),
      clip(hit.utm?.medium, 100),
      clip(hit.utm?.campaign, 100),
      getCountry(headers),
      clip(headers.get('cf-ipcity'), 80),
      deviceOf(parsed, hit.screenW),
      clip(parsed.browser.name, 40),
      clip(parsed.os.name, 40),
      hit.screenW ? Math.min(10000, Math.max(0, Math.round(hit.screenW))) : null,
      clip(hit.lang, 10),
      visitor,
      session,
      hit.type === 'pageview' && isNewSession,
      hit.durationMs ? Math.min(3_600_000, Math.max(0, Math.round(hit.durationMs))) : null,
      hit.scrollPct != null ? Math.min(100, Math.max(0, Math.round(hit.scrollPct))) : null,
      hit.status || null,
      hit.props ? JSON.stringify(hit.props).slice(0, 2000) : null,
    ],
  )
  return true
}

/** Conversion events recorded on the server (form submissions, applications, vendor sign-ups) */
export async function recordServerEvent(
  req: PayloadRequest,
  ev: { name: string; path: string; props?: Record<string, unknown> },
): Promise<void> {
  try {
    await recordHit(req.payload, req.headers, { type: 'event', name: ev.name, path: ev.path, props: ev.props })
  } catch (err) {
    req.payload.logger.warn(`[analytics] could not record ${ev.name}: ${String(err)}`)
  }
}
