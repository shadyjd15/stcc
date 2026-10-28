import React from 'react'

import type { Media as MediaType } from '@/payload-types'

/** STCC mark: rounded frame + "S" sweep. Replaced by the uploaded logo when one is set. */
export function LogoMark({ className = 'brand__mark' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
      <rect x="1" y="1" width="38" height="38" rx="9" fill="none" stroke="var(--accent)" strokeWidth="2" />
      <path
        d="M12 26c2 2 5 3 8 3 4 0 7-2 7-5s-3-4-7-5-7-2-7-5 3-5 7-5c3 0 5 1 7 3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function Logo({
  logo,
  shortName = 'STCC',
  name = 'Sahara Technical Cont. Co.',
}: {
  logo?: MediaType | number | string | null
  shortName?: string | null
  name?: string | null
}) {
  if (logo && typeof logo === 'object' && logo.url) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={logo.url} alt={name || shortName || ''} width={logo.width || 160} height={logo.height || 44} />
  }
  return (
    <>
      <LogoMark />
      <span className="brand__text">
        <span className="brand__name">{shortName || 'STCC'}</span>
        <span className="brand__sub">{name}</span>
      </span>
    </>
  )
}
