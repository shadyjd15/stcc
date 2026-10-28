'use client'
import { toast, useConfig, useDocumentInfo, useFormFields } from '@payloadcms/ui'
import React, { useState } from 'react'

import { ScoreBadge } from './ScoreCell'

import '../admin.css'

type Factor = { score: number; weight: number; detail: string; matched?: string[]; missing?: string[] }
type Breakdown = {
  score: number
  band: string
  summary?: string
  penalty?: number
  knockoutFailed?: boolean
  missingMustHaves?: string[]
  factors: Record<string, Factor>
  screening?: { question: string; answer: string; passed: boolean | null }[]
}

const LABELS: Record<string, string> = {
  skills: 'Skills',
  experience: 'Experience',
  relevance: 'CV relevance',
  certifications: 'Certifications',
  screening: 'Screening answers',
  education: 'Education',
}

/** "Match analysis" tab: why this applicant got their score */
export const MatchReport: React.FC = () => {
  const { id } = useDocumentInfo()
  const {
    config: {
      routes: { api },
    },
  } = useConfig()
  const b = useFormFields(([f]) => f?.matchBreakdown?.value) as Breakdown | undefined
  const job = useFormFields(([f]) => f?.job?.value) as string | number | { id: string | number } | undefined
  const ai = useFormFields(([f]) => f?.aiScore?.value) as number | undefined
  const [busy, setBusy] = useState(false)

  const rescore = async () => {
    const jobId = typeof job === 'object' && job ? job.id : job
    if (!jobId) return
    setBusy(true)
    try {
      const res = await fetch(`${api}/job-openings/${jobId}/rescore`, { method: 'POST', credentials: 'include' })
      if (!res.ok) throw new Error('Could not start re-scoring')
      toast.success('Re-scoring all applicants for this job – refresh in a few seconds.')
    } catch (e) {
      toast.error(String(e))
    } finally {
      setBusy(false)
    }
  }

  if (!id) return null
  if (!b?.factors) {
    return <div className="stcc-empty">This application hasn’t been scored yet. Scoring runs automatically within a minute of applying.</div>
  }

  const factors = Object.entries(b.factors).filter(([, f]) => f.weight > 0)

  return (
    <div className="stcc-grid" style={{ margin: '8px 0 28px' }}>
      <div className="stcc-card">
        <div className="stcc-card__head">
          <div>
            <h3 style={{ marginBottom: 6 }}>Match score</h3>
            <div className="stcc-muted">{b.summary}</div>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <ScoreBadge score={b.score} band={b.band} />
            <button type="button" className="stcc-btn" onClick={rescore} disabled={busy}>
              {busy ? 'Queuing…' : 'Re-score'}
            </button>
          </div>
        </div>
        {b.knockoutFailed ? (
          <p style={{ color: 'var(--stcc-bad)', margin: '0 0 12px', fontSize: 13 }}>✕ Failed a knockout screening question.</p>
        ) : null}
        {b.missingMustHaves?.length ? (
          <p style={{ color: 'var(--stcc-bad)', margin: '0 0 12px', fontSize: 13 }}>Missing must-have: {b.missingMustHaves.join(', ')}</p>
        ) : null}
        {factors.map(([key, f]) => (
          <div key={key} className="stcc-meter">
            <span>
              {LABELS[key] || key} <span className="stcc-muted">· {f.weight}%</span>
            </span>
            <span className="stcc-meter__track">
              <span className="stcc-meter__fill" style={{ display: 'block', width: `${Math.round(f.score * 100)}%` }} />
            </span>
            <span className="stcc-num">{Math.round(f.score * 100)}%</span>
            <small>{f.detail}</small>
          </div>
        ))}
        {typeof ai === 'number' ? (
          <p className="stcc-muted" style={{ marginBottom: 0 }}>
            AI assessment score: <b>{ai}</b> (see AI summary below)
          </p>
        ) : null}
      </div>

      {b.factors.skills || b.factors.certifications ? (
        <div className="stcc-card">
          <h3>Skills & certifications</h3>
          {[...(b.factors.skills?.matched || []), ...(b.factors.certifications?.matched || [])].map((s) => (
            <span key={`m-${s}`} className="stcc-chip stcc-chip--ok">
              ✓ {s}
            </span>
          ))}
          {[...(b.factors.skills?.missing || []), ...(b.factors.certifications?.missing || [])].map((s) => (
            <span key={`x-${s}`} className={`stcc-chip stcc-chip--miss ${b.missingMustHaves?.includes(s) ? 'stcc-chip--must' : ''}`}>
              ✕ {s}
            </span>
          ))}
        </div>
      ) : null}

      {b.screening?.length ? (
        <div className="stcc-card">
          <h3>Screening answers</h3>
          <table className="stcc-table">
            <tbody>
              {b.screening.map((s) => (
                <tr key={s.question}>
                  <td>{s.question}</td>
                  <td style={{ fontWeight: 600 }}>{s.answer || <span className="stcc-muted">No answer</span>}</td>
                  <td style={{ width: 24, color: s.passed ? 'var(--stcc-good)' : s.passed === false ? 'var(--stcc-bad)' : undefined }}>
                    {s.passed === null ? '–' : s.passed ? '✓' : '✕'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  )
}
