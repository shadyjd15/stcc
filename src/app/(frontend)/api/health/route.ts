import configPromise from '@payload-config'
import { getPayload } from 'payload'

/** GET /api/health – used by Docker / uptime monitors. Checks the app and the database. */
export const dynamic = 'force-dynamic'

export async function GET(): Promise<Response> {
  const started = Date.now()
  try {
    const payload = await getPayload({ config: configPromise })
    await payload.count({ collection: 'pages', overrideAccess: true })
    return Response.json({ ok: true, db: 'up', ms: Date.now() - started }, { headers: { 'Cache-Control': 'no-store' } })
  } catch {
    return Response.json({ ok: false, db: 'down' }, { status: 503, headers: { 'Cache-Control': 'no-store' } })
  }
}
