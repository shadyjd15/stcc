import React from 'react'

import './admin.css'

const Mark = () => (
  <svg viewBox="0 0 40 40" aria-hidden="true" focusable="false">
    <rect x="1" y="1" width="38" height="38" rx="9" fill="none" stroke="#F07A2B" strokeWidth="2" />
    <path
      d="M12 26c2 2 5 3 8 3 4 0 7-2 7-5s-3-4-7-5-7-2-7-5 3-5 7-5c3 0 5 1 7 3"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
  </svg>
)

/** Shown on the login / create-first-user screens */
export const Logo = () => (
  <span className="stcc-brand">
    <Mark />
    <span>
      <span className="stcc-brand__name">STCC</span>
      <span className="stcc-brand__sub" style={{ display: 'block' }}>
        Website CMS
      </span>
    </span>
  </span>
)

/** Shown in the nav / breadcrumbs */
export const Icon = () => (
  <span className="stcc-icon">
    <Mark />
  </span>
)
