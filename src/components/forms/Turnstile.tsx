'use client'

import React, { useEffect, useRef } from 'react'

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string
      reset: (id?: string) => void
      remove: (id?: string) => void
    }
    __tsLoading?: Promise<void>
  }
}

const loadScript = () => {
  if (window.turnstile) return Promise.resolve()
  if (!window.__tsLoading) {
    window.__tsLoading = new Promise((resolve, reject) => {
      const s = document.createElement('script')
      s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
      s.async = true
      s.defer = true
      s.onload = () => resolve()
      s.onerror = () => reject(new Error('turnstile'))
      document.head.appendChild(s)
    })
  }
  return window.__tsLoading
}

/**
 * Cloudflare Turnstile – invisible-by-default bot check. The script is only fetched
 * once the form scrolls into view, so it never affects page speed.
 */
export function Turnstile({
  siteKey,
  onToken,
  resetKey,
  locale,
}: {
  siteKey: string
  onToken: (token: string | null) => void
  resetKey?: number
  locale?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const widget = useRef<string | null>(null)

  useEffect(() => {
    if (!siteKey || !ref.current) return
    const el = ref.current
    let cancelled = false
    const io = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        try {
          await loadScript()
          if (cancelled || !window.turnstile || widget.current) return
          widget.current = window.turnstile.render(el, {
            sitekey: siteKey,
            appearance: 'interaction-only',
            language: locale === 'ar' ? 'ar' : 'en',
            callback: (t: string) => onToken(t),
            'expired-callback': () => onToken(null),
            'error-callback': () => onToken(null),
          })
        } catch {
          onToken(null)
        }
      },
      { rootMargin: '200px' },
    )
    io.observe(el)
    return () => {
      cancelled = true
      io.disconnect()
      if (widget.current && window.turnstile) window.turnstile.remove(widget.current)
      widget.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteKey])

  useEffect(() => {
    if (resetKey && widget.current && window.turnstile) window.turnstile.reset(widget.current)
  }, [resetKey])

  if (!siteKey) return null
  return <div ref={ref} />
}
