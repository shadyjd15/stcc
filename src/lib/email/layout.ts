import { escapeHtml } from './template'
import type { ResolvedEmailSettings } from './settings'

export type EmailLayoutInput = {
  preheader?: string
  eyebrow?: string
  heading: string
  bodyHtml: string
  /** key/value rows rendered as a clean summary table */
  details?: { label: string; value: string; links?: { label: string; url: string }[] }[]
  cta?: { label: string; url: string }
  /** e.g. a status timeline for vendors */
  steps?: { label: string; state: 'done' | 'current' | 'todo' }[]
  footnote?: string
}

/**
 * Bulletproof, table-based HTML that renders in Outlook, Gmail and Apple Mail.
 * All styles inline; no external assets so nothing is blocked by default.
 */
export function renderEmailLayout(
  input: EmailLayoutInput,
  brand: ResolvedEmailSettings['brand'],
): string {
  const { accent, navy, companyName, footer } = brand
  const details = input.details?.length
    ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:8px 0 24px;border:1px solid #DCE3EC;border-radius:10px">
        ${input.details
          .map(
            (d, i) => `<tr>
              <td style="padding:12px 16px;font:500 13px/1.4 Arial,sans-serif;color:#4A5A70;width:38%;${i ? 'border-top:1px solid #EEF2F7;' : ''}vertical-align:top">${escapeHtml(d.label)}</td>
              <td style="padding:12px 16px;font:600 14px/1.4 Arial,sans-serif;color:#0B1B30;${i ? 'border-top:1px solid #EEF2F7;' : ''}vertical-align:top">${
                d.links?.length
                  ? d.links.map((l) => `<a href="${escapeHtml(l.url)}" style="color:#C9561A">${escapeHtml(l.label)}</a>`).join('<br>')
                  : escapeHtml(d.value) || '—'
              }</td>
            </tr>`,
          )
          .join('')}
      </table>`
    : ''

  const steps = input.steps?.length
    ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 24px">
        ${input.steps
          .map((s) => {
            const dot =
              s.state === 'done'
                ? `background:${accent};color:#071A33`
                : s.state === 'current'
                  ? `background:${navy};color:#FFFFFF`
                  : 'background:#E6ECF3;color:#4A5A70'
            const mark = s.state === 'done' ? '&#10003;' : s.state === 'current' ? '&#9679;' : '&middot;'
            return `<tr><td style="padding:6px 0;width:34px"><div style="width:24px;height:24px;border-radius:12px;text-align:center;font:700 12px/24px Arial,sans-serif;${dot}">${mark}</div></td>
              <td style="padding:6px 0;font:${s.state === 'current' ? '700' : '500'} 14px/1.4 Arial,sans-serif;color:${s.state === 'todo' ? '#4A5A70' : '#0B1B30'}">${escapeHtml(s.label)}</td></tr>`
          })
          .join('')}
      </table>`
    : ''

  const cta = input.cta
    ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 24px"><tr><td style="border-radius:999px;background:${navy}">
        <a href="${escapeHtml(input.cta.url)}" style="display:inline-block;padding:14px 26px;font:600 15px Arial,sans-serif;color:#FFFFFF;text-decoration:none;border-radius:999px">${escapeHtml(input.cta.label)} &rarr;</a>
      </td></tr></table>`
    : ''

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light only"><title>${escapeHtml(input.heading)}</title></head>
<body style="margin:0;padding:0;background:#EEF2F7">
<span style="display:none!important;opacity:0;color:transparent;height:0;width:0;overflow:hidden">${escapeHtml(input.preheader || '')}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#EEF2F7;padding:32px 12px">
<tr><td align="center">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px">
    <tr><td style="background:#071A33;border-radius:16px 16px 0 0;padding:24px 32px">
      <table role="presentation" width="100%"><tr>
        <td style="font:700 20px Arial,sans-serif;letter-spacing:2px;color:#FFFFFF">STCC<span style="color:${accent}">.</span></td>
        <td align="right" style="font:500 12px Arial,sans-serif;color:#A9BBD3">${escapeHtml(companyName)}</td>
      </tr></table>
    </td></tr>
    <tr><td style="height:4px;background:${accent};font-size:0;line-height:0">&nbsp;</td></tr>
    <tr><td style="background:#FFFFFF;padding:36px 32px 12px;font:400 15px/1.65 Arial,sans-serif;color:#33435A">
      ${input.eyebrow ? `<div style="font:600 11px Arial,sans-serif;letter-spacing:2px;color:#4A5A70;text-transform:uppercase;margin:0 0 10px">${escapeHtml(input.eyebrow)}</div>` : ''}
      <h1 style="margin:0 0 20px;font:700 24px/1.25 Arial,sans-serif;color:#0B1B30">${escapeHtml(input.heading)}</h1>
      ${input.bodyHtml}
      ${steps}
      ${details}
      ${cta}
    </td></tr>
    <tr><td style="background:#FFFFFF;border-radius:0 0 16px 16px;padding:0 32px 28px">
      ${input.footnote ? `<p style="margin:0;padding-top:16px;border-top:1px solid #EEF2F7;font:400 12px/1.6 Arial,sans-serif;color:#4A5A70">${escapeHtml(input.footnote)}</p>` : ''}
    </td></tr>
    <tr><td align="center" style="padding:20px 16px;font:400 12px/1.6 Arial,sans-serif;color:#4A5A70">${escapeHtml(footer)}</td></tr>
  </table>
</td></tr></table>
</body></html>`
}
