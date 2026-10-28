import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { draftMode } from 'next/headers'
import { getPayload, type Payload, type Where } from 'payload'
import { cache } from 'react'

import type { Locale } from '@/i18n/config'
import type {
  Division,
  Footer,
  Form,
  Header,
  JobOpening,
  News,
  Page,
  Partner,
  Project,
  SiteSetting,
  TeamMember,
} from '@/payload-types'

export const payload = (): Promise<Payload> => getPayload({ config: configPromise })

const isDraft = async () => {
  try {
    return (await draftMode()).isEnabled
  } catch {
    return false
  }
}

/* ---------------- globals ---------------- */

export const getSettings = (locale: Locale) =>
  unstable_cache(
    async () => (await payload()).findGlobal({ slug: 'site-settings', locale, depth: 1 }) as Promise<SiteSetting>,
    ['site-settings', locale],
    { tags: ['global_site-settings'] },
  )()

export const getHeader = (locale: Locale) =>
  unstable_cache(
    async () => (await payload()).findGlobal({ slug: 'header', locale, depth: 1 }) as Promise<Header>,
    ['header', locale],
    { tags: ['global_header'] },
  )()

export const getFooter = (locale: Locale) =>
  unstable_cache(
    async () => (await payload()).findGlobal({ slug: 'footer', locale, depth: 1 }) as Promise<Footer>,
    ['footer', locale],
    { tags: ['global_footer'] },
  )()

/** The subset of Integrations that the public site needs (never secrets) */
export const getPublicIntegrations = unstable_cache(
  async () => {
    const i = await (await payload()).findGlobal({ slug: 'integrations', depth: 0 })
    return {
      analyticsEnabled: i?.analytics?.enabled !== false,
      ga4Id: i?.analytics?.ga4Id || '',
      gtmId: i?.analytics?.gtmId || '',
      turnstileSiteKey: i?.cloudflare?.turnstileSiteKey || process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '',
      cfBeacon: i?.cloudflare?.webAnalyticsToken || '',
    }
  },
  ['public-integrations'],
  { tags: ['global_integrations'] },
)

/* ---------------- collections ---------------- */

export const getDivisions = (locale: Locale) =>
  unstable_cache(
    async () => {
      const res = await (await payload()).find({
        collection: 'divisions',
        locale,
        depth: 1,
        limit: 50,
        sort: 'order',
        overrideAccess: false,
        where: { _status: { equals: 'published' } },
        select: {
          title: true,
          shortTitle: true,
          slug: true,
          number: true,
          category: true,
          summary: true,
          icon: true,
          isNew: true,
          chips: true,
          cardImage: true,
          order: true,
        },
      })
      return res.docs as Division[]
    },
    ['divisions-list', locale],
    { tags: ['collection_divisions'] },
  )()

export const getPartners = (type: 'client' | 'partner') =>
  unstable_cache(
    async () => {
      const res = await (await payload()).find({
        collection: 'partners',
        where: { type: { equals: type } },
        sort: 'order',
        limit: 100,
        depth: 1,
      })
      return res.docs as Partner[]
    },
    ['partners', type],
    { tags: ['collection_partners'] },
  )()

export const getTeam = (locale: Locale) =>
  unstable_cache(
    async () => {
      const res = await (await payload()).find({ collection: 'team-members', locale, sort: 'order', limit: 50, depth: 1 })
      return res.docs as TeamMember[]
    },
    ['team', locale],
    { tags: ['collection_team-members'] },
  )()

export const getPageByPath = cache(async (path: string, locale: Locale): Promise<Page | null> => {
  const draft = await isDraft()
  const p = await payload()
  const where: Where = path === '/' ? { slug: { equals: 'home' } } : { path: { equals: path } }
  const res = await p.find({
    collection: 'pages',
    where,
    locale,
    draft,
    overrideAccess: draft,
    limit: 1,
    depth: 2,
    pagination: false,
  })
  return (res.docs[0] as Page) || null
})

export const getDocBySlug = cache(
  async <T extends 'divisions' | 'projects' | 'news' | 'job-openings'>(
    collection: T,
    slug: string,
    locale: Locale,
  ) => {
    const draft = await isDraft()
    const res = await (await payload()).find({
      collection,
      where: { slug: { equals: slug } },
      locale,
      draft: collection === 'job-openings' ? undefined : draft,
      overrideAccess: draft,
      limit: 1,
      depth: 2,
      pagination: false,
    })
    return (res.docs[0] || null) as unknown as
      | (T extends 'divisions' ? Division : T extends 'projects' ? Project : T extends 'news' ? News : JobOpening)
      | null
  },
)

export const listProjects = (locale: Locale) =>
  unstable_cache(
    async () => {
      const res = await (await payload()).find({
        collection: 'projects',
        locale,
        depth: 1,
        limit: 200,
        sort: '-year',
        overrideAccess: false,
        where: { _status: { equals: 'published' } },
      })
      return res.docs as Project[]
    },
    ['projects-list', locale],
    { tags: ['collection_projects'] },
  )()

export const listJobs = (locale: Locale) =>
  unstable_cache(
    async () => {
      const res = await (await payload()).find({
        collection: 'job-openings',
        locale,
        depth: 1,
        limit: 200,
        sort: '-postedAt',
        overrideAccess: false,
        where: { and: [{ status: { equals: 'open' } }, { listed: { not_equals: false } }] },
        select: {
          title: true,
          slug: true,
          location: true,
          employmentType: true,
          workplace: true,
          division: true,
          department: true,
          postedAt: true,
          closesAt: true,
          summary: true,
          experienceMin: true,
        },
      })
      return res.docs as JobOpening[]
    },
    ['jobs-list', locale],
    { tags: ['collection_job-openings'] },
  )()

export const getGeneralApplicationJob = unstable_cache(
  async () => {
    const res = await (await payload()).find({
      collection: 'job-openings',
      where: { and: [{ status: { equals: 'open' } }, { listed: { equals: false } }] },
      limit: 1,
      depth: 0,
      select: { slug: true, title: true },
    })
    return (res.docs[0] as JobOpening) || null
  },
  ['general-job'],
  { tags: ['collection_job-openings'] },
)

export const listNews = (locale: Locale, limit = 24) =>
  unstable_cache(
    async () => {
      const res = await (await payload()).find({
        collection: 'news',
        locale,
        depth: 1,
        limit,
        sort: '-publishedAt',
        overrideAccess: false,
        where: { _status: { equals: 'published' } },
      })
      return res.docs as News[]
    },
    ['news-list', locale, String(limit)],
    { tags: ['collection_news'] },
  )()

export const getForm = (id: string | number, locale: Locale) =>
  unstable_cache(
    async () => (await (await payload()).findByID({ collection: 'forms', id, locale, depth: 0 })) as Form,
    ['form', String(id), locale],
    { tags: ['collection_forms'] },
  )()

export const getVendorSettingsPublic = (locale: Locale) =>
  unstable_cache(
    async () => (await payload()).findGlobal({ slug: 'vendor-settings', locale, depth: 1 }),
    ['vendor-settings', locale],
    { tags: ['global_vendor-settings'] },
  )()

export const getCareersPublic = (locale: Locale) =>
  unstable_cache(
    async () => {
      const s = await (await payload()).findGlobal({ slug: 'careers-settings', locale, depth: 0, overrideAccess: true })
      return { consentText: s?.consentText || '' }
    },
    ['careers-public', locale],
    { tags: ['global_careers-settings'] },
  )()
