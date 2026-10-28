/**
 * Tiny, safe templating for CMS-editable email texts.
 *
 *   {{name}}            -> escaped value
 *   {{vendor.company}}  -> dotted lookups
 *   blank line          -> new paragraph
 *   **bold**            -> <strong>
 *   [label](https://…)  -> link
 */

export const escapeHtml = (s: unknown): string =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const lookup = (vars: Record<string, unknown>, path: string): unknown =>
  path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key]
    }
    return undefined
  }, vars)

export const interpolate = (template: string, vars: Record<string, unknown>): string =>
  (template || '').replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_, key: string) => {
    const v = lookup(vars, key)
    return v === undefined || v === null ? '' : String(v)
  })

/** Interpolate (escaping values) then convert the lightweight markup to HTML paragraphs. */
export const renderTemplateHtml = (template: string, vars: Record<string, unknown>): string => {
  const escapedVars: Record<string, unknown> = {}
  const walk = (obj: Record<string, unknown>, out: Record<string, unknown>) => {
    for (const [k, v] of Object.entries(obj)) {
      if (v && typeof v === 'object' && !Array.isArray(v)) {
        out[k] = {}
        walk(v as Record<string, unknown>, out[k] as Record<string, unknown>)
      } else out[k] = escapeHtml(v)
    }
  }
  walk(vars, escapedVars)

  const text = interpolate(escapeHtml(template).replace(/&#39;/g, "'"), escapedVars)
  return text
    .split(/\n{2,}/)
    .map((para) => para.trim())
    .filter(Boolean)
    .map((para) => {
      const html = para
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(
          /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
          '<a href="$2" style="color:#0B2545;font-weight:600">$1</a>',
        )
        .replace(/\n/g, '<br>')
      return `<p style="margin:0 0 16px">${html}</p>`
    })
    .join('\n')
}

export const renderTemplateText = (template: string, vars: Record<string, unknown>): string =>
  interpolate(template, vars)
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '$1 ($2)')

export const htmlToText = (html: string): string =>
  html
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|h[1-6]|tr|li)>/gi, '\n')
    .replace(/<a [^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/gi, '$2 ($1)')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, '\n\n')
    .trim()
