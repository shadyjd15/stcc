import Link from 'next/link'
import React from 'react'

import { localizePath } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionary'
import { getPartners, getTeam } from '@/lib/data'
import type {
  CallToActionBlock as CTAType,
  ChipsBlock as ChipsType,
  ComparisonBlock as ComparisonType,
  ContentBlock as ContentType,
  Division,
  Document,
  DivisionsGridBlock as DivisionsGridType,
  DownloadsBlock as DownloadsType,
  FAQBlock as FAQType,
  FeatureCardsBlock as FeatureCardsType,
  ImageTextBlock as ImageTextType,
  ListPanelBlock as ListPanelType,
  LogosBlock as LogosType,
  MediaBlock as MediaBlockType,
  Partner,
  ProcessStepsBlock as ProcessStepsType,
  RfqCardBlock as RfqType,
  StatsBlock as StatsType,
  TeamBlock as TeamType,
  TeamMember,
} from '@/payload-types'
import { CMSLink, type LinkData } from '../CMSLink'
import { Arrow, Icon } from '../Icon'
import { Media } from '../Media'
import { RichText } from '../RichText'
import { Section, SectionHead, type BlockContext } from './shared'

/* ------------------------------------------------------------------ */
/* Divisions                                                            */
/* ------------------------------------------------------------------ */

export function DivisionsGrid({ block, ctx }: { block: DivisionsGridType; ctx: BlockContext }) {
  const t = getDictionary(ctx.locale)
  let divisions: Division[] =
    block.source === 'selected'
      ? ((block.divisions || []).filter((d) => typeof d === 'object') as Division[])
      : ctx.divisions
  if (block.variant === 'compact' && ctx.currentDivisionId) divisions = divisions.filter((d) => d.id !== ctx.currentDivisionId)
  const href = (d: Division) => localizePath(`/divisions/${d.slug}`, ctx.locale)

  if (block.variant === 'compact') {
    return (
      <Section background={block.background} anchor={block.anchor}>
        <div className="split" style={{ marginBottom: 32 }}>
          <h2 className="h3" style={{ fontSize: 32 }}>{block.header?.heading || t.otherDivisions}</h2>
          <Link href={localizePath('/divisions', ctx.locale)} className="link-arrow" prefetch={false}>
            {t.allDivisions}
            <Arrow />
          </Link>
        </div>
        <div className="grid grid--4" style={{ ['--min' as string]: '220px', gap: 12 }}>
          {divisions.map((d, i) => (
            <Link key={d.id} href={href(d)} className="compact-link" data-reveal style={{ ['--i' as string]: i }} prefetch={false}>
              {d.shortTitle || d.title}
              <Arrow />
            </Link>
          ))}
        </div>
      </Section>
    )
  }

  if (block.variant === 'detailed') {
    return (
      <Section background={block.background} anchor={block.anchor} tight>
        <SectionHead header={block.header} />
        {divisions.map((d) => (
          <article id={d.slug || undefined} key={d.id} className="division-row" data-reveal>
            <div className="division-row__body">
              <div className="cluster" style={{ ['--gap' as string]: '14px' }}>
                <span className="division-row__num">{d.number}</span>
                <span className={`tag ${d.isNew ? 'tag--hot' : ''}`}>{d.isNew ? t.new : d.category}</span>
              </div>
              <h2 className="h3" style={{ fontSize: 'clamp(26px, 2.6vw, 34px)' }}>{d.title}</h2>
              <p className="muted" style={{ maxWidth: 560 }}>{d.summary}</p>
              {d.chips?.length ? (
                <ul className="chips">
                  {d.chips.map((c, i) => (
                    <li className="chip" key={c.id || i}>{c.label}</li>
                  ))}
                </ul>
              ) : null}
              <Link href={href(d)} className="btn btn--secondary btn--sm" style={{ alignSelf: 'flex-start', marginTop: 4 }} prefetch={false}>
                {t.view} {d.shortTitle || d.title}
                <Arrow />
              </Link>
            </div>
            <div className="division-row__visual">
              {d.cardImage && typeof d.cardImage === 'object' ? (
                <Media resource={d.cardImage} fill size="(max-width: 900px) 100vw, 40vw" />
              ) : (
                <Icon name={d.icon || 'building'} strokeWidth={0.5} />
              )}
            </div>
          </article>
        ))}
      </Section>
    )
  }

  return (
    <Section background={block.background} anchor={block.anchor}>
      <SectionHead header={block.header} />
      <div className="grid grid--3">
        {divisions.map((d, i) => (
          <Link key={d.id} href={href(d)} className="card division-card" data-reveal style={{ ['--i' as string]: i % 3 }} prefetch={false}>
            <div className="card__top">
              <span className="card__icon">
                <Icon name={d.icon || 'building'} size={28} />
              </span>
              <span className="card__num">{d.number}</span>
            </div>
            <div className="division-card__body">
              <span className={`tag ${d.isNew ? 'tag--hot' : ''}`}>{d.isNew ? `${t.new} · ${d.category || ''}` : d.category}</span>
              <h3 className="h3">{d.title}</h3>
              <p>{d.summary}</p>
            </div>
            <span className="link-arrow">
              {t.exploreDivision}
              <Arrow />
            </span>
          </Link>
        ))}
        {block.ctaCard?.enabled && block.ctaCard.heading && (
          <CTACard block={block} ctx={ctx} />
        )}
      </div>
    </Section>
  )
}

function CTACard({ block, ctx }: { block: DivisionsGridType; ctx: BlockContext }) {
  const c = block.ctaCard!
  const inner = (
    <>
      <span className="mono">{c.eyebrow}</span>
      <span className="h3">{c.heading}</span>
      <span className="link-arrow" style={{ color: 'var(--deep)' }}>
        {(c.link as LinkData)?.label}
        <Arrow />
      </span>
    </>
  )
  return (
    <CMSLink link={c.link as LinkData} locale={ctx.locale} className="card division-card division-card--cta" data-cta="divisions-card">
      {inner}
    </CMSLink>
  )
}

/* ------------------------------------------------------------------ */
/* Process                                                              */
/* ------------------------------------------------------------------ */

export function ProcessSteps({ block }: { block: ProcessStepsType }) {
  const steps = block.steps || []
  const pattern = block.background === 'navy' || block.background === 'deep' ? 'dots' : undefined
  return (
    <Section background={block.background} anchor={block.anchor} pattern={pattern}>
      <SectionHead header={block.header} aside={block.sideText ? <span className="mono" style={{ color: 'var(--on-dark-2)' }}>{block.sideText}</span> : undefined} />
      {block.variant === 'timeline' && (
        <div className="timeline" data-progress>
          <div className="timeline__track" aria-hidden="true" />
          <div className="timeline__fill" aria-hidden="true" />
          <ol className="timeline__steps">
            {steps.map((s, i) => (
              <li key={s.id || i} className="stack step" data-reveal style={{ ['--i' as string]: i }}>
                <span className="timeline__dot">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="h3" style={{ fontSize: 20 }}>{s.title}</h3>
                {s.description && <p>{s.description}</p>}
              </li>
            ))}
          </ol>
        </div>
      )}
      {block.variant === 'columns' && (
        <ol className="columns-steps">
          {steps.map((s, i) => (
            <li key={s.id || i} className="step" data-reveal style={{ ['--i' as string]: i }}>
              <span className="mono accent">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="h3" style={{ fontSize: 20 }}>{s.title}</h3>
              {s.description && <p>{s.description}</p>}
              {s.note && (
                <span className="step__note">
                  <Icon name="mail" size={14} />
                  {s.note}
                </span>
              )}
            </li>
          ))}
        </ol>
      )}
      {block.variant === 'tiles' && (
        <ol className="tiles-steps">
          {steps.map((s, i) => (
            <li key={s.id || i} className="step" data-reveal style={{ ['--i' as string]: i }}>
              <span className="big-num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="h3" style={{ fontSize: 20 }}>{s.title}</h3>
              {s.description && <p>{s.description}</p>}
            </li>
          ))}
        </ol>
      )}
      {block.variant === 'cards' && (
        <ol className="grid" style={{ ['--min' as string]: '180px', listStyle: 'none', padding: 0, margin: 0, gap: 12 }}>
          {steps.map((s, i) => (
            <li key={s.id || i} className="card" style={{ padding: '24px 20px', minHeight: 200 }} data-reveal>
              <span className="card__top">
                <span className="mono muted">{String(i + 1).padStart(2, '0')}</span>
                <span className="card__bar" style={{ width: 28 }} aria-hidden="true" />
              </span>
              <h3 className="h3" style={{ fontSize: 19 }}>{s.title}</h3>
              {s.description && <p style={{ fontSize: 14 }}>{s.description}</p>}
            </li>
          ))}
        </ol>
      )}
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* Feature cards                                                        */
/* ------------------------------------------------------------------ */

export function FeatureCards({ block, ctx }: { block: FeatureCardsType; ctx: BlockContext }) {
  const cols = block.columns || '3'
  return (
    <Section background={block.background} anchor={block.anchor}>
      <SectionHead header={block.header} />
      <div className={`grid grid--${cols}`}>
        {(block.cards || []).map((c, i) => {
          const tone = c.tone === 'navy' ? 'card--navy' : c.tone === 'accent' ? 'card--accent' : ''
          const link = c.link as LinkData | undefined
          const hasLink = Boolean(link && (link.url || link.reference))
          const body = (
            <>
              {block.variant === 'icon' && (
                <>
                  {c.icon && (
                    <span className={`card__icon ${c.tone === 'light' || !c.tone ? '' : ''}`}>
                      <Icon name={c.icon} size={26} />
                    </span>
                  )}
                  {c.eyebrow && <span className="tag">{c.eyebrow}</span>}
                  {c.title && <h3 className="h3">{c.title}</h3>}
                  {c.text && <p>{c.text}</p>}
                </>
              )}
              {block.variant === 'numbered' && (
                <>
                  <span className="card__num">{c.eyebrow || String(i + 1).padStart(2, '0')}</span>
                  <span className="card__bar" aria-hidden="true" />
                  {c.title && <h3 className="h3">{c.title}</h3>}
                  {c.text && <p>{c.text}</p>}
                </>
              )}
              {block.variant === 'statement' && (
                <>
                  <span className="mono" style={{ color: c.tone === 'navy' ? 'var(--accent)' : undefined }}>{c.eyebrow || c.title}</span>
                  <p className="card__statement" style={{ color: 'inherit' }}>{c.text}</p>
                </>
              )}
              {block.variant === 'checklist' && (
                <>
                  {c.eyebrow && <span className="mono muted">{c.eyebrow}</span>}
                  {c.title && <h3 className="h3" style={{ fontSize: 26 }}>{c.title}</h3>}
                  {c.text && <p>{c.text}</p>}
                  {c.items?.length ? (
                    <ul className="check-list" style={{ paddingTop: 18, borderTop: '1px solid var(--line)' }}>
                      {c.items.map((it, j) => (
                        <li key={it.id || j}>
                          <Icon name="check" strokeWidth={2.2} />
                          {it.text}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </>
              )}
              {hasLink && block.variant !== 'statement' && (
                <span className="link-arrow" style={{ marginTop: 'auto' }}>
                  {link?.label}
                  <Arrow />
                </span>
              )}
            </>
          )
          const className = `card ${tone} ${block.variant === 'statement' ? 'card--tall card--between' : ''}`
          const style = { ['--i' as string]: i % Number(cols) }
          return hasLink ? (
            <CMSLink key={c.id || i} link={link} locale={ctx.locale} className={className}>
              {body}
            </CMSLink>
          ) : (
            <article key={c.id || i} className={className} data-reveal style={style}>
              {body}
            </article>
          )
        })}
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* Stats                                                                */
/* ------------------------------------------------------------------ */

export function Stats({ block }: { block: StatsType }) {
  const words = block.variant === 'words'
  return (
    <section id={block.anchor || undefined} className={`${block.background === 'navy' ? 'bg-navy' : block.background === 'deep' ? 'bg-deep' : block.background === 'paper' ? 'bg-paper' : 'bg-white'}`}>
      <div className="container">
        <div className={`stats-bar ${words ? 'stats-bar--words' : ''}`}>
          {(block.items || []).map((s, i) => (
            <div className="stats-bar__item" key={s.id || i} data-reveal style={{ ['--i' as string]: i }}>
              <span className="stat-value">
                <span data-count={s.value}>{s.value}</span>
                {s.suffix && <small>{s.suffix}</small>}
              </span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Logos                                                                */
/* ------------------------------------------------------------------ */

const LogoBox = ({ p }: { p: Partner }) => (
  <div className="logo-box" title={p.name}>
    {p.logo && typeof p.logo === 'object' && p.logo.url ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={p.logo.url} alt={p.name} loading="lazy" width={p.logo.width || 150} height={p.logo.height || 44} />
    ) : (
      <span>{p.name}</span>
    )}
  </div>
)

export async function Logos({ block }: { block: LogosType }) {
  const partners: Partner[] =
    block.source === 'selected'
      ? ((block.partners || []).filter((p) => typeof p === 'object') as Partner[])
      : await getPartners(block.source === 'partner' ? 'partner' : 'client')
  if (!partners.length) return null

  if (block.variant === 'marquee') {
    return (
      <section id={block.anchor || undefined} aria-label={block.header?.heading || 'Clients'} className="bg-white" style={{ borderTop: 0 }}>
        <div className="container logo-strip">
          {block.header?.eyebrow && <span className="mono muted">{block.header.eyebrow}</span>}
          <div className="marquee">
            <div className="marquee__track">
              {[...partners, ...partners].map((p, i) => (
                <div key={`${p.id}-${i}`} aria-hidden={i >= partners.length ? true : undefined}>
                  <LogoBox p={p} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <Section background={block.background} anchor={block.anchor} tight>
      <div className="split" style={{ marginBottom: 40 }}>
        {block.header?.heading && <h2 className="h3" style={{ fontSize: 32 }}>{block.header.heading}</h2>}
        {block.sideLabel && <span className="mono muted">{block.sideLabel}</span>}
      </div>
      <div className="logo-grid">
        {partners.map((p, i) => (
          <div key={p.id} data-reveal="fade" style={{ ['--i' as string]: i % 6 }}>
            <LogoBox p={p} />
          </div>
        ))}
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* CTA                                                                  */
/* ------------------------------------------------------------------ */

export function CallToAction({ block, ctx }: { block: CTAType; ctx: BlockContext }) {
  const accent = block.tone === 'accent'
  const phone = ctx.settings.company?.phones?.[0]?.number
  const links = (block.links || []) as { link: LinkData; id?: string }[]
  return (
    <section id={block.anchor || undefined} className="section section--tight" style={{ paddingTop: 0, background: 'transparent' }}>
      <div className="container">
        <div className={`cta-box ${accent ? 'cta-box--accent' : ''}`} data-reveal>
          {!accent && <div className="pattern-grid" aria-hidden="true" style={{ maskImage: 'none' }} />}
          <div className="cta-box__copy">
            {block.eyebrow && <span className="mono" style={{ color: accent ? 'var(--deep)' : 'var(--accent)' }}>{block.eyebrow}</span>}
            <h2 className="h2" style={{ fontSize: 'clamp(28px, 3.6vw, 48px)' }}>{block.heading}</h2>
            {block.text && <p style={{ color: accent ? 'var(--deep)' : 'var(--on-dark)', maxWidth: 620 }}>{block.text}</p>}
          </div>
          <div className="cta-box__actions">
            {links.map((l, i) => (
              <CMSLink key={l.id || i} link={l.link} locale={ctx.locale} button appearance={i === 0 ? (accent ? 'dark' : 'primary') : 'outline'} data-cta="cta-banner" />
            ))}
            {block.showPhone && phone && (
              <a href={`tel:${phone.replace(/[^+\d]/g, '')}`} className="btn btn--outline" style={{ fontFamily: 'var(--font-mono)' }} data-cta="cta-phone">
                {phone}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Content                                                              */
/* ------------------------------------------------------------------ */

export function Content({ block }: { block: ContentType }) {
  if (block.layout === 'split') {
    return (
      <Section background={block.background} anchor={block.anchor}>
        <div className="content-split">
          <div className="content-split__head" data-reveal>
            {block.header?.eyebrow && <span className="eyebrow">{block.header.eyebrow}</span>}
            {block.header?.heading && <h2 className="h2 h2--sm">{block.header.heading}</h2>}
          </div>
          <div className="content-split__body" data-reveal style={{ ['--i' as string]: 1 }}>
            <RichText data={block.content} />
          </div>
        </div>
      </Section>
    )
  }
  return (
    <Section background={block.background} anchor={block.anchor}>
      <div className={block.layout === 'narrow' ? 'container--article' : ''} style={{ marginInline: block.layout === 'narrow' ? 'auto' : undefined, padding: 0 }}>
        <SectionHead header={block.header} small />
        <RichText data={block.content} />
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* Chips / sectors                                                      */
/* ------------------------------------------------------------------ */

export function Chips({ block }: { block: ChipsType }) {
  const items = block.items || []
  if (block.variant === 'rows') {
    return (
      <Section background={block.background} anchor={block.anchor}>
        <div className="content-split">
          <div className="content-split__head" style={{ flex: '1 1 340px' }} data-reveal>
            {block.header?.eyebrow && <span className="eyebrow">{block.header.eyebrow}</span>}
            {block.header?.heading && <h2 className="h2 h2--sm">{block.header.heading}</h2>}
            {block.header?.intro && <p className="muted">{block.header.intro}</p>}
          </div>
          <ul className="rows-list content-split__body">
            {items.map((c, i) => (
              <li key={c.id || i} data-reveal style={{ ['--i' as string]: i % 2 }}>
                <span>{c.label}</span>
                <span className="mono">{String(i + 1).padStart(2, '0')}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    )
  }
  const dark = block.background === 'navy' || block.background === 'deep'
  return (
    <Section background={block.background} anchor={block.anchor}>
      <div className="content-split" style={{ alignItems: 'center' }}>
        <div className="content-split__head" data-reveal>
          {block.header?.eyebrow && <span className="eyebrow">{block.header.eyebrow}</span>}
          {block.header?.heading && <h2 className="h2 h2--sm">{block.header.heading}</h2>}
          {block.header?.intro && <p className={dark ? '' : 'muted'} style={dark ? { color: 'var(--on-dark)' } : undefined}>{block.header.intro}</p>}
        </div>
        <div className="content-split__body" data-reveal style={{ ['--i' as string]: 1 }}>
          {block.listLabel && <span className="mono" style={{ display: 'block', marginBottom: 18, color: dark ? 'var(--on-dark-2)' : 'var(--muted)' }}>{block.listLabel}</span>}
          <ul className="chips chips--lg">
            {items.map((c, i) => (
              <li className="chip" key={c.id || i}>{c.label}</li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* Comparison                                                           */
/* ------------------------------------------------------------------ */

export function Comparison({ block }: { block: ComparisonType }) {
  return (
    <Section background={block.background} anchor={block.anchor}>
      <SectionHead header={block.header} />
      <div className="table-wrap" data-reveal>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">{block.col1}</th>
              <th scope="col">{block.col2}</th>
              <th scope="col">{block.col3}</th>
            </tr>
          </thead>
          <tbody>
            {(block.rows || []).map((r, i) => (
              <tr key={r.id || i}>
                <th scope="row">{r.label}</th>
                <td>{r.a}</td>
                <td>{r.b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* FAQ (native <details>, no JS needed)                                  */
/* ------------------------------------------------------------------ */

export function FAQ({ block }: { block: FAQType }) {
  const items = block.items || []
  const schema = block.enableSchema
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((i) => ({ '@type': 'Question', name: i.question, acceptedAnswer: { '@type': 'Answer', text: i.answer } })),
      }
    : null
  return (
    <Section background={block.background} anchor={block.anchor}>
      <div className="faq">
        <div className="faq__intro stack" style={{ ['--gap' as string]: '16px' }} data-reveal>
          {block.header?.eyebrow && <span className="eyebrow">{block.header.eyebrow}</span>}
          {block.header?.heading && <h2 className="h2 h2--sm">{block.header.heading}</h2>}
          {block.header?.intro && <p className="muted">{block.header.intro}</p>}
        </div>
        <div className="faq__list">
          {items.map((it, i) => (
            <details key={it.id || i} open={i === 0}>
              <summary>
                {it.question}
                <span className="faq__icon" aria-hidden="true">
                  <Icon name="plus" size={18} />
                </span>
              </summary>
              <p>{it.answer}</p>
            </details>
          ))}
        </div>
      </div>
      {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />}
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* Downloads                                                            */
/* ------------------------------------------------------------------ */

export function Downloads({ block }: { block: DownloadsType }) {
  const docs = (block.documents || []).filter((d) => typeof d === 'object') as Document[]
  return (
    <Section background={block.background} anchor={block.anchor}>
      <SectionHead header={block.header} />
      <div className="grid grid--3">
        {docs.map((d, i) => (
          <a key={d.id} href={d.url || '#'} className="download" data-track="download" data-label={d.title} target="_blank" rel="noopener" data-reveal style={{ ['--i' as string]: i }}>
            <span className="download__file" aria-hidden="true">
              {(d.filename?.split('.').pop() || 'PDF').toUpperCase()}
            </span>
            <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <strong style={{ fontFamily: 'var(--font-display)', fontSize: 18 }}>{d.title}</strong>
              <span className="muted" style={{ fontSize: 14 }}>
                {[d.description, d.revision].filter(Boolean).join(' · ')}
              </span>
            </span>
            <Icon name="download" size={22} />
          </a>
        ))}
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* Team                                                                 */
/* ------------------------------------------------------------------ */

export async function Team({ block, ctx }: { block: TeamType; ctx: BlockContext }) {
  const selected = (block.members || []).filter((m) => typeof m === 'object') as TeamMember[]
  const members = selected.length ? selected : await getTeam(ctx.locale)
  if (!members.length) return null
  const t = getDictionary(ctx.locale)
  return (
    <Section background={block.background} anchor={block.anchor}>
      <SectionHead header={block.header} />
      <div className="grid grid--4">
        {members.map((m, i) => (
          <div className="person" key={m.id} data-reveal style={{ ['--i' as string]: i % 4 }}>
            <div className="person__photo">
              {m.photo && typeof m.photo === 'object' ? (
                <Media resource={m.photo} fill size="(max-width: 600px) 100vw, 300px" />
              ) : (
                <div className="placeholder" style={{ height: '100%', color: 'var(--muted)' }}>[ {t.photoPlaceholder} ]</div>
              )}
            </div>
            <div className="person__body">
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 18 }}>{m.name}</span>
              <span className="muted" style={{ fontSize: 14 }}>{m.role}</span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* Media                                                                */
/* ------------------------------------------------------------------ */

export function MediaBlockView({ block }: { block: MediaBlockType }) {
  return (
    <section id={block.anchor || undefined} className="section section--tight">
      <div className={block.size === 'full' ? '' : 'container'}>
        <figure className="media-figure" data-reveal="fade">
          <Media resource={block.media} size={block.size === 'full' ? '100vw' : '(max-width: 1280px) 100vw, 1280px'} />
          {block.caption && <figcaption className={block.size === 'full' ? 'container' : ''}>{block.caption}</figcaption>}
        </figure>
      </div>
    </section>
  )
}

export function ImageText({ block, ctx }: { block: ImageTextType; ctx: BlockContext }) {
  const links = (block.links || []) as { link: LinkData; id?: string }[]
  return (
    <Section background={block.background} anchor={block.anchor}>
      <div className={`image-text ${block.imagePosition === 'start' ? 'image-text--start' : ''}`}>
        <div className="image-text__copy" data-reveal>
          {block.header?.eyebrow && <span className="eyebrow">{block.header.eyebrow}</span>}
          {block.header?.heading && <h2 className="h2 h2--sm">{block.header.heading}</h2>}
          {block.header?.intro && <p className="lead">{block.header.intro}</p>}
          <RichText data={block.content} />
          {links.length > 0 && (
            <div className="cluster">
              {links.map((l, i) => (
                <CMSLink key={l.id || i} link={l.link} locale={ctx.locale} button arrow={i === 0} appearance={i === 0 ? undefined : 'outline'} />
              ))}
            </div>
          )}
        </div>
        <div className="image-text__media" style={{ position: 'relative' }} data-reveal="fade">
          {block.media && typeof block.media === 'object' ? <Media resource={block.media} fill size="(max-width: 900px) 100vw, 50vw" /> : null}
        </div>
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* List panel                                                           */
/* ------------------------------------------------------------------ */

export function ListPanel({ block }: { block: ListPanelType }) {
  const items = block.items || []
  return (
    <Section background={block.background} anchor={block.anchor}>
      <div className="stack-panel">
        <div className="stack-panel__copy" data-reveal>
          {block.header?.eyebrow && <span className="eyebrow">{block.header.eyebrow}</span>}
          {block.header?.heading && <h2 className="h2 h2--sm">{block.header.heading}</h2>}
          {block.header?.intro && <p className="lead" style={{ fontSize: 17 }}>{block.header.intro}</p>}
        </div>
        <div className="stack-panel__layers">
          {items.map((it, i) => (
            <div
              key={it.id || i}
              className={`layer ${it.highlight ? 'layer--hot' : ''}`}
              style={{ ['--a' as string]: Math.max(0.03, 0.1 - i * 0.015), ['--i' as string]: i }}
              data-reveal="left"
            >
              {it.key && <span className="layer__key">{it.key}</span>}
              <span className="layer__title">{it.title}</span>
              {it.text && <span className="layer__text">{it.text}</span>}
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* RFQ card                                                             */
/* ------------------------------------------------------------------ */

export function RfqCard({ block, ctx }: { block: RfqType; ctx: BlockContext }) {
  return (
    <section id={block.anchor || undefined} className="section section--tight">
      <div className="container">
        <div className="card" style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 32, borderRadius: 28, padding: 'clamp(28px, 4vw, 56px)' }} data-reveal>
          <div className="stack" style={{ flex: '1 1 420px', justifyContent: 'center' }}>
            <span className="mono" style={{ color: 'var(--navy)' }}>{block.eyebrow}</span>
            <h2 className="h2 h2--sm">{block.heading}</h2>
            {block.text && <p>{block.text}</p>}
          </div>
          <div style={{ flex: '1 1 380px', display: 'flex' }}>
            <CMSLink link={block.link as LinkData} locale={ctx.locale} className="dropzone" data-cta="rfq-card">
              <Icon name="upload" size={40} />
              <strong>{(block.link as LinkData)?.label || 'Upload your bill of materials'}</strong>
              <span className="muted" style={{ fontSize: 13 }}>XLSX · CSV · PDF</span>
            </CMSLink>
          </div>
        </div>
      </div>
    </section>
  )
}
