import Link from 'next/link'
import React from 'react'

import { localizePath, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionary'
import type { Division, Header as HeaderType, SiteSetting } from '@/payload-types'
import { resolveHref, type LinkData } from '../CMSLink'
import { Icon } from '../Icon'
import { HeaderNav, type NavItem } from './HeaderNav'
import { LanguageSwitch } from './LanguageSwitch'
import { Logo } from './Logo'

export function Header({
  header,
  settings,
  divisions,
  locale,
}: {
  header: HeaderType
  settings: SiteSetting
  divisions: Division[]
  locale: Locale
}) {
  const t = getDictionary(locale)
  const top = header.topBar
  const phones = settings.company?.phones || []
  const emails = settings.company?.emails || []

  const items: NavItem[] = (header.navItems || [])
    .map((item) => {
      const href = resolveHref(item.link as LinkData, locale)
      if (!href) return null
      const base: NavItem = {
        label: item.link?.label || '',
        href,
        activeOn: item.activeOn ? localizePath(item.activeOn, locale) : undefined,
        dropdown: (item.dropdown as NavItem['dropdown']) || 'none',
        children: [],
      }
      if (item.dropdown === 'divisions') {
        base.children = divisions.map((d) => ({
          label: d.title,
          href: localizePath(`/divisions/${d.slug}`, locale),
          description: d.summary?.split('.')[0] || '',
          icon: d.icon || 'building',
          isNew: Boolean(d.isNew),
        }))
        base.allLabel = t.allDivisions
      } else if (item.dropdown === 'custom') {
        base.children = (item.children || [])
          .map((c) => ({ label: c.link?.label || '', href: resolveHref(c.link as LinkData, locale) || '', description: c.description || '' }))
          .filter((c) => c.href)
      }
      return base
    })
    .filter(Boolean) as NavItem[]

  const cta = header.cta?.enabled ? { label: header.cta.link?.label || t.requestQuote, href: resolveHref(header.cta.link as LinkData, locale) } : null
  const vendor = top?.vendorButton?.enabled ? { label: top.vendorButton.link?.label || t.vendorRegistration, href: resolveHref(top.vendorButton.link as LinkData, locale) } : null
  const ann = settings.announcement

  return (
    <>
      <a href="#main" className="skip-link">
        {t.skipToContent}
      </a>
      {ann?.enabled && ann.text && (
        <div className={`announcement announcement--${ann.tone || 'accent'}`} role="region" aria-label="Announcement">
          <span>{ann.text}</span>
          {ann.linkUrl && <a href={ann.linkUrl.startsWith('/') ? localizePath(ann.linkUrl, locale) : ann.linkUrl}>{ann.linkLabel || t.readMore}</a>}
        </div>
      )}
      {top?.enabled !== false && (
        <div className="topbar">
          <div className="container topbar__inner">
            <div className="topbar__contacts">
              {top?.showContacts !== false &&
                [...phones.map((p) => ({ href: `tel:${p.number.replace(/[^+\d]/g, '')}`, text: p.number, track: 'call' })), ...emails.slice(0, 1).map((e) => ({ href: `mailto:${e.email}`, text: e.email, track: 'email' }))].map((c) => (
                  <a key={c.href} href={c.href} data-track={c.track} dir="ltr">
                    {c.text}
                  </a>
                ))}
              {(top?.extraLinks || []).map((l, i) => {
                const href = resolveHref(l.link as LinkData, locale)
                return href ? (
                  <a key={l.id || i} href={href}>
                    {l.link?.label}
                  </a>
                ) : null
              })}
            </div>
            <div className="topbar__actions">
              {vendor?.href && (
                <Link href={vendor.href} className="topbar__vendor" data-cta="topbar-vendor" prefetch={false}>
                  <Icon name="building" size={14} strokeWidth={2} />
                  {vendor.label}
                </Link>
              )}
              {settings.languages?.enableArabic && <LanguageSwitch locale={locale} label={t.language} />}
            </div>
          </div>
        </div>
      )}
      <header className="site-header" data-header>
        <div className="container site-header__inner">
          <Link href={localizePath('/', locale)} className="brand" aria-label={`${settings.general?.shortName || 'STCC'} – ${t.home}`}>
            <Logo logo={settings.general?.logoLight} shortName={settings.general?.shortName} name="Sahara Technical Cont. Co." />
          </Link>
          <HeaderNav items={items} cta={cta?.href ? { label: cta.label, href: cta.href } : null} labels={{ menu: t.menu, close: t.closeMenu }} vendor={vendor?.href ? { label: vendor.label, href: vendor.href } : null} />
        </div>
      </header>
    </>
  )
}
