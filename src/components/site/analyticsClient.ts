/**
 * Tiny first-party tracker. No cookies, no local storage, no third parties.
 * Page views, engaged time, scroll depth and outbound/download/call clicks are sent
 * with navigator.sendBeacon to /api/pulse.
 */
const ENDPOINT = '/api/pulse'

type Payload = Record<string, unknown>

const send = (data: Payload) => {
  try {
    const body = JSON.stringify(data)
    if (navigator.sendBeacon) navigator.sendBeacon(ENDPOINT, new Blob([body], { type: 'application/json' }))
    else void fetch(ENDPOINT, { method: 'POST', body, keepalive: true, headers: { 'Content-Type': 'application/json' } })
  } catch {
    /* never break the page */
  }
}

const enabled = () => typeof window !== 'undefined' && (window as unknown as { __stccA?: boolean }).__stccA === true && navigator.doNotTrack !== '1'

const base = () => ({
  path: location.pathname,
  locale: document.documentElement.lang,
})

export function track(name: string, props?: Record<string, unknown>) {
  if (!enabled()) return
  send({ type: 'event', name, ...base(), props })
}

export function pageview(status?: number) {
  if (!enabled()) return
  const params = new URLSearchParams(location.search)
  send({
    type: 'pageview',
    ...base(),
    title: document.title,
    referrer: document.referrer || null,
    utm: {
      source: params.get('utm_source') || params.get('ref'),
      medium: params.get('utm_medium'),
      campaign: params.get('utm_campaign'),
    },
    screenW: window.innerWidth,
    lang: navigator.language,
    status,
  })
}

export function engagement(durationMs: number, scrollPct: number, path: string) {
  if (!enabled() || durationMs < 1000) return
  send({ type: 'engagement', path, locale: document.documentElement.lang, durationMs, scrollPct })
}
