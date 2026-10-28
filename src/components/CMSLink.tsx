import Link from 'next/link'
import React from 'react'

import { localizePath, type Locale } from '@/i18n/config'
import { docPath } from '@/utilities/paths'
import { Arrow } from './Icon'

export type LinkData = {
  type?: 'reference' | 'custom' | null
  reference?: { relationTo: string; value: unknown } | null
  url?: string | null
  label?: string | null
  newTab?: boolean | null
  appearance?: string | null
}

export const resolveHref = (link: LinkData | null | undefined, locale: Locale): string | null => {
  if (!link) return null
  if (link.type === 'custom' || (!link.reference && link.url)) {
    const url = link.url || ''
    if (!url) return null
    if (url.startsWith('/') && !url.startsWith('//')) return localizePath(url, locale)
    return url
  }
  const value = link.reference?.value
  if (value && typeof value === 'object') {
    return localizePath(docPath(link.reference!.relationTo, value as { slug?: string; path?: string }), locale)
  }
  return null
}

type Props = {
  link: LinkData | null | undefined
  locale: Locale
  className?: string
  children?: React.ReactNode
  /** render as a button using the link's appearance (or this override) */
  button?: boolean
  appearance?: string
  arrow?: boolean
  size?: 'sm'
  'data-cta'?: string
}

export function CMSLink({ link, locale, className, children, button, appearance, arrow, size, ...rest }: Props) {
  const href = resolveHref(link, locale)
  if (!href) return null
  const look = appearance || link?.appearance || 'primary'
  const classes = [
    button ? `btn btn--${look === 'link' ? 'ghost' : look}` : '',
    button && size === 'sm' ? 'btn--sm' : '',
    !button && look === 'link' ? 'link-arrow' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')
  const content = (
    <>
      {children ?? link?.label}
      {arrow && <Arrow />}
    </>
  )
  const external = /^(https?:)?\/\//.test(href) || /^(mailto|tel):/.test(href)
  const newTab = link?.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {}
  if (external || href.startsWith('#')) {
    return (
      <a href={href} className={classes || undefined} {...newTab} data-cta={rest['data-cta']}>
        {content}
      </a>
    )
  }
  return (
    <Link href={href} className={classes || undefined} {...newTab} data-cta={rest['data-cta']} prefetch={false}>
      {content}
    </Link>
  )
}
