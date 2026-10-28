import configPromise from '@payload-config'
import type { MetadataRoute } from 'next'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

import { docPath } from '@/utilities/paths'
import { getServerSideURL } from '@/utilities/getURL'

const build = unstable_cache(
  async (): Promise<MetadataRoute.Sitemap> => {
    const site = getServerSideURL()
    const payload = await getPayload({ config: configPromise })
    const settings = await payload.findGlobal({ slug: 'site-settings', depth: 0 })
    const arabic = Boolean(settings.languages?.enableArabic)

    const entries: MetadataRoute.Sitemap = []
    const add = (path: string, lastModified?: string | null, priority = 0.7, changeFrequency: 'weekly' | 'monthly' | 'daily' = 'monthly') => {
      const url = `${site}${path === '/' ? '' : path}`
      entries.push({
        url: url || site,
        lastModified: lastModified ? new Date(lastModified) : undefined,
        priority,
        changeFrequency,
        alternates: arabic ? { languages: { en: url || site, ar: `${site}/ar${path === '/' ? '' : path}` } } : undefined,
      })
    }

    const published = { _status: { equals: 'published' } } as const
    const [pages, divisions, projects, news, jobs] = await Promise.all([
      payload.find({ collection: 'pages', where: published, limit: 1000, depth: 0, select: { slug: true, path: true, updatedAt: true, meta: true } }),
      payload.find({ collection: 'divisions', where: published, limit: 200, depth: 0, select: { slug: true, updatedAt: true, meta: true } }),
      payload.find({ collection: 'projects', where: published, limit: 1000, depth: 0, select: { slug: true, updatedAt: true, meta: true } }),
      payload.find({ collection: 'news', where: published, limit: 1000, depth: 0, select: { slug: true, updatedAt: true, meta: true } }),
      payload.find({ collection: 'job-openings', where: { and: [{ status: { equals: 'open' } }, { listed: { not_equals: false } }] }, limit: 500, depth: 0, select: { slug: true, updatedAt: true, meta: true } }),
    ])
    const noindex = (d: { meta?: { noIndex?: boolean | null } | null }) => Boolean(d.meta?.noIndex)
    pages.docs.filter((d) => !noindex(d)).forEach((d) => add(docPath('pages', d), d.updatedAt, d.slug === 'home' ? 1 : 0.8, d.slug === 'home' ? 'weekly' : 'monthly'))
    divisions.docs.filter((d) => !noindex(d)).forEach((d) => add(docPath('divisions', d), d.updatedAt, 0.9))
    projects.docs.filter((d) => !noindex(d)).forEach((d) => add(docPath('projects', d), d.updatedAt, 0.6))
    news.docs.filter((d) => !noindex(d)).forEach((d) => add(docPath('news', d), d.updatedAt, 0.5))
    jobs.docs.filter((d) => !noindex(d)).forEach((d) => add(docPath('job-openings', d), d.updatedAt, 0.6, 'daily'))
    add('/vendor-registration', null, 0.6)
    return entries
  },
  ['sitemap'],
  { tags: ['sitemap'], revalidate: 3600 },
)

// Rendered per request (cached via unstable_cache and refreshed on publish) so the build needs no database
export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    return await build()
  } catch {
    return []
  }
}
