'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { engagement, pageview, track } from './analyticsClient'

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Count up numbers like "250" or "12" when they scroll into view; leaves "24/7" and "ISO" alone */
function countUp(el: HTMLElement) {
  const target = el.dataset.count || ''
  if (!/^\d{1,6}$/.test(target) || reduceMotion()) return
  const end = Number(target)
  const start = performance.now()
  const dur = 1400
  const step = (now: number) => {
    const p = Math.min(1, (now - start) / dur)
    const eased = 1 - Math.pow(1 - p, 3)
    el.textContent = String(Math.round(end * eased))
    if (p < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

/**
 * Everything interactive that is not a component of its own:
 * scroll reveals, counters, timeline progress and the privacy-friendly analytics beacon.
 */
export function SiteRuntime({ analytics }: { analytics: boolean }) {
  const pathname = usePathname()
  const visibleSince = useRef<number>(0) // set when the page view is recorded
  const engaged = useRef(0)
  const maxScroll = useRef(0)
  const lastPath = useRef<string | null>(null)
  // set when a client-side navigation starts, so the next page's layout isn't credited to this one
  const leaving = useRef(false)

  /* ---------- reveal / counters / progress ---------- */
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)'))
    const counters = Array.from(document.querySelectorAll<HTMLElement>('[data-count]'))
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          const el = e.target as HTMLElement
          if (el.dataset.count !== undefined) countUp(el)
          else el.classList.add('is-in')
          io.unobserve(el)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )
    els.forEach((el) => {
      // anything already on screen at load shows immediately
      const r = el.getBoundingClientRect()
      if (r.top < window.innerHeight * 0.92 && r.bottom > 0) el.classList.add('is-in')
      else io.observe(el)
    })
    counters.forEach((c) => io.observe(c))

    const timelines = Array.from(document.querySelectorAll<HTMLElement>('[data-progress]'))
    const onScroll = () => {
      for (const t of timelines) {
        const r = t.getBoundingClientRect()
        const vh = window.innerHeight
        const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)))
        t.style.setProperty('--progress', p.toFixed(3))
      }
      // during a client-side navigation the next page is already in the DOM: don't credit it to the old one
      if (leaving.current || (lastPath.current && location.pathname !== lastPath.current)) return
      const doc = document.documentElement
      const pct = ((window.scrollY + window.innerHeight) / Math.max(doc.scrollHeight, 1)) * 100
      if (pct > maxScroll.current) maxScroll.current = Math.min(100, pct)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [pathname])

  /* ---------- analytics ---------- */
  useEffect(() => {
    if (!analytics) return
    ;(window as unknown as { __stccA?: boolean }).__stccA = true
    // effects can run twice for the same page (React dev mode, fast refresh) – count each page once
    if (lastPath.current === pathname) return
    // flush engagement for the previous page on client-side navigation
    if (lastPath.current && lastPath.current !== pathname) {
      engaged.current += Date.now() - visibleSince.current
      engagement(engaged.current, maxScroll.current, lastPath.current)
    }
    engaged.current = 0
    maxScroll.current = 0
    visibleSince.current = Date.now()
    lastPath.current = pathname
    leaving.current = false
    const status = document.querySelector('meta[name="x-status"]')?.getAttribute('content')
    pageview(status ? Number(status) : undefined)
  }, [pathname, analytics])

  useEffect(() => {
    if (!analytics) return
    // visibilitychange covers tab switches; pagehide covers closing / leaving (incl. mobile Safari)
    let hidden = false
    const flush = () => {
      if (hidden) return
      hidden = true
      engaged.current += Date.now() - visibleSince.current
      engagement(engaged.current, maxScroll.current, location.pathname)
      engaged.current = 0
    }
    const onHide = () => {
      if (document.visibilityState === 'hidden') flush()
      else {
        hidden = false
        visibleSince.current = Date.now()
      }
    }
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.('a, button') as HTMLAnchorElement | null
      if (!a) return
      if (a.tagName === 'A' && a.href) {
        try {
          const u = new URL(a.href)
          if (u.origin === location.origin && u.pathname !== location.pathname) leaving.current = true
        } catch {
          /* ignore */
        }
      }
      const explicit = a.dataset.track
      const cta = a.dataset.cta
      const href = a.getAttribute('href') || ''
      if (cta) track('cta_click', { cta, label: a.textContent?.trim().slice(0, 60) })
      if (explicit) return track(explicit, { href, label: a.dataset.label || a.textContent?.trim().slice(0, 80) })
      if (href.startsWith('tel:')) return track('call', { href })
      if (href.startsWith('mailto:')) return track('email', { href })
      if (/wa\.me|whatsapp/.test(href)) return track('whatsapp', { href })
      if (/\.(pdf|docx?|xlsx?|zip)(\?|$)/i.test(href) || href.includes('/file/')) return track('download', { href })
      if (/^https?:\/\//.test(href) && !href.includes(location.host)) return track('outbound', { href })
    }
    document.addEventListener('visibilitychange', onHide)
    window.addEventListener('pagehide', flush)
    const onPop = () => {
      leaving.current = true
    }
    window.addEventListener('popstate', onPop)
    document.addEventListener('click', onClick, { capture: true })
    return () => {
      document.removeEventListener('visibilitychange', onHide)
      window.removeEventListener('pagehide', flush)
      window.removeEventListener('popstate', onPop)
      document.removeEventListener('click', onClick, { capture: true })
    }
  }, [analytics])

  return null
}
