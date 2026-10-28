import type { Metadata } from 'next'
import Link from 'next/link'

import { Hero } from '@/components/Hero'
import { SearchTracker } from '@/components/site/SearchTracker'
import { localizePath } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionary'
import { payload } from '@/lib/data'
import { asLocale } from '../_components/CmsPage'

// Results depend on the query string, so this page is rendered per request
export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ locale: string }>; searchParams: Promise<{ q?: string }> }

export default async function SearchPage({ params, searchParams }: Props) {
  const { locale: l } = await params
  const locale = asLocale(l)
  const t = getDictionary(locale)
  const q = ((await searchParams).q || '').trim().slice(0, 100)
  const results = q
    ? (
        await (await payload()).find({
          collection: 'search',
          locale,
          limit: 30,
          depth: 0,
          where: { or: [{ title: { like: q } }, { excerpt: { like: q } }] },
          sort: 'priority',
        })
      ).docs
    : []

  return (
    <article>
      <Hero hero={{ type: 'page', visual: 'none' }} locale={locale} title={t.search} crumbs={[{ label: t.home, href: '/' }, { label: t.search }]} />
      <section className="section section--tight">
        <div className="container container--narrow">
          <form role="search" action={localizePath('/search', locale)} className="cluster" style={{ marginBottom: 32 }}>
            <label className="sr-only" htmlFor="q">
              {t.search}
            </label>
            <input id="q" name="q" type="search" defaultValue={q} placeholder={t.searchPlaceholder} className="input" style={{ flex: 1, minWidth: 220 }} />
            <button className="btn btn--secondary" type="submit">
              {t.search}
            </button>
          </form>
          {q && <SearchTracker q={q} count={results.length} />}
          {q && !results.length && <p className="empty">{t.noResults}</p>}
          {results.map((r) => {
            const doc = r as unknown as { id: string; title?: string; url?: string; excerpt?: string; doc?: { relationTo: string } }
            return (
              <Link key={doc.id} href={localizePath(doc.url || '/', locale)} className="search-result" prefetch={false}>
                <span className="mono muted">{doc.doc?.relationTo === 'divisions' ? t.division : doc.doc?.relationTo}</span>
                <h2 className="h3" style={{ margin: '6px 0' }}>
                  {doc.title}
                </h2>
                {doc.excerpt && <p className="muted">{doc.excerpt}</p>}
              </Link>
            )
          })}
        </div>
      </section>
    </article>
  )
}

export const metadata: Metadata = { title: 'Search', robots: { index: false, follow: true } }
