import type { Metadata } from 'next'
import Link from 'next/link'

import { Hero } from '@/components/Hero'
import { Media } from '@/components/Media'
import { localizePath } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionary'
import { getPageByPath, getSettings, listNews } from '@/lib/data'
import { buildMetadata } from '@/lib/seo'
import { asLocale, blockContext } from '../_components/CmsPage'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'

type Props = { params: Promise<{ locale: string }> }

export default async function NewsIndex({ params }: Props) {
  const { locale: l } = await params
  const locale = asLocale(l)
  const t = getDictionary(locale)
  const [page, posts, ctx] = await Promise.all([getPageByPath('/news', locale), listNews(locale), blockContext(locale, '/news')])
  const fmt = (d?: string | null) => (d ? new Date(d).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '')
  return (
    <article>
      <Hero hero={page?.hero || { type: 'page', visual: 'none' }} locale={locale} title={page?.title || t.news} crumbs={[{ label: t.home, href: '/' }, { label: page?.title || t.news }]} />
      <section className="section">
        <div className="container">
          {posts.length ? (
            <div className="grid grid--3">
              {posts.map((p, i) => (
                <Link key={p.id} href={localizePath(`/news/${p.slug}`, locale)} className="project-card" data-reveal style={{ ['--i' as string]: i % 3 }} prefetch={false}>
                  <div className="project-card__img">{p.coverImage && typeof p.coverImage === 'object' && <Media resource={p.coverImage} fill size="(max-width: 700px) 100vw, 400px" />}</div>
                  <div className="project-card__body">
                    <span className="project-meta">
                      <span>{p.category}</span>
                      <span>{fmt(p.publishedAt)}</span>
                    </span>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 20 }}>{p.title}</span>
                    {p.excerpt && <span className="muted" style={{ fontSize: 14 }}>{p.excerpt}</span>}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="empty">{locale === 'ar' ? 'لا توجد أخبار بعد.' : 'News will appear here soon.'}</p>
          )}
        </div>
      </section>
      <RenderBlocks blocks={page?.layout} ctx={ctx} />
    </article>
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: l } = await params
  const locale = asLocale(l)
  const [page, settings] = await Promise.all([getPageByPath('/news', locale), getSettings(locale)])
  return buildMetadata({ meta: page?.meta, title: page?.title || getDictionary(locale).news, path: '/news', locale, settings })
}
