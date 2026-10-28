'use client'

import React, { useMemo, useRef, useState } from 'react'

import { track } from '@/components/site/analyticsClient'
import { Turnstile } from './Turnstile'

export type FormField = {
  id?: string | null
  blockType: string
  name?: string
  label?: string | null
  width?: number | null
  required?: boolean | null
  defaultValue?: string | boolean | null
  options?: { label: string; value: string }[] | null
  placeholder?: string | null
  multiple?: boolean | null
  source?: string | null
  hint?: string | null
  maxFiles?: number | null
  /** for message blocks, pre-rendered on the server */
  messageNode?: React.ReactNode
  messageText?: string
}

type Strings = {
  required: string
  submit: string
  sending: string
  sent: string
  error: string
  next: string
  back: string
  select: string
  spamNote: string
  upload: string
}

type Props = {
  formId: string | number
  fields: FormField[]
  submitLabel?: string | null
  confirmation: React.ReactNode
  redirectUrl?: string | null
  turnstileSiteKey: string
  locale: string
  strings: Strings
  multiStep?: boolean
  divisions: { value: string; label: string }[]
  pagePath: string
  analyticsEvent?: string | null
}

type Values = Record<string, string | boolean | string[]>

const widthStyle = (w?: number | null): React.CSSProperties =>
  w && w < 100 ? { gridColumn: 'auto' } : { gridColumn: '1 / -1' }

export function FormRenderer(props: Props) {
  const { fields, strings, divisions } = props
  const steps = useMemo(() => {
    if (!props.multiStep) return [{ title: '', fields }]
    const out: { title: string; fields: FormField[] }[] = []
    for (const f of fields) {
      if (f.blockType === 'message') out.push({ title: f.messageText || `Step ${out.length + 1}`, fields: [] })
      else {
        if (!out.length) out.push({ title: '', fields: [] })
        out[out.length - 1].fields.push(f)
      }
    }
    return out.filter((s) => s.fields.length)
  }, [fields, props.multiStep])

  const initial = useMemo(() => {
    const v: Values = {}
    for (const f of fields) {
      if (!f.name) continue
      if (f.blockType === 'checkbox') v[f.name] = Boolean(f.defaultValue)
      else if (f.blockType === 'choices') v[f.name] = []
      else v[f.name] = (f.defaultValue as string) || ''
    }
    return v
  }, [fields])

  const [values, setValues] = useState<Values>(initial)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [step, setStep] = useState(0)
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [token, setToken] = useState<string | null>(null)
  const [resetKey, setResetKey] = useState(0)
  const [uploads, setUploads] = useState<Record<string, { id: string | number; name: string }[]>>({})
  const [uploading, setUploading] = useState<string | null>(null)
  const honeypot = useRef<HTMLInputElement>(null)
  const started = useRef(false)

  const set = (name: string, value: string | boolean | string[]) => {
    if (!started.current) {
      started.current = true
      track('form_start', { form: String(props.formId) })
    }
    setValues((v) => ({ ...v, [name]: value }))
    setErrors((e) => ({ ...e, [name]: '' }))
  }

  const validate = (list: FormField[]) => {
    const errs: Record<string, string> = {}
    for (const f of list) {
      if (!f.name || !f.required) continue
      const v = f.blockType === 'fileUpload' ? uploads[f.name] || [] : values[f.name]
      const empty = Array.isArray(v) ? v.length === 0 : v === '' || v === false || v === undefined
      if (empty) errs[f.name] = strings.required
      if (f.blockType === 'email' && typeof v === 'string' && v && !/^\S+@\S+\.\S+$/.test(v)) errs[f.name] = 'Enter a valid email'
    }
    setErrors(errs)
    if (Object.keys(errs).length) {
      const first = document.getElementById(`f-${props.formId}-${Object.keys(errs)[0]}`)
      first?.focus()
    }
    return !Object.keys(errs).length
  }

  const uploadFiles = async (name: string, files: FileList | null, max: number) => {
    if (!files?.length) return
    setUploading(name)
    const current = uploads[name] || []
    const next = [...current]
    for (const file of Array.from(files).slice(0, Math.max(0, max - current.length))) {
      const fd = new FormData()
      fd.append('file', file)
      try {
        const res = await fetch('/api/form-files/upload', { method: 'POST', body: fd })
        const json = await res.json()
        if (json.ok) next.push({ id: json.id, name: json.name })
        else setErrors((e) => ({ ...e, [name]: json.error }))
      } catch {
        setErrors((e) => ({ ...e, [name]: strings.error }))
      }
    }
    setUploads((u) => ({ ...u, [name]: next }))
    setUploading(null)
  }

  const submit = async () => {
    if (!validate(steps[step].fields)) return
    setStatus('sending')
    setMessage('')
    const submissionData = Object.entries(values).map(([field, value]) => ({
      field,
      value: Array.isArray(value) ? value.join(', ') : String(value),
    }))
    for (const [field, files] of Object.entries(uploads)) {
      submissionData.push({ field, value: JSON.stringify(files) })
    }
    if (honeypot.current?.value) submissionData.push({ field: 'website', value: honeypot.current.value })
    try {
      const res = await fetch('/api/form-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form: props.formId, submissionData, turnstileToken: token, pagePath: props.pagePath }),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) {
        setStatus('error')
        setMessage(json?.errors?.[0]?.message || strings.error)
        setResetKey((k) => k + 1)
        return
      }
      setStatus('done')
      track(props.analyticsEvent || 'form_submit_client', { form: String(props.formId) })
      if (props.redirectUrl) window.location.href = props.redirectUrl
    } catch {
      setStatus('error')
      setMessage(strings.error)
    }
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < steps.length - 1) {
      if (validate(steps[step].fields)) setStep(step + 1)
      return
    }
    void submit()
  }

  if (status === 'done') {
    return (
      <div className="success-panel" role="status" aria-live="polite">
        <span className="success-panel__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4.5 12.5l5 5 10-11" />
          </svg>
        </span>
        <h3 className="h3">{strings.sent}</h3>
        {props.confirmation}
      </div>
    )
  }

  const id = (n?: string) => `f-${props.formId}-${n}`
  const renderField = (f: FormField, i: number) => {
    if (!f.name && f.blockType !== 'message') return null
    const name = f.name || ''
    const err = errors[name]
    const label = (
      <>
        {f.label || name}
        {f.required && (
          <span className="req" aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </>
    )
    const common = {
      id: id(name),
      name,
      required: Boolean(f.required),
      'aria-invalid': err ? (true as const) : undefined,
      'aria-describedby': err ? `${id(name)}-err` : undefined,
    }
    const errEl = err ? (
      <span className="field__error" id={`${id(name)}-err`}>
        {err}
      </span>
    ) : null

    switch (f.blockType) {
      case 'message':
        return (
          <div key={f.id || i} style={{ gridColumn: '1 / -1' }}>
            {f.messageNode}
          </div>
        )
      case 'textarea':
        return (
          <label key={f.id || i} className="field" style={widthStyle(f.width)}>
            {label}
            <textarea className="textarea" rows={5} value={String(values[name] ?? '')} onChange={(e) => set(name, e.target.value)} {...common} />
            {errEl}
          </label>
        )
      case 'select':
      case 'country':
        return (
          <label key={f.id || i} className="field" style={widthStyle(f.width)}>
            {label}
            <select className="select" value={String(values[name] ?? '')} onChange={(e) => set(name, e.target.value)} {...common}>
              <option value="">{strings.select}</option>
              {(f.options || []).map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            {errEl}
          </label>
        )
      case 'checkbox':
        return (
          <div key={f.id || i} style={{ gridColumn: '1 / -1' }}>
            <label className="checkbox">
              <input type="checkbox" checked={Boolean(values[name])} onChange={(e) => set(name, e.target.checked)} {...common} />
              <span>{label}</span>
            </label>
            {errEl}
          </div>
        )
      case 'choices': {
        const opts = f.source === 'custom' ? f.options || [] : divisions
        const selected = (values[name] as string[]) || []
        return (
          <fieldset key={f.id || i} style={{ gridColumn: '1 / -1', border: 0, padding: 0, margin: 0 }} aria-invalid={err ? true : undefined}>
            <legend style={{ marginBottom: 12, fontSize: 14, fontWeight: 500 }}>
              {label}
            </legend>
            <div className="grid" style={{ ['--min' as string]: '240px', gap: 10 }}>
              {opts.map((o) => {
                const on = selected.includes(o.value)
                return (
                  <label key={o.value} className="choice">
                    <input
                      type={f.multiple === false ? 'radio' : 'checkbox'}
                      name={name}
                      value={o.value}
                      checked={on}
                      onChange={() =>
                        set(name, f.multiple === false ? [o.value] : on ? selected.filter((x) => x !== o.value) : [...selected, o.value])
                      }
                    />
                    <span className="choice__box" aria-hidden="true">
                      {on ? '✓' : ''}
                    </span>
                    {o.label}
                  </label>
                )
              })}
            </div>
            {errEl}
          </fieldset>
        )
      }
      case 'fileUpload': {
        const list = uploads[name] || []
        const max = f.maxFiles || 5
        return (
          <div key={f.id || i} className="field" style={{ gridColumn: '1 / -1' }}>
            <span>{label}</span>
            <label className="dropzone" style={{ minHeight: 96, position: 'relative' }}>
              <input type="file" multiple={max > 1} onChange={(e) => uploadFiles(name, e.target.files, max)} id={id(name)} />
              <strong>{uploading === name ? strings.sending : strings.upload}</strong>
              {f.hint && <span className="field__hint">{f.hint}</span>}
            </label>
            {list.length > 0 && (
              <ul className="chips" style={{ marginTop: 8 }}>
                {list.map((u) => (
                  <li key={String(u.id)} className="chip" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    {u.name}
                    <button
                      type="button"
                      aria-label={`Remove ${u.name}`}
                      onClick={() => setUploads((x) => ({ ...x, [name]: (x[name] || []).filter((y) => y.id !== u.id) }))}
                      style={{ border: 0, background: 'none', cursor: 'pointer', padding: 0, fontSize: 16 }}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {errEl}
          </div>
        )
      }
      default: {
        const type = f.blockType === 'email' ? 'email' : f.blockType === 'number' ? 'number' : /phone|mobile|tel/i.test(name) ? 'tel' : 'text'
        const auto =
          type === 'email' ? 'email' : type === 'tel' ? 'tel' : /^(name|fullName)$/i.test(name) ? 'name' : /company|organi/i.test(name) ? 'organization' : undefined
        return (
          <label key={f.id || i} className="field" style={widthStyle(f.width)}>
            {label}
            <input className="input" type={type} autoComplete={auto} value={String(values[name] ?? '')} onChange={(e) => set(name, e.target.value)} {...common} />
            {errEl}
          </label>
        )
      }
    }
  }

  const multi = steps.length > 1
  const isLast = step === steps.length - 1

  return (
    <form onSubmit={onSubmit} noValidate className="stack" style={{ ['--gap' as string]: '24px' }}>
      {multi && (
        <ol className="stepper" style={{ ['--steps' as string]: steps.length, margin: '-8px -8px 8px' }}>
          {steps.map((s, i) => (
            <li key={i} className={i === step ? 'is-current' : i < step ? 'is-done' : ''} aria-current={i === step ? 'step' : undefined}>
              <span className="mono">{String(i + 1).padStart(2, '0')}</span>
              <strong>{s.title}</strong>
            </li>
          ))}
        </ol>
      )}
      <div className="form-grid">{steps[step].fields.map(renderField)}</div>
      <div className="honeypot" aria-hidden="true">
        <label>
          Website
          <input ref={honeypot} type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {isLast && <Turnstile siteKey={props.turnstileSiteKey} onToken={setToken} resetKey={resetKey} locale={props.locale} />}
      {status === 'error' && (
        <div className="alert alert--error" role="alert">
          {message}
        </div>
      )}
      <div className="form-actions" style={multi ? undefined : { borderTop: 0, paddingTop: 0, alignItems: 'center' }}>
        {multi ? (
          <button type="button" className="btn btn--outline" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
            {strings.back}
          </button>
        ) : (
          <span className="field__hint">{props.turnstileSiteKey ? strings.spamNote : ''}</span>
        )}
        <button type="submit" className="btn btn--secondary" disabled={status === 'sending' || Boolean(uploading)}>
          {status === 'sending' ? <span className="spinner" aria-hidden="true" /> : null}
          {status === 'sending' ? strings.sending : isLast ? props.submitLabel || strings.submit : strings.next}
          <svg viewBox="0 0 24 24" className="icon icon--arrow" style={{ ['--size' as string]: '16px', color: 'var(--accent)' }} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12h15M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </form>
  )
}
