import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { getClientIp } from '@/lib/cloudflare'
import { recordHit, type HitInput } from '@/lib/analytics/record'
import { rateLimit } from '@/lib/rateLimit'

/**
 * Analytics beacon endpoint (first-party, cookieless).
 * Always answers 204 quickly; errors never surface to visitors.
 */
export async function POST(req: Request): Promise<Response> {
  const ok = new Response(null, { status: 204, headers: { 'Cache-Control': 'no-store' } })
  try {
    const ip = getClientIp(req.headers)
    if (!rateLimit(`pulse:${ip}`, { limit: 120, windowMs: 60_000 }).ok) return ok
    const text = await req.text()
    if (text.length > 4000) return ok
    const body = JSON.parse(text) as Partial<HitInput>
    if (!body || !['pageview', 'event', 'engagement'].includes(String(body.type)) || typeof body.path !== 'string') return ok
    if (body.type === 'event' && !/^[a-z0-9_]{2,40}$/.test(String(body.name || ''))) return ok
    const payload = await getPayload({ config: configPromise })
    await recordHit(payload, req.headers, body as HitInput)
  } catch {
    /* swallow */
  }
  return ok
}
