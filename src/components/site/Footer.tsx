import Link from 'next/link'
import React from 'react'

import { localizePath, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionary'
import type { Division, Footer as FooterType, SiteSetting } from '@/payload-types'
import { resolveHref, type LinkData } from '../CMSLink'
import { Icon } from '../Icon'
import { LogoMark } from './Logo'

export function Footer({
  footer,
  settings,
  divisions,
  locale,
}: {
  footer: FooterType
  settings: SiteSetting
  divisions: Division[]
  locale: Locale
}) {
  const t = getDictionary(locale)
  const c = settings.company
  const year = new Date().getFullYear()
  const copyright = (footer.copyright || `© {{year}} ${c?.legalName || 'Sahara Technical Contracting Co.'}. ${t.allRightsReserved}`).replace('{{year}}', String(year))

  return (
    <footer className="site-footer">
      <div className="pattern-grid" aria-hidden="true" style={{ backgroundSize: '48px 48px', maskImage: 'none', opacity: 0.8 }} />
      <div className="container">
        <div className="site-footer__grid">
          <div className="stack" style={{ ['--gap' as string]: '20px' }}>
            <Link href={localizePath('/', locale)} className="brand" style={{ color: '#fff' }}>
              <LogoMark />
              <span className="brand__name">{settings.general?.shortName || 'STCC'}</span>
            </Link>
            {footer.about && <p style={{ color: 'var(--on-dark-2)', fontSize: 15, lineHeight: 1.6 }}>{footer.about}</p>}
            {settings.social?.profiles?.length ? (
              <div className="socials">
                {settings.social.profiles.map((p, i) => (
                  <a key={p.id || i} href={p.url} aria-label={p.platform} target="_blank" rel="noopener noreferrer">
                    <Icon name={p.platform} size={18} />
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          {(footer.columns || []).map((col, i) => (
            <nav key={col.id || i} aria-label={col.title} className="stack" style={{ ['--gap' as string]: '14px' }}>
              <h2>{col.title}</h2>
              <ul>
                {col.source === 'divisions'
                  ? divisions.map((d) => (
                      <li key={d.id}>
                        <Link href={localizePath(`/divisions/${d.slug}`, locale)} prefetch={false}>
                          {d.title}
                        </Link>
                      </li>
                    ))
                  : (col.links || []).map((l, j) => {
                      const href = resolveHref(l.link as LinkData, locale)
                      return href ? (
                        <li key={l.id || j}>
                          <Link href={href} prefetch={false}>
                            {l.link?.label}
                          </Link>
                        </li>
                      ) : null
                    })}
              </ul>
            </nav>
          ))}

          {footer.showContactColumn !== false && (
            <div className="stack" style={{ ['--gap' as string]: '14px' }}>
              <h2>{t.headOffice}</h2>
              <address style={{ fontStyle: 'normal', color: '#dce5f0', fontSize: 15, lineHeight: 1.6 }}>
                {c?.legalName}
                <br />
                {[c?.street, `${c?.city || ''} ${c?.postalCode || ''}`.trim()].filter(Boolean).join(', ')}
                <br />
                {c?.country}
              </address>
              <ul>
                {(c?.phones || []).map((p, i) => (
                  <li key={p.id || i}>
                    <a href={`tel:${p.number.replace(/[^+\d]/g, '')}`} style={{ color: '#fff', fontWeight: 500 }} dir="ltr">
                      {p.number}
                    </a>
                  </li>
                ))}
                {(c?.emails || []).map((e, i) => (
                  <li key={e.id || i}>
                    <a href={`mailto:${e.email}`} style={{ color: '#fff', fontWeight: 500 }}>
                      {e.email}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {footer.wordmark && (
          <div className="wordmark" aria-hidden="true">
            {footer.wordmark}
          </div>
        )}
        <div className="site-footer__bottom">
          <span>{copyright}</span>
          <span className="cluster" style={{ ['--gap' as string]: '24px' }}>
            {(footer.bottomLinks || []).map((l, i) => {
              const href = resolveHref(l.link as LinkData, locale)
              return href ? (
                <Link key={l.id || i} href={href} prefetch={false}>
                  {l.link?.label}
                </Link>
              ) : null
            })}
          </span>
        </div>
      </div>
    </footer>
  )
}
