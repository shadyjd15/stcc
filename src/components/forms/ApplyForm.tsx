'use client'

import React, { useRef, useState } from 'react'

import type { Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionary'
import { track } from '@/components/site/analyticsClient'
import { Turnstile } from './Turnstile'

type Question = { question: string; type: string; options: string; required: boolean }

const EDUCATION = [
  ['highschool', 'High school'],
  ['diploma', 'Diploma / technical certificate'],
  ['bachelor', "Bachelor's degree"],
  ['master', "Master's degree"],
  ['phd', 'Doctorate'],
  ['none', 'Other'],
]
const NOTICE = [
  ['immediate', 'Immediately'],
  ['2w', '2 weeks'],
  ['1m', '1 month'],
  ['2m', '2 months'],
  ['3m', '3 months or more'],
]

export function ApplyForm({
  jobId,
  jobTitle,
  questions,
  consentText,
  turnstileSiteKey,
  locale,
}: {
  jobId: string | number
  jobTitle: string
  questions: Question[]
  consentText: string
  turnstileSiteKey: string
  locale: Locale
}) {
  const t = getDictionary(locale)
  const formRef = useRef<HTMLFormElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [drag, setDrag] = useState(false)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [token, setToken] = useState<string | null>(null)
  const [resetKey, setResetKey] = useState(0)
  const [state, setState] = useState<{ status: 'idle' | 'sending' | 'done' | 'error'; message?: string; field?: string; reference?: string }>({ status: 'idle' })
  const started = useRef(false)

  const onStart = () => {
    if (started.current) return
    started.current = true
    track('application_start', { job: jobTitle })
  }

  const pickFile = (f: File | undefined | null) => {
    if (!f) return
    if (f.size > 10 * 1024 * 1024) {
      setState({ status: 'error', message: 'CV must be 10 MB or smaller', field: 'resume' })
      return
    }
    setFile(f)
    setState({ status: 'idle' })
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const form = formRef.current!
    if (!form.reportValidity()) return
    if (!file) {
      setState({ status: 'error', message: `${t.cv}: ${t.required}`, field: 'resume' })
      return
    }
    const fd = new FormData(form)
    fd.set('resume', file)
    fd.set('consent', (form.elements.namedItem('consent') as HTMLInputElement)?.checked ? 'true' : 'false')
    fd.set('answers', JSON.stringify(questions.map((q, i) => ({ question: q.question, answer: answers[i] || '' }))))
    const params = new URLSearchParams(window.location.search)
    fd.set('source', [params.get('utm_source'), params.get('utm_campaign'), document.referrer ? new URL(document.referrer).hostname : ''].filter(Boolean).join(' · ').slice(0, 280))
    if (token) fd.set('cf-turnstile-response', token)
    setState({ status: 'sending' })
    try {
      const res = await fetch(`/api/job-openings/${jobId}/apply`, { method: 'POST', body: fd })
      const json = await res.json().catch(() => ({}))
      if (!res.ok || !json.ok) {
        setState({ status: 'error', message: json.error || t.somethingWrong, field: json.field })
        setResetKey((k) => k + 1)
        return
      }
      setState({ status: 'done', reference: json.reference })
      window.scrollTo({ top: (document.getElementById('apply')?.offsetTop || 0) - 120, behavior: 'smooth' })
    } catch {
      setState({ status: 'error', message: t.somethingWrong })
    }
  }

  if (state.status === 'done') {
    return (
      <div className="success-panel" role="status" aria-live="polite">
        <span className="success-panel__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4.5 12.5l5 5 10-11" />
          </svg>
        </span>
        <h3 className="h3">{t.applicationSent}</h3>
        <p className="muted">
          {t.applicationSentText} <strong style={{ color: 'var(--ink)' }}>{state.reference}</strong>.
        </p>
      </div>
    )
  }

  const err = (name: string) => (state.status === 'error' && state.field === name ? state.message : null)
  const input = (name: string, label: string, opts: { type?: string; required?: boolean; auto?: string; hint?: string; full?: boolean; min?: number } = {}) => (
    <label className={`field ${opts.full ? 'field--full' : ''}`}>
      <span>
        {label}
        {opts.required && <span className="req"> *</span>}
      </span>
      <input className="input" name={name} type={opts.type || 'text'} required={opts.required} autoComplete={opts.auto} min={opts.min} aria-invalid={err(name) ? true : undefined} />
      {opts.hint && <span className="field__hint">{opts.hint}</span>}
      {err(name) && <span className="field__error">{err(name)}</span>}
    </label>
  )

  return (
    <form ref={formRef} onSubmit={submit} onFocus={onStart} className="stack" style={{ ['--gap' as string]: '24px' }} noValidate>
      <div className="form-grid">
        {input('firstName', t.firstName, { required: true, auto: 'given-name' })}
        {input('lastName', t.lastName, { required: true, auto: 'family-name' })}
        {input('email', t.email, { type: 'email', required: true, auto: 'email' })}
        {input('phone', t.phone, { type: 'tel', required: true, auto: 'tel' })}
        {input('location', t.currentLocation, { auto: 'address-level2' })}
        {input('currentTitle', t.currentTitle, { auto: 'organization-title' })}
        {input('currentEmployer', t.currentEmployer, { auto: 'organization' })}
        {input('yearsExperience', t.yearsExperience, { type: 'number', min: 0 })}
        <label className="field">
          {t.education}
          <select className="select" name="educationLevel" defaultValue="">
            <option value="">{t.select}</option>
            {EDUCATION.map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        </label>
        {input('fieldOfStudy', t.fieldOfStudy)}
        <label className="field">
          {t.noticePeriod}
          <select className="select" name="noticePeriod" defaultValue="">
            <option value="">{t.select}</option>
            {NOTICE.map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        </label>
        {input('linkedin', t.linkedin, { type: 'url', auto: 'url' })}
        <label className="field field--full">
          {t.skills}
          <textarea className="textarea" name="skills" rows={2} style={{ minHeight: 80 }} />
          <span className="field__hint">{t.skillsHint}</span>
        </label>
        <label className="field">
          {t.certifications}
          <input className="input" name="certifications" />
          <span className="field__hint">{t.certificationsHint}</span>
        </label>
        {input('languages', t.languages)}
        {input('expectedSalary', t.expectedSalary)}
      </div>

      <div className="field">
        <span>
          {t.cv} <span className="req">*</span>
        </span>
        <label
          className={`dropzone ${drag ? 'is-drag' : ''}`}
          style={{ position: 'relative' }}
          onDragOver={(e) => {
            e.preventDefault()
            setDrag(true)
          }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => {
            e.preventDefault()
            setDrag(false)
            pickFile(e.dataTransfer.files?.[0])
          }}
        >
          <input type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={(e) => pickFile(e.target.files?.[0])} aria-describedby="cv-hint" />
          <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="var(--navy)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 15.5v-12M7 8.5l5-5 5 5M4.5 20h15" />
          </svg>
          <strong>{file ? file.name : t.dropCv}</strong>
          <span className="field__hint" id="cv-hint">
            {t.cvHint}
          </span>
        </label>
        {err('resume') && <span className="field__error">{err('resume')}</span>}
      </div>

      {questions.length > 0 && (
        <fieldset className="stack" style={{ border: 0, padding: 0, margin: 0, ['--gap' as string]: '16px' }}>
          <legend className="h3" style={{ fontSize: 20, marginBottom: 12 }}>
            {t.screening}
          </legend>
          {questions.map((q, i) => (
            <div key={i} className="field">
              <span>
                {q.question}
                {q.required && <span className="req"> *</span>}
              </span>
              {q.type === 'yesno' ? (
                <div className="cluster">
                  {[
                    ['yes', t.yes],
                    ['no', t.no],
                  ].map(([v, l]) => (
                    <label key={v} className="choice" style={{ minHeight: 48 }}>
                      <input type="radio" name={`q${i}`} value={v} required={q.required} onChange={() => setAnswers((a) => ({ ...a, [i]: v }))} />
                      <span className="choice__box" aria-hidden="true">
                        {answers[i] === v ? '✓' : ''}
                      </span>
                      {l}
                    </label>
                  ))}
                </div>
              ) : q.type === 'select' ? (
                <select className="select" required={q.required} value={answers[i] || ''} onChange={(e) => setAnswers((a) => ({ ...a, [i]: e.target.value }))}>
                  <option value="">{t.select}</option>
                  {q.options
                    .split(',')
                    .map((o) => o.trim())
                    .filter(Boolean)
                    .map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                </select>
              ) : (
                <input
                  className="input"
                  type={q.type === 'number' ? 'number' : 'text'}
                  required={q.required}
                  value={answers[i] || ''}
                  onChange={(e) => setAnswers((a) => ({ ...a, [i]: e.target.value }))}
                />
              )}
            </div>
          ))}
        </fieldset>
      )}

      <label className="field field--full">
        {t.coverLetter}
        <textarea className="textarea" name="coverLetter" rows={5} />
      </label>

      <label className="checkbox">
        <input type="checkbox" name="consent" required />
        <span>{consentText}</span>
      </label>
      <div className="honeypot" aria-hidden="true">
        <label>
          Website <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <Turnstile siteKey={turnstileSiteKey} onToken={setToken} resetKey={resetKey} locale={locale} />
      {state.status === 'error' && !['resume'].includes(state.field || '') && (
        <div className="alert alert--error" role="alert">
          {state.message}
        </div>
      )}
      <div className="form-actions" style={{ borderTop: 0, paddingTop: 0 }}>
        <span className="field__hint">{turnstileSiteKey ? t.spamNote : ''}</span>
        <button type="submit" className="btn btn--secondary" disabled={state.status === 'sending'}>
          {state.status === 'sending' && <span className="spinner" aria-hidden="true" />}
          {state.status === 'sending' ? t.submitting : t.submitApplication}
        </button>
      </div>
    </form>
  )
}
