'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

import { localizePath, type Locale } from '@/i18n/config'

/** Email verification, forgot-password and reset-password screens for vendor accounts */
export function VendorAuthAction({ mode, locale }: { mode: 'verify' | 'forgot' | 'reset'; locale: Locale }) {
  const params = useSearchParams()
  const router = useRouter()
  const token = params?.get('token') || ''
  const [state, setState] = useState<{ status: 'idle' | 'busy' | 'done' | 'error'; message?: string }>(() =>
    mode !== 'verify' ? { status: 'idle' } : token ? { status: 'busy' } : { status: 'error', message: 'This verification link is incomplete.' },
  )
  const ran = useRef(false)
  const portal = localizePath('/vendor-portal', locale)

  useEffect(() => {
    if (mode !== 'verify' || !token || ran.current) return
    ran.current = true
    fetch(`/api/vendors/verify/${encodeURIComponent(token)}`, { method: 'POST' })
      .then(async (r) => {
        if (r.ok) router.replace(`${portal}?verified=1`)
        else setState({ status: 'error', message: 'This link has expired or was already used. Try signing in – if your email is not verified yet, register again or contact procurement.' })
      })
      .catch(() => setState({ status: 'error', message: 'Something went wrong. Please try again.' }))
  }, [mode, token, router, portal])

  const onForgot = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = new FormData(e.currentTarget).get('email')
    setState({ status: 'busy' })
    await fetch('/api/vendors/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    }).catch(() => null)
    // Same message either way, so the form cannot be used to discover accounts
    setState({ status: 'done', message: 'If an account exists for that email, a reset link is on its way.' })
  }

  const onReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    if (fd.get('password') !== fd.get('confirm')) {
      setState({ status: 'error', message: 'Passwords do not match' })
      return
    }
    if (String(fd.get('password')).length < 10) {
      setState({ status: 'error', message: 'Use at least 10 characters' })
      return
    }
    setState({ status: 'busy' })
    const r = await fetch('/api/vendors/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password: fd.get('password') }),
    })
    if (r.ok) {
      await fetch('/api/vendors/logout', { method: 'POST' }).catch(() => null)
      router.replace(`${portal}?reset=1`)
    } else setState({ status: 'error', message: 'This reset link has expired. Request a new one.' })
  }

  return (
    <div className="form-card" style={{ maxWidth: 560, marginInline: 'auto' }}>
      {mode === 'verify' && (state.status === 'busy' ? <p className="cluster"><span className="spinner" style={{ color: 'var(--navy)' }} /> Verifying…</p> : null)}
      {mode === 'forgot' && state.status !== 'done' && (
        <form onSubmit={onForgot} className="stack" style={{ ['--gap' as string]: '18px' }}>
          <p className="muted">Enter the email you registered with and we will send you a link to choose a new password.</p>
          <label className="field">
            Email
            <input className="input" type="email" name="email" required autoComplete="email" />
          </label>
          <button className="btn btn--secondary" type="submit" disabled={state.status === 'busy'}>
            Send reset link
          </button>
        </form>
      )}
      {mode === 'reset' && (
        <form onSubmit={onReset} className="stack" style={{ ['--gap' as string]: '18px' }}>
          <label className="field">
            New password
            <input className="input" type="password" name="password" required minLength={10} autoComplete="new-password" />
          </label>
          <label className="field">
            Confirm new password
            <input className="input" type="password" name="confirm" required autoComplete="new-password" />
          </label>
          <button className="btn btn--secondary" type="submit" disabled={state.status === 'busy'}>
            Save new password
          </button>
        </form>
      )}
      {state.message && (
        <div className={`alert alert--${state.status === 'error' ? 'error' : 'success'}`} role="status">
          {state.message}
        </div>
      )}
      <Link href={portal} className="link-arrow" prefetch={false}>
        Back to sign in
      </Link>
    </div>
  )
}
