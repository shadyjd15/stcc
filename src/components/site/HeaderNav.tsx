'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { ICONS, type IconName } from '@/fields/icons'

export type NavItem = {
  label: string
  href: string
  activeOn?: string
  dropdown: 'none' | 'divisions' | 'custom'
  allLabel?: string
  children: { label: string; href: string; description?: string; icon?: string; isNew?: boolean }[]
}

const Svg = ({ d, size = 20 }: { d: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
)

export function HeaderNav({
  items,
  cta,
  vendor,
  labels,
}: {
  items: NavItem[]
  cta: { label: string; href: string } | null
  vendor: { label: string; href: string } | null
  labels: { menu: string; close: string }
}) {
  const pathname = usePathname() || '/'
  const [open, setOpen] = useState(false)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const navRef = useRef<HTMLElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // close menus on navigation (state adjusted during render, as React recommends)
  const [menuPath, setMenuPath] = useState(pathname)
  if (menuPath !== pathname) {
    setMenuPath(pathname)
    setOpen(false)
    setOpenIndex(null)
  }

  // lock scroll when the mobile menu is open
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [open])

  // header shadow after scrolling
  useEffect(() => {
    const header = document.querySelector('[data-header]')
    const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Escape closes, outside click closes dropdown
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenIndex(null)
        setOpen(false)
      }
    }
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenIndex(null)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('click', onClick)
    }
  }, [])

  const isActive = useCallback(
    (item: NavItem) => {
      const strip = (p: string) => p.replace(/\/$/, '') || '/'
      const current = strip(pathname)
      const href = strip(item.href)
      if (href === '/' || href === '/ar') return current === href
      if (current === href || current.startsWith(`${href}/`)) return true
      if (item.activeOn && (current === strip(item.activeOn) || current.startsWith(`${strip(item.activeOn)}/`))) return true
      return false
    },
    [pathname],
  )

  const hoverOpen = (i: number) => {
    if (window.matchMedia('(min-width: 1024px)').matches) {
      if (closeTimer.current) clearTimeout(closeTimer.current)
      setOpenIndex(i)
    }
  }
  const hoverClose = () => {
    if (window.matchMedia('(min-width: 1024px)').matches) {
      closeTimer.current = setTimeout(() => setOpenIndex(null), 160)
    }
  }

  return (
    <>
      <nav ref={navRef} id="site-nav" aria-label="Main" className={`nav ${open ? 'is-open' : ''}`}>
        <button type="button" className="menu-toggle nav-close" aria-label={labels.close} onClick={() => setOpen(false)}>
          <Svg d={ICONS.x} />
        </button>
        <ul className="nav__list">
          {items.map((item, i) => {
            const active = isActive(item)
            const hasDropdown = item.dropdown !== 'none' && item.children.length > 0
            return (
              <li
                key={item.href + i}
                className={`nav__item ${openIndex === i ? 'is-open' : ''}`}
                onMouseEnter={hasDropdown ? () => hoverOpen(i) : undefined}
                onMouseLeave={hasDropdown ? hoverClose : undefined}
              >
                {hasDropdown ? (
                  <>
                    <button
                      type="button"
                      className={`nav__link ${active ? 'is-active' : ''}`}
                      aria-expanded={openIndex === i}
                      aria-controls={`mega-${i}`}
                      onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    >
                      {item.label}
                      <svg viewBox="0 0 24 24" className="icon nav__chevron" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                    <div id={`mega-${i}`} className={`mega ${item.dropdown === 'custom' ? 'mega--narrow' : ''}`}>
                      {item.children.map((c) => (
                        <Link key={c.href} href={c.href} className="mega__link" prefetch={false}>
                          {c.icon && (
                            <span className="mega__icon">
                              <Svg d={ICONS[(c.icon as IconName) in ICONS ? (c.icon as IconName) : 'building']} size={22} />
                            </span>
                          )}
                          <span>
                            <span className="mega__title">
                              {c.label}
                              {c.isNew && <span className="tag tag--hot">New</span>}
                            </span>
                            {c.description && <span className="mega__desc">{c.description}</span>}
                          </span>
                        </Link>
                      ))}
                      {item.allLabel && (
                        <Link href={item.href} className="mega__all" prefetch={false}>
                          {item.allLabel}
                          <span className="accent">
                            <Svg d={ICONS.arrowRight} size={18} />
                          </span>
                        </Link>
                      )}
                    </div>
                  </>
                ) : (
                  <Link href={item.href} className={`nav__link ${active ? 'is-active' : ''}`} aria-current={active ? 'page' : undefined} prefetch={false}>
                    {item.label}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>
        {cta && (
          <Link href={cta.href} className="btn btn--sm header-cta" data-cta="header" prefetch={false}>
            {cta.label}
            <svg viewBox="0 0 24 24" className="icon icon--arrow" style={{ ['--size' as string]: '16px' }} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12h15M13 6l6 6-6 6" />
            </svg>
          </Link>
        )}
        {vendor && (
          <Link href={vendor.href} className="btn btn--outline btn--sm header-cta" style={{ marginTop: 12 }} hidden={!open} prefetch={false}>
            {vendor.label}
          </Link>
        )}
      </nav>
      <button type="button" className="menu-toggle" aria-label={labels.menu} aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen(true)}>
        <Svg d="M4 7h16M4 12h16M4 17h16" />
      </button>
    </>
  )
}
