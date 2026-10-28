'use client'

import React, { useId, useRef, useState } from 'react'

type Tab = {
  id?: string | null
  label: string
  text?: string | null
  items?: { id?: string | null; text: string }[] | null
  image?: React.ReactNode
}

/** Accessible tabs (arrow-key navigation, ARIA roles). Images are rendered on the server and passed in. */
export function TabsClient({
  tabs,
  orientation,
  placeholder,
}: {
  tabs: Tab[]
  orientation?: 'horizontal' | 'vertical' | null
  placeholder: string
}) {
  const [active, setActive] = useState(0)
  const base = useId()
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const next = ['ArrowRight', 'ArrowDown'].includes(e.key) ? 1 : ['ArrowLeft', 'ArrowUp'].includes(e.key) ? -1 : 0
    if (!next) return
    e.preventDefault()
    const dir = document.documentElement.dir === 'rtl' && ['ArrowRight', 'ArrowLeft'].includes(e.key) ? -next : next
    const j = (i + dir + tabs.length) % tabs.length
    setActive(j)
    refs.current[j]?.focus()
  }

  const cur = tabs[active]
  const vertical = orientation === 'vertical'

  const list = (
    <div role="tablist" aria-orientation={vertical ? 'vertical' : 'horizontal'} className={vertical ? 'vtabs__list' : 'tabs__list'}>
      {tabs.map((t, i) => (
        <button
          key={t.id || i}
          ref={(el) => {
            refs.current[i] = el
          }}
          role="tab"
          type="button"
          id={`${base}-tab-${i}`}
          aria-selected={i === active}
          aria-controls={`${base}-panel`}
          tabIndex={i === active ? 0 : -1}
          className={vertical ? 'vtab' : 'pill'}
          onClick={() => setActive(i)}
          onKeyDown={(e) => onKey(e, i)}
        >
          {vertical && <span className="mono">{String(i + 1).padStart(2, '0')}</span>}
          <span>{t.label}</span>
        </button>
      ))}
    </div>
  )

  const panel = (
    <div role="tabpanel" id={`${base}-panel`} aria-labelledby={`${base}-tab-${active}`} className="tabs__panel" key={active}>
      <div className="tabs__body">
        {!vertical && <span className="tabs__num">{String(active + 1).padStart(2, '0')}</span>}
        <h3 className="h3" style={{ fontSize: 30 }}>{cur.label}</h3>
        {cur.text && <p style={{ color: 'var(--text)', fontSize: 17, lineHeight: 1.7 }}>{cur.text}</p>}
        {cur.items?.length ? (
          <ul className="check-list" style={{ gridTemplateColumns: vertical ? '1fr' : 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            {cur.items.map((it, i) => (
              <li key={it.id || i}>
                <svg viewBox="0 0 24 24" className="icon" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4.5 12.5l5 5 10-11" />
                </svg>
                {it.text}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <div className="tabs__visual">{cur.image || <div className="placeholder" style={{ height: '100%', minHeight: 300 }}>[ {placeholder} · {cur.label} ]</div>}</div>
    </div>
  )

  return vertical ? (
    <div className="vtabs">
      {list}
      {panel}
    </div>
  ) : (
    <>
      {list}
      {panel}
    </>
  )
}
