'use client'

import React, { useMemo, useState } from 'react'

/**
 * Generic client-side filter: server renders every item with data-filter keys,
 * this component only toggles visibility, so the full list stays crawlable.
 */
export function FilterBar({
  options,
  allLabel,
  target,
  label,
}: {
  options: { value: string; label: string }[]
  allLabel: string
  target: string
  label: string
}) {
  const [value, setValue] = useState('')
  const apply = (v: string) => {
    setValue(v)
    document.querySelectorAll<HTMLElement>(`[data-filter-group="${target}"] [data-filter]`).forEach((el) => {
      const keys = (el.dataset.filter || '').split(' ')
      el.hidden = Boolean(v) && !keys.includes(v)
    })
    const empty = document.querySelector<HTMLElement>(`[data-filter-empty="${target}"]`)
    if (empty) {
      const visible = document.querySelectorAll(`[data-filter-group="${target}"] [data-filter]:not([hidden])`).length
      empty.hidden = visible > 0
    }
  }
  const all = useMemo(() => [{ value: '', label: allLabel }, ...options], [options, allLabel])
  if (options.length < 2) return null
  return (
    <div role="group" aria-label={label} className="cluster" style={{ ['--gap' as string]: '8px', marginBottom: 32 }}>
      {all.map((o) => (
        <button key={o.value || 'all'} type="button" className="pill pill--sm" aria-pressed={value === o.value} onClick={() => apply(o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  )
}
