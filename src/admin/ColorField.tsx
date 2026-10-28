'use client'
import { FieldDescription, FieldError, FieldLabel, useField } from '@payloadcms/ui'
import type { TextFieldClientComponent } from 'payload'
import React from 'react'

import './admin.css'

const HEX = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i

/** Text field with a native colour picker next to it */
export const ColorField: TextFieldClientComponent = ({ field, path }) => {
  const { value, setValue, showError } = useField<string>({ path: path || field.name })
  const v = value || ''
  const swatch = HEX.test(v) ? (v.length === 4 ? `#${[...v.slice(1)].map((c) => c + c).join('')}` : v) : '#000000'

  return (
    <div className="field-type text" style={{ flex: '1 1 auto' }}>
      <FieldLabel label={field.label || field.name} path={path} required={field.required} />
      <div className="stcc-color">
        <input type="color" value={swatch} onChange={(e) => setValue(e.target.value.toUpperCase())} aria-label="Pick colour" />
        <input
          className="stcc-input"
          style={{ flex: 1, minWidth: 0 }}
          value={v}
          onChange={(e) => setValue(e.target.value)}
          placeholder="#F07A2B"
          aria-invalid={showError || undefined}
        />
      </div>
      <FieldError path={path} showError={showError} />
      {field.admin?.description ? <FieldDescription description={field.admin.description} path={path} /> : null}
    </div>
  )
}
