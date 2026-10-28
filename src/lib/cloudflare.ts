import type { Payload } from 'payload'

export type CloudflareSettings = {
  zoneId: string
  apiToken: string
  purgeOnPublish: boolean
  turnstileSiteKey: string
  turnstileSecretKey: string
  webAnalyticsToken: string
}

let cache: { at: number; value: CloudflareSettings } | null = null

export const invalidateCloudflareSettings = () => {
  cache = null
}

export async function getCloudflareSettings(payload: Payload): Promise<CloudflareSettings> {
  if (cache && Date.now() - cache.at < 30_000) return cache.value
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let cf: any = {}
  try {
    const integrations = await payload.findGlobal({
      slug: 'integrations',
      context: { decryptSecrets: true },
      overrideAccess: true,
      depth: 0,
    })
    cf = integrations?.cloudflare || {}
  } catch {
    /* first boot */
  }
  const env = process.env
  const value: CloudflareSettings = {
    zoneId: cf.zoneId || env.CLOUDFLARE_ZONE_ID || '',
    apiToken: cf.apiToken || env.CLOUDFLARE_API_TOKEN || '',
    purgeOnPublish: cf.purgeOnPublish !== false,
    turnstileSiteKey: cf.turnstileSiteKey || env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '',
    turnstileSecretKey: cf.turnstileSecretKey || env.TURNSTILE_SECRET_KEY || '',
    webAnalyticsToken: cf.webAnalyticsToken || env.CLOUDFLARE_WEB_ANALYTICS_TOKEN || '',
  }
  cache = { at: Date.now(), value }
  return value
}

const API = 'https://api.cloudflare.com/client/v4'

/* ------------------------------------------------------------------ */
/* Cache purge                                                         */
/* ------------------------------------------------------------------ */

export async function purgeCloudflare(
  payload: Payload,
  target: { urls?: string[]; everything?: boolean },
): Promise<{ ok: boolean; message: string }> {
  const s = await getCloudflareSettings(payload)
  if (!s.zoneId || !s.apiToken) return { ok: false, message: 'Cloudflare is not configured' }

  const siteUrl = (process.env.NEXT_PUBLIC_SERVER_URL || '').replace(/\/$/, '')
  const bodies: Record<string, unknown>[] = []
  if (target.everything) bodies.push({ purge_everything: true })
  else {
    const urls = Array.from(
      new Set((target.urls || []).map((u) => (u.startsWith('http') ? u : `${siteUrl}${u}`))),
    )
    // Cloudflare accepts max 30 URLs per call
    for (let i = 0; i < urls.length; i += 30) bodies.push({ files: urls.slice(i, i + 30) })
  }
  if (!bodies.length) return { ok: true, message: 'Nothing to purge' }

  try {
    for (const body of bodies) {
      const res = await fetch(`${API}/zones/${s.zoneId}/purge_cache`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${s.apiToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(10_000),
      })
      const json = (await res.json().catch(() => ({}))) as { success?: boolean; errors?: { message: string }[] }
      if (!res.ok || !json.success) {
        const msg = json.errors?.map((e) => e.message).join('; ') || `HTTP ${res.status}`
        payload.logger.warn(`[cloudflare] purge failed: ${msg}`)
        return { ok: false, message: msg }
      }
    }
    return { ok: true, message: target.everything ? 'Purged everything' : 'Purged URLs' }
  } catch (err) {
    return { ok: false, message: String(err) }
  }
}

/** Fire-and-forget purge used by publish hooks (never blocks the editor). */
export function schedulePurge(payload: Payload, paths: string[]) {
  void (async () => {
    const s = await getCloudflareSettings(payload)
    if (!s.purgeOnPublish || !s.zoneId || !s.apiToken) return
    const withLocales = paths.flatMap((p) => [p, p === '/' ? '/ar' : `/ar${p}`])
    const r = await purgeCloudflare(payload, { urls: withLocales })
    payload.logger.info(`[cloudflare] ${r.message} (${withLocales.length} urls)`)
  })()
}

/* ------------------------------------------------------------------ */
/* Turnstile (bot protection for public forms)                         */
/* ------------------------------------------------------------------ */

export async function verifyTurnstile(
  payload: Payload,
  token: string | null | undefined,
  ip?: string,
): Promise<{ ok: boolean; reason?: string }> {
  const s = await getCloudflareSettings(payload)
  if (!s.turnstileSecretKey) return { ok: true, reason: 'turnstile-disabled' }
  if (!token) return { ok: false, reason: 'missing-token' }
  try {
    const form = new URLSearchParams({ secret: s.turnstileSecretKey, response: token })
    if (ip) form.set('remoteip', ip)
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: form,
      signal: AbortSignal.timeout(8_000),
    })
    const json = (await res.json()) as { success: boolean; 'error-codes'?: string[] }
    return json.success ? { ok: true } : { ok: false, reason: json['error-codes']?.join(',') }
  } catch (err) {
    // Fail open on network errors so genuine users are never locked out; rate limiting still applies
    payload.logger.warn(`[turnstile] verification error: ${String(err)}`)
    return { ok: true, reason: 'verify-error' }
  }
}

/* ------------------------------------------------------------------ */
/* Request helpers                                                     */
/* ------------------------------------------------------------------ */

export const getClientIp = (headers: Headers): string =>
  headers.get('cf-connecting-ip') ||
  headers.get('x-real-ip') ||
  headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
  '0.0.0.0'

export const getCountry = (headers: Headers): string | null => {
  const c = headers.get('cf-ipcountry')
  return c && c !== 'XX' && c !== 'T1' ? c.toUpperCase() : null
}

/* ------------------------------------------------------------------ */
/* Edge analytics (GraphQL Analytics API)                              */
/* ------------------------------------------------------------------ */

export type CloudflareZoneStats = {
  configured: boolean
  error?: string
  totals?: {
    requests: number
    cachedRequests: number
    bytes: number
    cachedBytes: number
    threats: number
    pageViews: number
    uniques: number
  }
  daily?: { date: string; requests: number; cachedRequests: number; threats: number; uniques: number }[]
  countries?: { country: string; requests: number }[]
  statusCodes?: { status: number; requests: number }[]
}

export async function getCloudflareZoneStats(
  payload: Payload,
  days: number,
): Promise<CloudflareZoneStats> {
  const s = await getCloudflareSettings(payload)
  if (!s.zoneId || !s.apiToken) return { configured: false }

  const until = new Date()
  const since = new Date(until.getTime() - days * 86400_000)
  const d = (x: Date) => x.toISOString().slice(0, 10)

  const query = `query($zone: String!, $since: Date!, $until: Date!) {
    viewer { zones(filter: { zoneTag: $zone }) {
      httpRequests1dGroups(limit: 400, filter: { date_geq: $since, date_leq: $until }, orderBy: [date_ASC]) {
        dimensions { date }
        sum { requests cachedRequests bytes cachedBytes threats pageViews
              countryMap { clientCountryName requests }
              responseStatusMap { edgeResponseStatus requests } }
        uniq { uniques }
      }
    } }
  }`

  try {
    const res = await fetch(`${API}/graphql`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${s.apiToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { zone: s.zoneId, since: d(since), until: d(until) } }),
      signal: AbortSignal.timeout(12_000),
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const json: any = await res.json()
    if (json.errors?.length) return { configured: true, error: json.errors[0].message }
    const groups = json.data?.viewer?.zones?.[0]?.httpRequests1dGroups || []

    const totals = { requests: 0, cachedRequests: 0, bytes: 0, cachedBytes: 0, threats: 0, pageViews: 0, uniques: 0 }
    const countries = new Map<string, number>()
    const statuses = new Map<number, number>()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const daily = groups.map((g: any) => {
      totals.requests += g.sum.requests
      totals.cachedRequests += g.sum.cachedRequests
      totals.bytes += g.sum.bytes
      totals.cachedBytes += g.sum.cachedBytes
      totals.threats += g.sum.threats
      totals.pageViews += g.sum.pageViews
      totals.uniques += g.uniq.uniques
      for (const c of g.sum.countryMap || [])
        countries.set(c.clientCountryName, (countries.get(c.clientCountryName) || 0) + c.requests)
      for (const st of g.sum.responseStatusMap || [])
        statuses.set(st.edgeResponseStatus, (statuses.get(st.edgeResponseStatus) || 0) + st.requests)
      return {
        date: g.dimensions.date,
        requests: g.sum.requests,
        cachedRequests: g.sum.cachedRequests,
        threats: g.sum.threats,
        uniques: g.uniq.uniques,
      }
    })

    return {
      configured: true,
      totals,
      daily,
      countries: [...countries.entries()]
        .map(([country, requests]) => ({ country, requests }))
        .sort((a, b) => b.requests - a.requests)
        .slice(0, 12),
      statusCodes: [...statuses.entries()]
        .map(([status, requests]) => ({ status, requests }))
        .sort((a, b) => b.requests - a.requests)
        .slice(0, 10),
    }
  } catch (err) {
    return { configured: true, error: String(err) }
  }
}
