'use client'
import { useFormFields } from '@payloadcms/ui'
import React from 'react'

import './admin.css'

/** Renders the stored HTML of a logged email in a sandboxed frame */
export const EmailPreview: React.FC = () => {
  const html = useFormFields(([fields]) => fields?.html?.value as string | undefined)
  if (!html) return <div className="stcc-empty">No HTML body stored for this email.</div>
  return (
    <div style={{ margin: '8px 0 24px' }}>
      <div className="stcc-section__title">Preview</div>
      <iframe className="stcc-iframe" title="Email preview" sandbox="" srcDoc={html} />
    </div>
  )
}
