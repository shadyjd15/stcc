import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Hero } from '@/components/Hero'
import { RichText } from '@/components/RichText'
import { getDictionary } from '@/i18n/dictionary'
import { getDocBySlug, getSettings } from '@/lib/data'
import { breadcrumbJsonLd, buildMetadata, jsonLdHtml } from '@/lib/seo'
import { getServerSideURL } from '@/utilities/getURL'
import { asLocale } from '../../_components/CmsPage'

type Props = { params: Promise<{ locale: string; slug: string }> }

export default async function NewsPost({ params }: Props) {
  const { locale: l, slug } = await params
  const locale = asLocale(l)
  const post = await getDocBySlug('news', slug, locale)
  if (!post) notFound()
  const t = getDictionary(locale)
  const crumbs = [{ label: t.home, href: '/' }, { label: t.news, href: '/news' }, { label: post.title }]
  const date = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-GB', { dateStyle: 'long' }) : ''
  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    publisher: { '@id': `${getServerSideURL()}/#organization` },
    image: post.coverImage && typeof post.coverImage === 'object' ? `${getServerSideURL()}${post.coverImage.url}` : undefined,
  }
  return (
    <article>
      <Hero hero={{ type: 'page', visual: post.coverImage ? 'wideImage' : 'none', media: post.coverImage, text: post.excerpt }} locale={locale} title={post.title} crumbs={crumbs} eyebrow={date} />
      <section className="section">
        <div className="container container--article">
          <RichText data={post.content} />
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(article)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(breadcrumbJsonLd(crumbs, locale))} />
    </article>
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: l, slug } = await params
  const locale = asLocale(l)
  const [post, settings] = await Promise.all([getDocBySlug('news', slug, locale), getSettings(locale)])
  if (!post) return { title: 'Not found', robots: { index: false } }
  return buildMetadata({ meta: post.meta, title: post.title, description: post.excerpt, path: `/news/${slug}`, locale, settings, type: 'article' })
}
