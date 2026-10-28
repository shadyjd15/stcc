'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { localizePath, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionary'

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

type Obj = Record<string, unknown>
type Check = { key: string; label: string; ok: boolean; step: number }
type DocType = {
  key: string
  label: string
  description?: string | null
  required?: boolean | null
  requiresExpiry?: boolean | null
  requiresNumber?: boolean | null
  requiredFor?: string[] | null
}
type Portal = {
  vendor: Obj & { id: string | number; documents?: Obj[] | null }
  status: { value: string; label: string; editable: boolean }
  timeline: { label: string; state: 'done' | 'current' | 'todo' }[] | null
  checks: Check[]
  completeness: number
  documentTypes: DocType[]
  categories: string[]
  history: { status: string; at: string; note?: string | null }[]
}

type Field = {
  name: string
  label: string
  type?: 'text' | 'email' | 'tel' | 'number' | 'date' | 'url' | 'textarea' | 'select' | 'multi' | 'checkbox' | 'refs'
  required?: boolean
  options?: { value: string; label: string }[]
  full?: boolean
  hint?: string
  dir?: 'rtl'
}

const opt = (list: string[]) => list.map((v) => ({ value: v, label: v }))

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const get = (o: Obj, path: string): unknown =>
  path.split('.').reduce<unknown>((acc, k) => (acc && typeof acc === 'object' ? (acc as Obj)[k] : undefined), o)

const setIn = (o: Obj, path: string, value: unknown): Obj => {
  const [head, ...rest] = path.split('.')
  if (!rest.length) return { ...o, [head]: value }
  return { ...o, [head]: setIn(((o[head] as Obj) || {}) as Obj, rest.join('.'), value) }
}

const toDateInput = (v: unknown) => (typeof v === 'string' && v ? v.slice(0, 10) : '')

async function api(path: string, init?: RequestInit) {
  const res = await fetch(path, { credentials: 'include', ...init })
  const json = await res.json().catch(() => ({}))
  return { ok: res.ok, status: res.status, json }
}

const errorText = (json: Obj, fallback: string) => {
  const e = (json?.errors as { message?: string; data?: { errors?: { message: string; path: string }[] } }[] | undefined)?.[0]
  if (e?.data?.errors?.length) return e.data.errors.map((x) => `${x.path}: ${x.message}`).join(' · ')
  return (json?.error as string) || e?.message || fallback
}

/* ------------------------------------------------------------------ */
/* Root                                                                */
/* ------------------------------------------------------------------ */

export function VendorPortal({ locale, divisions }: { locale: Locale; divisions: { id: string | number; title: string }[] }) {
  const t = getDictionary(locale)
  const [data, setData] = useState<Portal | null>(null)
  const [mode, setMode] = useState<'loading' | 'anon' | 'ready'>('loading')

  const apply = useCallback((r: Awaited<ReturnType<typeof api>>) => {
    if (r.status === 401 || !r.ok) {
      setMode('anon')
      setData(null)
      return
    }
    setData(r.json as Portal)
    setMode('ready')
  }, [])
  const load = useCallback(async () => apply(await api('/api/vendors/portal')), [apply])

  useEffect(() => {
    let live = true
    api('/api/vendors/portal').then((r) => live && apply(r))
    return () => {
      live = false
    }
  }, [apply])

  if (mode === 'loading') {
    return (
      <div className="form-card" aria-busy="true" style={{ alignItems: 'center', minHeight: 240, justifyContent: 'center' }}>
        <span className="spinner" style={{ color: 'var(--navy)' }} />
      </div>
    )
  }
  if (mode === 'anon' || !data) return <VendorLogin locale={locale} onLogin={load} />
  return <Dashboard data={data} reload={load} locale={locale} divisions={divisions} t={t} />
}

/* ------------------------------------------------------------------ */
/* Login                                                               */
/* ------------------------------------------------------------------ */

function VendorLogin({ locale, onLogin }: { locale: Locale; onLogin: () => void }) {
  const t = getDictionary(locale)
  const params = useSearchParams()
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const verified = params?.get('verified') === '1'
  const reset = params?.get('reset') === '1'

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    setBusy(true)
    setError('')
    const r = await api('/api/vendors/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: fd.get('email'), password: fd.get('password') }),
    })
    setBusy(false)
    if (!r.ok) {
      const msg = errorText(r.json, t.somethingWrong)
      setError(/verify/i.test(msg) ? 'Please verify your email first – check your inbox for the link we sent.' : msg)
      return
    }
    onLogin()
  }

  return (
    <div className="form-card" style={{ maxWidth: 560, marginInline: 'auto', width: '100%' }}>
      <h2 className="h3" style={{ fontSize: 28 }}>
        {t.vendorSignIn}
      </h2>
      {verified && <div className="alert alert--success">Email verified. Sign in to continue your registration.</div>}
      {reset && <div className="alert alert--success">Password changed. Sign in with your new password.</div>}
      <form onSubmit={submit} className="stack" style={{ ['--gap' as string]: '18px' }}>
        <label className="field">
          {t.email}
          <input className="input" name="email" type="email" required autoComplete="username" />
        </label>
        <label className="field">
          {t.password}
          <input className="input" name="password" type="password" required autoComplete="current-password" />
        </label>
        {error && (
          <div className="alert alert--error" role="alert">
            {error}
          </div>
        )}
        <button className="btn btn--secondary btn--block" type="submit" disabled={busy}>
          {busy && <span className="spinner" aria-hidden="true" />}
          {t.signIn}
        </button>
      </form>
      <div className="split" style={{ gap: 12 }}>
        <Link href={localizePath('/vendor-portal/forgot-password', locale)} className="link-arrow" prefetch={false}>
          {t.forgotPassword}
        </Link>
        <Link href={localizePath('/vendor-registration', locale)} className="link-arrow" prefetch={false}>
          {t.createAccount}
        </Link>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Dashboard                                                           */
/* ------------------------------------------------------------------ */

function Dashboard({
  data,
  reload,
  locale,
  divisions,
  t,
}: {
  data: Portal
  reload: () => Promise<void>
  locale: Locale
  divisions: { id: string | number; title: string }[]
  t: ReturnType<typeof getDictionary>
}) {
  const v = data.vendor
  const editable = data.status.editable

  const steps: { title: string; sub: string; fields?: Field[] }[] = useMemo(
    () => [
      {
        title: 'Company profile',
        sub: 'Legal name, type, size',
        fields: [
          { name: 'companyName', label: t.companyName, required: true, full: true },
          { name: 'companyNameAr', label: 'اسم الشركة (عربي)', dir: 'rtl', full: true },
          {
            name: 'vendorType',
            label: t.vendorType,
            type: 'select',
            required: true,
            options: [
              { value: 'manufacturer', label: 'Manufacturer' },
              { value: 'distributor', label: 'Distributor / trader' },
              { value: 'subcontractor', label: 'Subcontractor' },
              { value: 'service', label: 'Service provider' },
              { value: 'consultant', label: 'Consultant' },
            ],
          },
          { name: 'yearEstablished', label: 'Year established', type: 'number' },
          { name: 'employees', label: 'Number of employees', type: 'select', options: opt(['1–10', '11–50', '51–200', '201–1000', '1000+']) },
          { name: 'country', label: 'Country of registration' },
          { name: 'city', label: 'City', required: true },
          { name: 'nationalAddress', label: 'National address (short code)', hint: 'e.g. RRRD2929' },
          { name: 'address', label: 'Address', type: 'textarea', full: true },
          { name: 'website', label: 'Website', type: 'url' },
          { name: 'companyPhone', label: 'Company phone', type: 'tel' },
          { name: 'description', label: 'Company overview', type: 'textarea', full: true },
        ],
      },
      {
        title: 'Contacts',
        sub: 'Primary, sales, finance',
        fields: [
          { name: 'primaryContact.name', label: 'Primary contact – name', required: true },
          { name: 'primaryContact.title', label: 'Job title' },
          { name: 'primaryContact.email', label: 'Email', type: 'email', required: true },
          { name: 'primaryContact.phone', label: 'Mobile', type: 'tel', required: true },
          { name: 'salesContact.name', label: 'Sales contact – name' },
          { name: 'salesContact.email', label: 'Sales email', type: 'email' },
          { name: 'salesContact.phone', label: 'Sales phone', type: 'tel' },
          { name: 'financeContact.name', label: 'Finance contact – name' },
          { name: 'financeContact.email', label: 'Finance email', type: 'email' },
          { name: 'financeContact.phone', label: 'Finance phone', type: 'tel' },
        ],
      },
      {
        title: 'Legal & compliance',
        sub: 'CR, VAT, GOSI',
        fields: [
          { name: 'crNumber', label: 'Commercial Registration (CR) no.', required: true },
          { name: 'crExpiry', label: 'CR expiry date', type: 'date', required: true },
          { name: 'vatNumber', label: 'VAT registration no.', required: true, hint: 'Required for companies registered in Saudi Arabia' },
          { name: 'chamberNumber', label: 'Chamber of Commerce no.' },
          { name: 'gosiNumber', label: 'GOSI no.' },
          {
            name: 'nitaqat',
            label: 'Nitaqat category',
            type: 'select',
            options: [
              { value: 'platinum', label: 'Platinum' },
              { value: 'high-green', label: 'High green' },
              { value: 'mid-green', label: 'Medium green' },
              { value: 'low-green', label: 'Low green' },
              { value: 'yellow', label: 'Yellow' },
              { value: 'red', label: 'Red' },
              { value: 'na', label: 'Not applicable' },
            ],
          },
        ],
      },
      {
        title: 'Capabilities',
        sub: 'Categories, divisions, regions',
        fields: [
          { name: 'categories', label: 'Product / service categories', type: 'multi', required: true, options: opt(data.categories), full: true },
          { name: 'divisions', label: 'STCC divisions you can serve', type: 'multi', options: divisions.map((d) => ({ value: String(d.id), label: d.title })), full: true },
          {
            name: 'regions',
            label: 'Regions covered',
            type: 'multi',
            full: true,
            options: [
              { value: 'eastern', label: 'Eastern Province' },
              { value: 'central', label: 'Central (Riyadh)' },
              { value: 'western', label: 'Western' },
              { value: 'northern', label: 'Northern' },
              { value: 'southern', label: 'Southern' },
              { value: 'gcc', label: 'Other GCC' },
              { value: 'international', label: 'International' },
            ],
          },
          {
            name: 'certifications',
            label: 'Certifications held',
            type: 'multi',
            full: true,
            options: [
              { value: 'iso9001', label: 'ISO 9001' },
              { value: 'iso14001', label: 'ISO 14001' },
              { value: 'iso45001', label: 'ISO 45001' },
              { value: 'iso27001', label: 'ISO 27001' },
              { value: 'aramco', label: 'Aramco approved' },
              { value: 'sabic', label: 'SABIC approved' },
              { value: 'sec', label: 'SEC approved' },
              { value: 'other', label: 'Other' },
            ],
          },
          { name: 'brands', label: 'Brands manufactured or represented', type: 'textarea', full: true },
          { name: 'references', label: 'Reference projects', type: 'refs', full: true },
        ],
      },
      {
        title: 'Financial & banking',
        sub: 'Turnover, bank details',
        fields: [
          { name: 'turnoverBand', label: 'Annual turnover (SAR)', type: 'select', options: opt(['< 1M', '1M – 5M', '5M – 20M', '20M – 100M', '100M +']) },
          { name: 'paymentTerms', label: 'Payment terms accepted', type: 'select', options: opt(['Advance', '30 days', '45 days', '60 days', '90 days']) },
          { name: 'bankName', label: 'Bank name', required: true },
          { name: 'accountHolder', label: 'Account holder name', required: true },
          { name: 'iban', label: 'IBAN', required: true, hint: 'Encrypted and visible only to STCC finance reviewers' },
          { name: 'swift', label: 'SWIFT / BIC' },
          { name: 'currency', label: 'Currency' },
        ],
      },
      { title: 'Documents', sub: 'Certificates & policies' },
      {
        title: 'Declaration',
        sub: 'Review and submit',
        fields: [
          { name: 'acceptCodeOfConduct', label: 'We accept the STCC supplier code of conduct', type: 'checkbox', required: true, full: true },
          { name: 'acceptHse', label: 'We acknowledge the STCC HSE policy and will comply on STCC sites', type: 'checkbox', required: true, full: true },
          { name: 'noConflictOfInterest', label: 'We declare that no conflict of interest exists with STCC or its employees', type: 'checkbox', full: true },
          { name: 'conflictDetails', label: 'If a conflict exists, describe it', type: 'textarea', full: true },
          { name: 'signatoryName', label: 'Authorised signatory name', required: true },
          { name: 'signatoryPosition', label: 'Position' },
          { name: 'signature', label: 'Signature (type your full name)', required: true, full: true },
        ],
      },
    ],
    [t, data.categories, divisions],
  )

  const stepOk = (i: number) => data.checks.filter((c) => c.step === i + 1).every((c) => c.ok)
  const firstIncomplete = steps.findIndex((_, i) => !stepOk(i))
  const [step, setStep] = useState(firstIncomplete >= 0 ? firstIncomplete : 6)
  const [values, setValues] = useState<Obj>(() => ({ ...v, divisions: ((v.divisions as (Obj | string | number)[]) || []).map((d) => String(typeof d === 'object' ? (d as Obj).id : d)) }))
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState<{ tone: 'error' | 'success'; text: string } | null>(null)

  const logout = async () => {
    await api('/api/vendors/logout', { method: 'POST' })
    window.location.reload()
  }

  const saveStep = async (advance: boolean) => {
    const fields = steps[step].fields || []
    const patch: Obj = {}
    for (const f of fields) {
      const top = f.name.split('.')[0]
      patch[top] =
        top === 'divisions'
          ? ((values.divisions as string[]) || []).map((x) => (Number.isNaN(Number(x)) ? x : Number(x)))
          : values[top]
    }
    setBusy(true)
    setMsg(null)
    const r = await api(`/api/vendors/${v.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch),
    })
    setBusy(false)
    if (!r.ok) {
      setMsg({ tone: 'error', text: errorText(r.json, t.somethingWrong) })
      return
    }
    await reload()
    setMsg({ tone: 'success', text: t.saved })
    if (advance) {
      setStep(Math.min(steps.length - 1, step + 1))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const submitAll = async () => {
    await saveStep(false)
    setBusy(true)
    const r = await api('/api/vendors/submit', { method: 'POST' })
    setBusy(false)
    if (!r.ok) {
      const missing = (r.json.missing as Check[] | undefined)?.map((m) => m.label).join(', ')
      setMsg({ tone: 'error', text: `${r.json.error || t.somethingWrong}${missing ? ` Missing: ${missing}` : ''}` })
      return
    }
    await reload()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const lastNote = [...data.history].reverse().find((h) => h.note)

  return (
    <div className="stack" style={{ ['--gap' as string]: '16px' }}>
      {/* summary bar */}
      <div className="card" style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <div className="stack" style={{ ['--gap' as string]: '6px', minWidth: 0 }}>
          <span className="mono muted">{(v.referenceNumber as string) || 'Draft registration'}</span>
          <strong style={{ fontFamily: 'var(--font-display)', fontSize: 22 }}>{String(v.companyName)}</strong>
          <span className="cluster" style={{ ['--gap' as string]: '8px' }}>
            <span className={`status ${data.status.value === 'approved' ? 'status--ok' : data.status.value === 'rejected' ? 'status--bad' : data.status.value === 'clarification' ? 'status--warn' : 'status--muted'}`}>{data.status.label}</span>
            {Boolean(v.vendorCode) && <span className="status status--ok">Vendor code {String(v.vendorCode)}</span>}
          </span>
        </div>
        <div style={{ flex: '1 1 220px', maxWidth: 340 }}>
          <div className="split" style={{ gap: 8, marginBottom: 8, fontSize: 14 }}>
            <span>Completeness</span>
            <strong>{data.completeness}%</strong>
          </div>
          <div className="progress">
            <div className="progress__bar" style={{ width: `${data.completeness}%` }} />
          </div>
        </div>
        <button type="button" className="btn btn--ghost btn--sm" onClick={logout}>
          {t.signOut}
        </button>
      </div>

      {data.status.value === 'clarification' && (
        <div className="alert alert--info" role="status">
          <strong>STCC has asked for more information.</strong> {lastNote?.note} Update the relevant sections, then submit again.
        </div>
      )}

      {!editable ? (
        <SubmittedView data={data} reload={reload} locale={locale} />
      ) : (
        <div className="portal-shell">
          <nav aria-label="Registration steps" className="portal-nav">
            {steps.map((s, i) => (
              <button
                key={s.title}
                type="button"
                className={`step-btn ${stepOk(i) ? 'is-done' : ''}`}
                aria-current={i === step ? 'step' : undefined}
                onClick={() => {
                  setStep(i)
                  setMsg(null)
                }}
              >
                <span className="step-btn__badge">{stepOk(i) && i !== step ? '✓' : i + 1}</span>
                <span style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: 600, fontSize: 15 }}>{s.title}</span>
                  <span style={{ fontSize: 12, opacity: 0.75 }}>{s.sub}</span>
                </span>
              </button>
            ))}
            <p className="muted" style={{ fontSize: 13, padding: 12, background: 'var(--paper)', borderRadius: 12, marginTop: 8 }}>
              Progress is saved on every step. You can sign out and continue later.
            </p>
          </nav>

          <div className="portal-main form-card" style={{ boxShadow: 'none' }}>
            <div className="stack" style={{ ['--gap' as string]: '8px' }}>
              <span className="mono muted">
                Step {step + 1} of {steps.length}
              </span>
              <h2 className="h3" style={{ fontSize: 28 }}>
                {steps[step].title}
              </h2>
              <div className="progress">
                <div className="progress__bar" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
              </div>
            </div>

            {steps[step].fields ? (
              <div className="form-grid">
                {steps[step].fields!.map((f) => (
                  <FieldInput key={f.name} f={f} value={get(values, f.name)} onChange={(val) => setValues((o) => setIn(o, f.name, val))} />
                ))}
              </div>
            ) : (
              <DocumentsStep data={data} reload={reload} />
            )}

            {step === steps.length - 1 && (
              <div className="stack" style={{ ['--gap' as string]: '10px' }}>
                <strong>Before you submit</strong>
                <ul className="check-list">
                  {data.checks.map((c) => (
                    <li key={c.key} style={{ color: c.ok ? 'var(--ink)' : 'var(--danger)' }}>
                      <span aria-hidden="true" style={{ width: 18, textAlign: 'center' }}>
                        {c.ok ? '✓' : '•'}
                      </span>
                      {c.label}
                      {!c.ok && (
                        <button type="button" className="link-arrow" style={{ border: 0, background: 'none', cursor: 'pointer' }} onClick={() => setStep(c.step - 1)}>
                          Fix
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {msg && (
              <div className={`alert alert--${msg.tone}`} role={msg.tone === 'error' ? 'alert' : 'status'}>
                {msg.text}
              </div>
            )}

            <div className="form-actions">
              <button type="button" className="btn btn--outline" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0 || busy}>
                {t.back}
              </button>
              <div className="cluster">
                {steps[step].fields && (
                  <button type="button" className="btn btn--ghost" onClick={() => saveStep(false)} disabled={busy}>
                    {t.saveDraft}
                  </button>
                )}
                {step < steps.length - 1 ? (
                  <button type="button" className="btn btn--secondary" onClick={() => (steps[step].fields ? saveStep(true) : setStep(step + 1))} disabled={busy}>
                    {busy && <span className="spinner" aria-hidden="true" />}
                    {t.saveContinue}
                  </button>
                ) : (
                  <button type="button" className="btn btn--secondary" onClick={submitAll} disabled={busy}>
                    {busy && <span className="spinner" aria-hidden="true" />}
                    {t.submitRegistration}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Field input                                                          */
/* ------------------------------------------------------------------ */

function FieldInput({ f, value, onChange }: { f: Field; value: unknown; onChange: (v: unknown) => void }) {
  const id = `vf-${f.name.replace(/\./g, '-')}`
  const label = (
    <span>
      {f.label}
      {f.required && <span className="req"> *</span>}
    </span>
  )
  const cls = `field ${f.full ? 'field--full' : ''}`

  if (f.type === 'checkbox') {
    return (
      <label className="checkbox field--full" style={{ gridColumn: '1 / -1' }}>
        <input type="checkbox" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} />
        {label}
      </label>
    )
  }
  if (f.type === 'multi') {
    const list = (Array.isArray(value) ? value : []).map(String)
    return (
      <fieldset className={cls} style={{ border: 0, padding: 0, margin: 0, gridColumn: '1 / -1' }}>
        <legend style={{ marginBottom: 10 }}>{label}</legend>
        <div className="grid" style={{ ['--min' as string]: '200px', gap: 8 }}>
          {(f.options || []).map((o) => {
            const on = list.includes(o.value)
            return (
              <label key={o.value} className="choice" style={{ minHeight: 52 }}>
                <input type="checkbox" checked={on} onChange={() => onChange(on ? list.filter((x) => x !== o.value) : [...list, o.value])} />
                <span className="choice__box" aria-hidden="true">
                  {on ? '✓' : ''}
                </span>
                {o.label}
              </label>
            )
          })}
        </div>
      </fieldset>
    )
  }
  if (f.type === 'refs') {
    const rows = (Array.isArray(value) ? value : []) as { client?: string; project?: string; year?: number | string }[]
    const update = (i: number, k: string, val: string) => onChange(rows.map((r, j) => (j === i ? { ...r, [k]: k === 'year' ? (val ? Number(val) : undefined) : val } : r)))
    return (
      <div className={cls} style={{ gridColumn: '1 / -1' }}>
        {label}
        {rows.map((r, i) => (
          <div key={i} className="form-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', alignItems: 'end' }}>
            <input className="input" placeholder="Client" value={r.client || ''} onChange={(e) => update(i, 'client', e.target.value)} aria-label="Client" />
            <input className="input" placeholder="Project" value={r.project || ''} onChange={(e) => update(i, 'project', e.target.value)} aria-label="Project" />
            <input className="input" placeholder="Year" type="number" value={r.year ?? ''} onChange={(e) => update(i, 'year', e.target.value)} aria-label="Year" />
            <button type="button" className="btn btn--ghost btn--sm" onClick={() => onChange(rows.filter((_, j) => j !== i))}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" className="btn btn--outline btn--sm" style={{ alignSelf: 'flex-start' }} onClick={() => onChange([...rows, { client: '' }])}>
          + Add reference
        </button>
      </div>
    )
  }
  return (
    <label className={cls} htmlFor={id}>
      {label}
      {f.type === 'textarea' ? (
        <textarea id={id} className="textarea" rows={3} value={String(value ?? '')} onChange={(e) => onChange(e.target.value)} dir={f.dir} />
      ) : f.type === 'select' ? (
        <select id={id} className="select" value={String(value ?? '')} onChange={(e) => onChange(e.target.value || null)}>
          <option value="">Select…</option>
          {(f.options || []).map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          className="input"
          type={f.type || 'text'}
          dir={f.dir}
          value={f.type === 'date' ? toDateInput(value) : String(value ?? '')}
          onChange={(e) => onChange(f.type === 'number' ? (e.target.value ? Number(e.target.value) : null) : f.type === 'date' ? (e.target.value ? new Date(e.target.value).toISOString() : null) : e.target.value)}
        />
      )}
      {f.hint && <span className="field__hint">{f.hint}</span>}
    </label>
  )
}

/* ------------------------------------------------------------------ */
/* Documents                                                            */
/* ------------------------------------------------------------------ */

const STATUS: Record<string, [string, string]> = {
  pending: ['Pending review', 'status--muted'],
  accepted: ['Accepted', 'status--ok'],
  rejected: ['Please replace', 'status--bad'],
  expired: ['Expired', 'status--bad'],
}

function DocumentsStep({ data, reload }: { data: Portal; reload: () => Promise<void> }) {
  const vendorType = data.vendor.vendorType as string | undefined
  const types = data.documentTypes
  const docs = (data.vendor.documents || []) as { docType: string; file?: Obj | string | number; expiryDate?: string; number?: string; reviewStatus?: string; reviewNote?: string }[]
  return (
    <div className="stack" style={{ ['--gap' as string]: '12px' }}>
      <p className="muted">PDF, JPG or PNG up to 10 MB each. Add expiry dates so we can remind you before they lapse.</p>
      {types.map((tp) => {
        const required = tp.required && (!tp.requiredFor?.length || (vendorType && tp.requiredFor.includes(vendorType)))
        const doc = docs.find((d) => d.docType === tp.key)
        return <DocRow key={tp.key} type={tp} required={Boolean(required)} doc={doc} onDone={reload} />
      })}
    </div>
  )
}

function DocRow({
  type,
  required,
  doc,
  onDone,
}: {
  type: DocType
  required: boolean
  doc?: { file?: Obj | string | number; expiryDate?: string; number?: string; reviewStatus?: string; reviewNote?: string }
  onDone: () => Promise<void>
}) {
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const fileName = doc?.file && typeof doc.file === 'object' ? String((doc.file as Obj).filename || '') : ''

  const upload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    fd.set('docType', type.key)
    setBusy(true)
    setError('')
    const r = await api('/api/vendors/upload-document', { method: 'POST', body: fd })
    setBusy(false)
    if (!r.ok) {
      setError(errorText(r.json, 'Upload failed'))
      return
    }
    setOpen(false)
    await onDone()
  }

  const [label, tone] = doc ? STATUS[doc.reviewStatus || 'pending'] : required ? ['Required', 'status--warn'] : ['Optional', 'status--muted']

  return (
    <div className="doc-row" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
      <div className="cluster" style={{ justifyContent: 'space-between' }}>
        <span className="cluster" style={{ ['--gap' as string]: '12px', flex: 1, minWidth: 0 }}>
          <span className={`status ${tone}`}>{label}</span>
          <span style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <strong>
              {type.label}
              {required && <span className="req"> *</span>}
            </strong>
            <span className="muted" style={{ fontSize: 13 }}>
              {[type.description, fileName, doc?.expiryDate ? `Expires ${doc.expiryDate.slice(0, 10)}` : null].filter(Boolean).join(' · ')}
            </span>
            {doc?.reviewNote && <span style={{ fontSize: 13, color: 'var(--danger)' }}>{doc.reviewNote}</span>}
          </span>
        </span>
        <button type="button" className="btn btn--outline btn--sm" onClick={() => setOpen(!open)} aria-expanded={open}>
          {doc ? 'Replace' : 'Upload'}
        </button>
      </div>
      {open && (
        <form onSubmit={upload} className="form-grid" style={{ marginTop: 12 }}>
          <label className="field field--full">
            File
            <input className="input" type="file" name="file" required accept=".pdf,.png,.jpg,.jpeg,.webp" style={{ paddingTop: 12 }} />
          </label>
          {type.requiresNumber && (
            <label className="field">
              Certificate / registration no.
              <input className="input" name="number" required />
            </label>
          )}
          <label className="field">
            Issue date
            <input className="input" type="date" name="issueDate" />
          </label>
          <label className="field">
            Expiry date {type.requiresExpiry && <span className="req">*</span>}
            <input className="input" type="date" name="expiryDate" required={Boolean(type.requiresExpiry)} />
          </label>
          {error && (
            <div className="alert alert--error field--full" role="alert">
              {error}
            </div>
          )}
          <div className="field--full cluster" style={{ justifyContent: 'flex-end' }}>
            <button type="submit" className="btn btn--secondary btn--sm" disabled={busy}>
              {busy && <span className="spinner" aria-hidden="true" />}
              Upload
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* After submission                                                     */
/* ------------------------------------------------------------------ */

function SubmittedView({ data, reload, locale }: { data: Portal; reload: () => Promise<void>; locale: Locale }) {
  const t = getDictionary(locale)
  const fmt = (d: string) => new Date(d).toLocaleString(locale === 'ar' ? 'ar-SA' : 'en-GB', { dateStyle: 'medium', timeStyle: 'short' })
  return (
    <div className="portal-shell">
      <div className="portal-nav" style={{ gap: 16 }}>
        <strong style={{ fontFamily: 'var(--font-display)', fontSize: 18 }}>Review progress</strong>
        {data.timeline && (
          <ol className="vtimeline">
            {data.timeline.map((s) => (
              <li key={s.label} className={`is-${s.state}`}>
                <span className="dot" aria-hidden="true">
                  {s.state === 'done' ? '✓' : s.state === 'current' ? '●' : ''}
                </span>
                {s.label}
              </li>
            ))}
          </ol>
        )}
        <p className="muted" style={{ fontSize: 13 }}>
          We email you at every step. Questions? <a href="mailto:sales@stcc.sa">sales@stcc.sa</a>
        </p>
      </div>
      <div className="portal-main stack" style={{ ['--gap' as string]: '16px' }}>
        <div className="form-card" style={{ boxShadow: 'none' }}>
          <h2 className="h3" style={{ fontSize: 24 }}>
            {data.status.value === 'approved' ? 'You are an approved STCC vendor' : 'Your registration is under review'}
          </h2>
          <p className="muted">
            {data.status.value === 'approved'
              ? 'Keep your documents up to date below. We will remind you before anything expires.'
              : 'Our procurement team is reviewing your registration. You will be notified by email as it moves through each stage.'}
          </p>
          {data.history.length > 0 && (
            <ul className="stack" style={{ listStyle: 'none', padding: 0, margin: 0, ['--gap' as string]: '10px' }}>
              {[...data.history].reverse().map((h, i) => (
                <li key={i} className="doc-row" style={{ display: 'block' }}>
                  <div className="split" style={{ gap: 8 }}>
                    <strong>{h.status}</strong>
                    <span className="mono muted">{fmt(h.at)}</span>
                  </div>
                  {h.note && <p style={{ marginTop: 6 }}>{h.note}</p>}
                </li>
              ))}
            </ul>
          )}
        </div>
        {data.status.value === 'approved' && (
          <div className="form-card" style={{ boxShadow: 'none' }}>
            <h2 className="h3" style={{ fontSize: 22 }}>
              {t.uploaded}
            </h2>
            <DocumentsStep data={data} reload={reload} />
          </div>
        )}
      </div>
    </div>
  )
}
