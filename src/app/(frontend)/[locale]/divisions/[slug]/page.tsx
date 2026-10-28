import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { DivisionsGrid } from '@/components/blocks/server'
import { Hero } from '@/components/Hero'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { getDictionary } from '@/i18n/dictionary'
import { getDocBySlug, getSettings } from '@/lib/data'
import { breadcrumbJsonLd, buildMetadata, jsonLdHtml } from '@/lib/seo'
import type { DivisionsGridBlock } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'
import { asLocale, blockContext } from '../../_components/CmsPage'

type Props = { params: Promise<{ locale: string; slug: string }> }

export default async function DivisionPage({ params }: Props) {
  const { locale: l, slug } = await params
  const locale = asLocale(l)
  const division = await getDocBySlug('divisions', slug, locale)
  if (!division) notFound()
  const { isEnabled: draft } = await draftMode()
  const t = getDictionary(locale)
  const ctx = await blockContext(locale, `/divisions/${slug}`, { currentDivisionId: division.id })
  const crumbs = [
    { label: t.home, href: '/' },
    { label: t.divisions, href: '/divisions' },
    { label: division.shortTitle || division.title },
  ]
  const eyebrow = [`${locale === 'ar' ? 'القسم' : 'DIVISION'} ${division.number || ''}`.trim(), division.category].filter(Boolean).join(' · ').toUpperCase()

  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: division.title,
    description: division.summary,
    serviceType: division.category,
    provider: { '@id': `${getServerSideURL()}/#organization` },
    areaServed: { '@type': 'Country', name: 'Saudi Arabia' },
    url: `${getServerSideURL()}/divisions/${division.slug}`,
  }

  return (
    <article>
      {draft && <LivePreviewListener />}
      <Hero
        hero={division.hero}
        locale={locale}
        title={division.title}
        crumbs={crumbs}
        divisions={ctx.divisions}
        eyebrow={division.isNew ? undefined : eyebrow}
        badge={division.isNew ? `${t.new.toUpperCase()} · ${eyebrow}` : undefined}
      />
      <RenderBlocks blocks={division.layout} ctx={ctx} />
      {division.showOtherDivisions !== false && (
        <DivisionsGrid block={{ blockType: 'divisionsGrid', variant: 'compact', source: 'all', background: 'paper' } as DivisionsGridBlock} ctx={ctx} />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(service)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(breadcrumbJsonLd(crumbs.map((c, i) => (i === crumbs.length - 1 ? { ...c, href: `/divisions/${slug}` } : c)), locale))} />
    </article>
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: l, slug } = await params
  const locale = asLocale(l)
  const [division, settings] = await Promise.all([getDocBySlug('divisions', slug, locale), getSettings(locale)])
  if (!division) return { title: 'Not found', robots: { index: false } }
  return buildMetadata({ meta: division.meta, title: division.title, description: division.summary, path: `/divisions/${slug}`, locale, settings })
}

export async function generateStaticParams() {
  // Pages render on first request and are cached; the build never needs a database
  if (process.env.NEXT_PHASE === 'phase-production-build') return []
  try {
    const payload = await getPayload({ config: configPromise })
    const res = await payload.find({ collection: 'divisions', where: { _status: { equals: 'published' } }, limit: 100, depth: 0, select: { slug: true } })
    return res.docs.map((d) => ({ locale: 'en', slug: d.slug }))
  } catch {
    return []
  }
}
