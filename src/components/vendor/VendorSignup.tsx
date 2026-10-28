'use client'

import Link from 'next/link'
import React, { useRef, useState } from 'react'

import { localizePath, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionary'
import { Turnstile } from '../forms/Turnstile'

const TYPES = [
  ['manufacturer', 'Manufacturer'],
  ['distributor', 'Distributor / trader'],
  ['subcontractor', 'Subcontractor'],
  ['service', 'Service provider'],
  ['consultant', 'Consultant'],
]

export function VendorSignup({ locale, turnstileSiteKey }: { locale: Locale; turnstileSiteKey: string }) {
  const t = getDictionary(locale)
  const ref = useRef<HTMLFormElement>(null)
  const [token, setToken] = useState<string | null>(null)
  const [resetKey, setResetKey] = useState(0)
  const [state, setState] = useState<{ status: 'idle' | 'sending' | 'done' | 'error'; message?: string; field?: string; email?: string }>({ status: 'idle' })

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const form = ref.current!
    if (!form.reportValidity()) return
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>
    if (data.password !== data.confirm) {
      setState({ status: 'error', message: 'Passwords do not match', field: 'confirm' })
      return
    }
    setState({ status: 'sending' })
    const res = await fetch('/api/vendors/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, 'cf-turnstile-response': token }),
    }).catch(() => null)
    const json = res ? await res.json().catch(() => ({})) : {}
    if (!res?.ok || !json.ok) {
      setState({ status: 'error', message: json.error || t.somethingWrong, field: json.field })
      setResetKey((k) => k + 1)
      return
    }
    setState({ status: 'done', email: data.email })
  }

  if (state.status === 'done') {
    return (
      <div className="success-panel" role="status">
        <span className="success-panel__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 5.5h18v13H3zM3 5.5l9 7 9-7" />
          </svg>
        </span>
        <h3 className="h3">{locale === 'ar' ? 'تحقق من بريدك الإلكتروني' : 'Check your inbox'}</h3>
        <p className="muted">
          {locale === 'ar'
            ? 'أرسلنا رابط التحقق إلى'
            : 'We sent a verification link to'}{' '}
          <strong style={{ color: 'var(--ink)' }}>{state.email}</strong>.{' '}
          {locale === 'ar' ? 'افتح الرابط لمتابعة التسجيل.' : 'Open it to continue your registration – you can save and come back at any time.'}
        </p>
      </div>
    )
  }

  const err = (f: string) => (state.status === 'error' && state.field === f ? <span className="field__error">{state.message}</span> : null)

  return (
    <form ref={ref} onSubmit={submit} className="stack" style={{ ['--gap' as string]: '22px' }} noValidate>
      <div className="form-grid">
        <label className="field field--full">
          <span>
            {t.companyName} <span className="req">*</span>
          </span>
          <input className="input" name="companyName" required autoComplete="organization" />
        </label>
        <label className="field">
          <span>
            {t.vendorType} <span className="req">*</span>
          </span>
          <select className="select" name="vendorType" required defaultValue="">
            <option value="" disabled>
              {t.select}
            </option>
            {TYPES.map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          {t.crNumber}
          <input className="input" name="crNumber" inputMode="numeric" />
          {err('crNumber')}
        </label>
        <label className="field">
          <span>
            {t.contactName} <span className="req">*</span>
          </span>
          <input className="input" name="contactName" required autoComplete="name" />
        </label>
        <label className="field">
          <span>
            {t.phone} <span className="req">*</span>
          </span>
          <input className="input" name="phone" type="tel" required autoComplete="tel" />
        </label>
        <label className="field field--full">
          <span>
            {t.email} <span className="req">*</span>
          </span>
          <input className="input" name="email" type="email" required autoComplete="email" />
          {err('email')}
        </label>
        <label className="field">
          <span>
            {t.password} <span className="req">*</span>
          </span>
          <input className="input" name="password" type="password" required minLength={10} autoComplete="new-password" aria-describedby="pw-hint" />
          <span className="field__hint" id="pw-hint">
            {locale === 'ar' ? '10 أحرف على الأقل، بما في ذلك حرف ورقم' : 'At least 10 characters with a letter and a number'}
          </span>
          {err('password')}
        </label>
        <label className="field">
          <span>
            {t.confirmPassword} <span className="req">*</span>
          </span>
          <input className="input" name="confirm" type="password" required autoComplete="new-password" />
          {err('confirm')}
        </label>
      </div>
      <div className="honeypot" aria-hidden="true">
        <label>
          Website <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <Turnstile siteKey={turnstileSiteKey} onToken={setToken} resetKey={resetKey} locale={locale} />
      {state.status === 'error' && !state.field && (
        <div className="alert alert--error" role="alert">
          {state.message}
        </div>
      )}
      <div className="form-actions">
        <Link href={localizePath('/vendor-portal', locale)} className="btn btn--ghost" prefetch={false}>
          {t.vendorSignIn}
        </Link>
        <button className="btn btn--secondary" type="submit" disabled={state.status === 'sending'}>
          {state.status === 'sending' && <span className="spinner" aria-hidden="true" />}
          {t.createAccount}
          <svg viewBox="0 0 24 24" className="icon icon--arrow" style={{ ['--size' as string]: '16px', color: 'var(--accent)' }} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M4 12h15M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </form>
  )
}
