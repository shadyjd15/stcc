import type { Payload } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

import { locales } from '@/i18n/config'
import { getCloudflareSettings, purgeCloudflare, schedulePurge } from './cloudflare'

/**
 * Revalidate the given public paths (for every locale), extra cache tags,
 * and purge the matching URLs from Cloudflare's edge cache.
 * `everything` is used for site-wide changes (header, footer, settings).
 */
export function revalidateSite(
  payload: Payload,
  { paths = [], tags = [], everything = false }: { paths?: string[]; tags?: string[]; everything?: boolean },
) {
  try {
    if (everything) {
      revalidatePath('/', 'layout')
    } else {
      for (const p of paths) {
        for (const l of locales) revalidatePath(p === '/' ? `/${l}` : `/${l}${p}`)
      }
    }
    for (const t of tags) revalidateTag(t, 'max')
  } catch {
    // Called outside a Next.js request (e.g. seed script) – nothing to revalidate
  }

  if (everything) {
    void (async () => {
      const cf = await getCloudflareSettings(payload)
      if (!cf.purgeOnPublish || !cf.zoneId || !cf.apiToken) return
      const r = await purgeCloudflare(payload, { everything: true })
      payload.logger.info(`[cloudflare] ${r.message}`)
    })()
  } else if (paths.length) {
    schedulePurge(payload, paths)
  }
}
