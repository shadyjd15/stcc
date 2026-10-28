import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { asLocale, CmsPage, cmsPageMetadata } from '../_components/CmsPage'

type Props = { params: Promise<{ locale: string; slug: string[] }> }

const toPath = (slug: string[]) => `/${slug.map((s) => decodeURIComponent(s)).join('/')}`

export default async function Page({ params }: Props) {
  const { locale, slug } = await params
  return <CmsPage path={toPath(slug)} locale={asLocale(locale)} />
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  return cmsPageMetadata(toPath(slug), asLocale(locale))
}

/** Pre-render every published page at build time; new pages render on first request. */
export async function generateStaticParams() {
  // Pages render on first request and are cached; the build never needs a database
  if (process.env.NEXT_PHASE === 'phase-production-build') return []
  try {
    const payload = await getPayload({ config: configPromise })
    const pages = await payload.find({
      collection: 'pages',
      where: { _status: { equals: 'published' } },
      limit: 1000,
      depth: 0,
      select: { path: true },
    })
    const reserved = ['/divisions', '/projects', '/careers', '/news', '/vendor-registration', '/vendor-portal', '/search']
    return pages.docs
      .filter((p) => p.path && p.path !== '/' && !reserved.includes(p.path))
      .map((p) => ({ locale: 'en', slug: p.path!.split('/').filter(Boolean) }))
  } catch {
    return []
  }
}
