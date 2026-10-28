import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'

import { Hero } from '@/components/Hero'
import { Arrow } from '@/components/Icon'
import { Media } from '@/components/Media'
import { RichText } from '@/components/RichText'
import { localizePath } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionary'
import { getDocBySlug, getSettings } from '@/lib/data'
import { breadcrumbJsonLd, buildMetadata, jsonLdHtml } from '@/lib/seo'
import type { Division } from '@/payload-types'
import { asLocale } from '../../_components/CmsPage'

type Props = { params: Promise<{ locale: string; slug: string }> }

export default async function ProjectPage({ params }: Props) {
  const { locale: l, slug } = await params
  const locale = asLocale(l)
  const p = await getDocBySlug('projects', slug, locale)
  if (!p) notFound()
  const t = getDictionary(locale)
  const divisions = (p.divisions || []).filter((d) => typeof d === 'object') as Division[]
  const crumbs = [{ label: t.home, href: '/' }, { label: locale === 'ar' ? 'المشاريع' : 'Projects', href: '/projects' }, { label: p.title }]

  return (
    <article>
      <Hero hero={{ type: 'page', visual: p.coverImage ? 'wideImage' : 'none', media: p.coverImage, text: p.summary }} locale={locale} title={p.title} crumbs={crumbs} />
      <section className="section">
        <div className="container">
          <div className="job-layout">
            <div className="job-layout__main">
              {[['challenge', p.challenge], ['solution', p.solution], ['result', p.result]].map(([k, v]) =>
                v ? (
                  <div key={k} className="stack" data-reveal>
                    <span className="eyebrow">{t[k as 'challenge']}</span>
                    <p className="prose">{v}</p>
                  </div>
                ) : null,
              )}
              <RichText data={p.content} />
              {p.gallery?.length ? (
                <div className="grid grid--2">
                  {p.gallery.map((g, i) =>
                    typeof g === 'object' ? (
                      <div key={g.id || i} style={{ position: 'relative', aspectRatio: '4/3', borderRadius: 20, overflow: 'hidden' }}>
                        <Media resource={g} fill size="(max-width: 900px) 100vw, 40vw" />
                      </div>
                    ) : null,
                  )}
                </div>
              ) : null}
            </div>
            <aside className="job-layout__aside">
              <div className="card">
                <dl className="facts" style={{ gridTemplateColumns: '1fr' }}>
                  {[[t.client, p.client], [t.location, p.location], [t.division, divisions.map((d) => d.title).join(', ')], [t.completed, p.year], ['Duration', p.duration], ['Value', p.value]].map(([k, v]) =>
                    v ? (
                      <div key={String(k)}>
                        <dt>{k}</dt>
                        <dd>{v}</dd>
                      </div>
                    ) : null,
                  )}
                </dl>
                {(p.metrics || []).length > 0 && (
                  <div className="grid" style={{ ['--min' as string]: '120px', marginTop: 8 }}>
                    {(p.metrics || []).map((m, i) => (
                      <div key={m.id || i}>
                        <strong style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--navy)' }}>{m.value}</strong>
                        <div className="muted" style={{ fontSize: 13 }}>{m.label}</div>
                      </div>
                    ))}
                  </div>
                )}
                <Link href={localizePath('/request-a-quote', locale)} className="btn btn--secondary btn--block" prefetch={false}>
                  {t.requestQuote}
                  <Arrow />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(breadcrumbJsonLd(crumbs, locale))} />
    </article>
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: l, slug } = await params
  const locale = asLocale(l)
  const [p, settings] = await Promise.all([getDocBySlug('projects', slug, locale), getSettings(locale)])
  if (!p) return { title: 'Not found', robots: { index: false } }
  return buildMetadata({ meta: p.meta, title: p.title, description: p.summary, path: `/projects/${slug}`, locale, settings })
}
