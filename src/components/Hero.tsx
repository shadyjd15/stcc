import Link from 'next/link'
import React from 'react'

import { localizePath, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionary'
import type { Division, Page } from '@/payload-types'
import { Accented } from './Accented'
import { CMSLink, type LinkData } from './CMSLink'
import { Illustration } from './illustrations'
import { Media } from './Media'

export type HeroData = NonNullable<Page['hero']>
export type Crumb = { label: string; href?: string }

export function Breadcrumbs({ items, locale }: { items: Crumb[]; locale: Locale }) {
  if (!items.length) return null
  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <ol>
        {items.map((c, i) => (
          <li key={i}>
            {c.href && i < items.length - 1 ? (
              <Link href={localizePath(c.href, locale)} prefetch={false}>
                {c.label}
              </Link>
            ) : (
              <span aria-current={i === items.length - 1 ? 'page' : undefined}>{c.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

type Props = {
  hero?: HeroData | null
  locale: Locale
  title: string
  crumbs?: Crumb[]
  divisions?: Division[]
  /** eyebrow fallback, e.g. "DIVISION 04 · NEW DIVISION" */
  eyebrow?: string
  badge?: string
}

export function Hero({ hero, locale, title, crumbs = [], divisions = [], eyebrow, badge }: Props) {
  const t = getDictionary(locale)
  const type = hero?.type || 'page'
  if (type === 'none') return null

  const visual = hero?.visual || 'none'
  const heading = hero?.heading || title
  const links = (hero?.links || []) as { link: LinkData; id?: string }[]
  const isHome = type === 'home'
  const centered = type === 'centered'

  const copy = (
    <div className="hero__copy hero-anim">
      {!isHome && <Breadcrumbs items={crumbs} locale={locale} />}
      {badge && (
        <span className="badge" style={{ alignSelf: centered ? 'center' : 'flex-start' }}>
          <span className="badge__dot" />
          {badge}
        </span>
      )}
      {(hero?.eyebrow || eyebrow) && (
        <span className={`eyebrow ${isHome ? 'eyebrow--line' : 'eyebrow--plain eyebrow--accent'}`}>{hero?.eyebrow || eyebrow}</span>
      )}
      <h1 className="display">
        <Accented text={heading} />
      </h1>
      {hero?.text && visual !== 'sideText' && <p className="lead">{hero.text}</p>}
      {links.length > 0 && (
        <div className="cluster" style={centered ? { justifyContent: 'center' } : undefined}>
          {links.map((l, i) => (
            <CMSLink key={l.id || i} link={l.link} locale={locale} button arrow={i === 0} appearance={i === 0 ? l.link.appearance || 'primary' : l.link.appearance || 'outline'} data-cta={`hero-${i}`} />
          ))}
        </div>
      )}
    </div>
  )

  let side: React.ReactNode = null
  if (visual === 'sideText' && hero?.text) side = <p className="hero__side-text">{hero.text}</p>
  if (visual === 'illustration') {
    side = (
      <div className="hero__visual">
        <Illustration name={hero?.illustration} divisions={divisions} />
      </div>
    )
  }
  if (visual === 'image' && hero?.media) {
    side = (
      <div className="hero__visual">
        <div className="hero__media" style={{ position: 'relative' }}>
          <Media resource={hero.media} fill priority size="(max-width: 1024px) 100vw, 600px" />
        </div>
      </div>
    )
  }
  if (visual === 'panel' && hero?.panel) {
    side = (
      <div className="hero__visual">
        <div className="hero-panel">
          <div className="hero-panel__head">
            <span>{hero.panel.title}</span>
            {hero.panel.badge && (
              <span className="hero-panel__badge">
                <span className="badge__dot" />
                {hero.panel.badge}
              </span>
            )}
          </div>
          {(hero.panel.items || []).map((it, i) => (
            <div className="hero-panel__row" key={it.id || i} data-reveal style={{ ['--i' as string]: i }}>
              <span className="hero-panel__key">{it.key}</span>
              <span>
                <strong>{it.title}</strong>
                <span>{it.text}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }
  if (visual === 'tiles' && hero?.tiles?.length) {
    side = (
      <div className="hero__visual">
        <div className="tiles">
          {hero.tiles.map((tile, i) => (
            <div className={`tile ${tile.highlight ? 'tile--hot' : ''}`} key={tile.id || i}>
              <strong>{tile.value}</strong>
              <span>{tile.label}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const pattern = hero?.pattern === 'dots' ? 'pattern-dots' : 'pattern-grid'

  return (
    <section className={`hero ${centered ? 'hero--centered' : ''}`}>
      <div className={pattern} aria-hidden="true" />
      {isHome && <div className="hero__ring" aria-hidden="true" />}
      <div className={`container hero__inner ${visual === 'sideText' || visual === 'tiles' ? 'hero__inner--end' : ''}`}>
        {copy}
        {side}
      </div>

      {visual === 'wideImage' && (
        <div className="container relative">
          <div className="hero__wide">
            {hero?.media ? <Media resource={hero.media} fill priority size="(max-width: 1280px) 100vw, 1280px" /> : <div className="placeholder" style={{ height: '100%' }}>[ {t.photoPlaceholder} ]</div>}
          </div>
        </div>
      )}

      {isHome && hero?.stats?.length ? (
        <div className="container relative">
          <div className="hero-stats">
            {hero.stats.map((s, i) => (
              <div className="hero-stats__item" key={s.id || i}>
                <span className="stat-value">
                  <span data-count={s.value}>{s.value}</span>
                  {s.suffix && <small>{s.suffix}</small>}
                </span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {hero?.showDivisionLinks && divisions.length > 0 && (
        <div className="jump-links">
          <div className="container jump-links__inner">
            {divisions.map((d) => (
              <a key={d.id} href={`#${d.slug}`}>
                <span>{d.number}</span> {d.shortTitle || d.title}
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
