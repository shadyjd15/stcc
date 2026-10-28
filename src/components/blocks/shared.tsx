import React from 'react'

import type { Locale } from '@/i18n/config'
import type { Division, SiteSetting } from '@/payload-types'

export type BlockContext = {
  locale: Locale
  settings: SiteSetting
  divisions: Division[]
  turnstileSiteKey: string
  pagePath: string
  /** id of the current division (to exclude from "other divisions") */
  currentDivisionId?: string | number
}

export const bgClass = (bg?: string | null) =>
  bg === 'white' ? 'bg-white' : bg === 'navy' ? 'bg-navy' : bg === 'deep' ? 'bg-deep' : 'bg-paper'

export function Section({
  background,
  anchor,
  children,
  className = '',
  pattern,
  tight,
}: {
  background?: string | null
  anchor?: string | null
  children: React.ReactNode
  className?: string
  pattern?: 'grid' | 'dots'
  tight?: boolean
}) {
  return (
    <section id={anchor || undefined} className={`section ${tight ? 'section--tight' : ''} ${bgClass(background)} ${className}`}>
      {pattern && <div className={pattern === 'dots' ? 'pattern-dots' : 'pattern-grid'} aria-hidden="true" />}
      <div className="container relative">{children}</div>
    </section>
  )
}

export function SectionHead({
  header,
  aside,
  level = 2,
  small,
}: {
  header?: { eyebrow?: string | null; heading?: string | null; intro?: string | null } | null
  aside?: React.ReactNode
  level?: 2 | 3
  small?: boolean
}) {
  if (!header?.eyebrow && !header?.heading && !header?.intro && !aside) return null
  const H = level === 2 ? 'h2' : 'h3'
  return (
    <div className="section-head">
      <div className="section-head__main" data-reveal>
        {header?.eyebrow && <span className="eyebrow">{header.eyebrow}</span>}
        {header?.heading && <H className={`h2 ${small ? 'h2--sm' : ''}`}>{header.heading}</H>}
      </div>
      {(header?.intro || aside) && (
        <div className="section-head__aside" data-reveal style={{ ['--i' as string]: 1 }}>
          {header?.intro && <p className="lead" style={{ fontSize: 17 }}>{header.intro}</p>}
          {aside}
        </div>
      )}
    </div>
  )
}
