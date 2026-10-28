export const num = (n?: number | null) => (n ?? 0).toLocaleString('en-US')

export const duration = (sec?: number | null) => {
  const s = Math.max(0, Math.round(sec || 0))
  if (s < 60) return `${s}s`
  const m = Math.floor(s / 60)
  return `${m}m ${String(s % 60).padStart(2, '0')}s`
}

export const bytes = (b?: number | null) => {
  const n = b || 0
  const u = ['B', 'KB', 'MB', 'GB', 'TB']
  let i = 0
  let v = n
  while (v >= 1024 && i < u.length - 1) {
    v /= 1024
    i++
  }
  return `${v.toFixed(v < 10 && i ? 1 : 0)} ${u[i]}`
}

/** % change; for "lower is better" metrics pass invert */
export const delta = (cur?: number | null, prev?: number | null, invert = false) => {
  if (prev === null || prev === undefined || cur === null || cur === undefined) return null
  if (prev === 0) return cur === 0 ? null : { text: 'new', good: !invert }
  const d = ((cur - prev) / prev) * 100
  const good = invert ? d <= 0 : d >= 0
  return { text: `${d >= 0 ? '+' : ''}${d.toFixed(Math.abs(d) < 10 ? 1 : 0)}%`, good }
}

const regionNames = typeof Intl !== 'undefined' && 'DisplayNames' in Intl ? new Intl.DisplayNames(['en'], { type: 'region' }) : null
export const country = (code: string) => {
  if (!code || code === 'Unknown' || code.length !== 2) return code || 'Unknown'
  const flag = String.fromCodePoint(...[...code.toUpperCase()].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65))
  try {
    return `${flag} ${regionNames?.of(code.toUpperCase()) || code}`
  } catch {
    return code
  }
}

const langNames = typeof Intl !== 'undefined' && 'DisplayNames' in Intl ? new Intl.DisplayNames(['en'], { type: 'language' }) : null
export const language = (code: string) => {
  try {
    return (code && langNames?.of(code)) || code || 'Unknown'
  } catch {
    return code
  }
}
