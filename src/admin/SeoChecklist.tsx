'use client'
import { useAllFormFields } from '@payloadcms/ui'
import React, { useMemo } from 'react'

import './admin.css'

type Check = { ok: boolean; label: string; tip?: string; weight: number }

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\p{L}\p{N}\s-]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const includesPhrase = (hay: string, needle: string) => {
  const h = norm(hay)
  const n = norm(needle)
  if (!n) return false
  if (h.includes(n)) return true
  // allow the words of the phrase to appear in any order
  return n.split(' ').every((w) => h.includes(w))
}

/** Live on-page SEO checklist under the SEO tab */
export const SeoChecklist: React.FC = () => {
  const [fields] = useAllFormFields()
  const get = (p: string) => fields?.[p]?.value as unknown

  const title = String(get('meta.title') || '')
  const desc = String(get('meta.description') || '')
  const image = get('meta.image')
  const keyword = String(get('meta.focusKeyword') || '')
  const noIndex = Boolean(get('meta.noIndex'))
  const slug = String(get('slug') || '')
  const heading = String(get('hero.heading') || get('title') || '')

  const checks = useMemo<Check[]>(() => {
    const c: Check[] = [
      {
        ok: title.length >= 30 && title.length <= 60,
        label: `Meta title length ${title.length}/60`,
        tip: title.length < 30 ? 'Aim for 30–60 characters.' : title.length > 60 ? 'Google cuts titles after ~60 characters.' : undefined,
        weight: 2,
      },
      {
        ok: desc.length >= 70 && desc.length <= 160,
        label: `Meta description length ${desc.length}/160`,
        tip: desc.length < 70 ? 'Aim for 70–160 characters that invite the click.' : desc.length > 160 ? 'Shorten to 160 characters.' : undefined,
        weight: 2,
      },
      { ok: Boolean(image), label: 'Social sharing image set', tip: 'Used by LinkedIn, WhatsApp and X previews (1200×630).', weight: 1 },
      { ok: !noIndex, label: 'Visible to search engines', tip: 'This page is set to noindex.', weight: 2 },
      { ok: slug.length > 0 && slug.length <= 60 && !/[^a-z0-9/-]/.test(slug), label: 'Clean, short URL', tip: 'Use lowercase words separated by hyphens.', weight: 1 },
    ]
    if (keyword) {
      c.push(
        { ok: includesPhrase(title, keyword), label: 'Focus keyword in meta title', weight: 2 },
        { ok: includesPhrase(desc, keyword), label: 'Focus keyword in meta description', weight: 1 },
        { ok: includesPhrase(slug.replace(/[-/]/g, ' '), keyword), label: 'Focus keyword in URL', weight: 1 },
        { ok: includesPhrase(heading, keyword), label: 'Focus keyword in main heading', weight: 1 },
      )
    } else {
      c.push({ ok: false, label: 'Focus keyword set', tip: 'Add the phrase people search for to unlock keyword checks.', weight: 1 })
    }
    return c
  }, [title, desc, image, keyword, noIndex, slug, heading])

  const total = checks.reduce((s, c) => s + c.weight, 0)
  const got = checks.reduce((s, c) => s + (c.ok ? c.weight : 0), 0)
  const score = Math.round((got / total) * 100)
  const color = score >= 80 ? 'var(--stcc-good)' : score >= 50 ? 'var(--stcc-warn)' : 'var(--stcc-bad)'

  return (
    <div className="stcc-card" style={{ margin: '8px 0 24px' }}>
      <div className="stcc-card__head">
        <h3>SEO checklist</h3>
        <span className="stcc-score">
          <span className="stcc-score__ring" style={{ ['--p' as string]: score, ['--c' as string]: color }}>
            <span>{score}</span>
          </span>
        </span>
      </div>
      <ul className="stcc-checks" style={{ fontSize: 13, gap: 6 }}>
        {checks.map((c) => (
          <li key={c.label} className={c.ok ? '' : 'no'}>
            {c.label}
            {!c.ok && c.tip ? <span className="stcc-muted"> — {c.tip}</span> : null}
          </li>
        ))}
      </ul>
    </div>
  )
}
