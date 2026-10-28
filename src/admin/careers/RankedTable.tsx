'use client'
import { useConfig } from '@payloadcms/ui'
import React, { useMemo, useState } from 'react'

import { ScoreBadge } from './ScoreCell'
import { type AppRow, splitList } from './useApplications'

import '../admin.css'

export const STAGE_OPTIONS = [
  { label: 'New', value: 'new' },
  { label: 'Reviewing', value: 'reviewing' },
  { label: 'Shortlisted', value: 'shortlisted' },
  { label: 'Interview', value: 'interview' },
  { label: 'Offer', value: 'offer' },
  { label: 'Hired', value: 'hired' },
  { label: 'Rejected', value: 'rejected' },
  { label: 'Withdrawn', value: 'withdrawn' },
]

type Props = {
  rows: AppRow[]
  loading: boolean
  setStage: (ids: (string | number)[], stage: string) => Promise<void>
  showJob?: boolean
}

/** Applicants ranked by match score, with filters and bulk shortlist */
export const RankedTable: React.FC<Props> = ({ rows, loading, setStage, showJob }) => {
  const {
    config: {
      routes: { admin },
    },
  } = useConfig()
  const [hideClosed, setHideClosed] = useState(true)
  const [minScore, setMinScore] = useState(0)
  const [skill, setSkill] = useState('')
  const [picked, setPicked] = useState<(string | number)[]>([])

  const allSkills = useMemo(() => {
    const s = new Set<string>()
    rows.forEach((r) => [...splitList(r.matchedSkills), ...splitList(r.missingSkills)].forEach((k) => s.add(k)))
    return [...s].sort()
  }, [rows])

  const view = useMemo(
    () =>
      rows
        .filter((r) => !hideClosed || !['rejected', 'withdrawn'].includes(r.stage || ''))
        .filter((r) => (r.matchScore ?? 0) >= minScore)
        .filter((r) => !skill || splitList(r.matchedSkills).includes(skill))
        .sort((a, b) => (b.matchScore ?? -1) - (a.matchScore ?? -1)),
    [rows, hideClosed, minScore, skill],
  )

  const toggle = (id: string | number) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))
  const bulk = async (stage: string) => {
    await setStage(picked, stage)
    setPicked([])
  }

  if (loading) return <div className="stcc-empty">Loading applicants…</div>
  if (!rows.length) return <div className="stcc-empty">No applications yet.</div>

  return (
    <div>
      <div className="stcc-toolbar">
        <label className="stcc-muted" style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          Min score
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={minScore}
            onChange={(e) => setMinScore(Number(e.target.value))}
            aria-label="Minimum match score"
          />
          <b style={{ width: 28 }}>{minScore}</b>
        </label>
        {allSkills.length ? (
          <select className="stcc-select" value={skill} onChange={(e) => setSkill(e.target.value)} aria-label="Must have skill">
            <option value="">Any skill</option>
            {allSkills.map((s) => (
              <option key={s} value={s}>
                Has: {s}
              </option>
            ))}
          </select>
        ) : null}
        <label className="stcc-muted" style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <input type="checkbox" checked={hideClosed} onChange={(e) => setHideClosed(e.target.checked)} /> Hide rejected
        </label>
        <span className="stcc-muted" style={{ marginInlineStart: 'auto' }}>
          {view.length} of {rows.length}
        </span>
      </div>

      {picked.length ? (
        <div className="stcc-toolbar" style={{ padding: '8px 12px', border: '1px solid var(--stcc-accent)', borderRadius: 8 }}>
          <b>{picked.length} selected</b>
          <button type="button" className="stcc-btn stcc-btn--primary" onClick={() => bulk('shortlisted')}>
            Shortlist
          </button>
          <button type="button" className="stcc-btn" onClick={() => bulk('interview')}>
            Move to interview
          </button>
          <button type="button" className="stcc-btn stcc-btn--danger" onClick={() => bulk('rejected')}>
            Reject
          </button>
          <button type="button" className="stcc-btn" onClick={() => setPicked([])}>
            Clear
          </button>
        </div>
      ) : (
        <div className="stcc-toolbar">
          <button
            type="button"
            className="stcc-btn"
            onClick={() => setPicked(view.filter((r) => (r.stage || 'new') === 'new').slice(0, 5).map((r) => r.id))}
          >
            Select top 5 new applicants
          </button>
        </div>
      )}

      <div style={{ overflowX: 'auto' }}>
        <table className="stcc-table">
          <thead>
            <tr>
              <th aria-label="Select" />
              <th>#</th>
              <th>Candidate</th>
              {showJob ? <th>Job</th> : null}
              <th>Match</th>
              <th>Skills</th>
              <th className="stcc-num">Years</th>
              <th>Stage</th>
              <th>Applied</th>
            </tr>
          </thead>
          <tbody>
            {view.map((r, i) => {
              const matched = splitList(r.matchedSkills)
              const missing = splitList(r.missingSkills)
              return (
                <tr key={r.id}>
                  <td>
                    <input type="checkbox" checked={picked.includes(r.id)} onChange={() => toggle(r.id)} aria-label={`Select ${r.candidateName}`} />
                  </td>
                  <td className="stcc-muted">{i + 1}</td>
                  <td>
                    <a href={`${admin}/collections/applications/${r.id}`}>{r.candidateName || r.email}</a>
                    <div className="stcc-muted">{[r.currentTitle, r.location].filter(Boolean).join(' · ')}</div>
                  </td>
                  {showJob ? <td>{typeof r.job === 'object' && r.job ? r.job.title : '–'}</td> : null}
                  <td>
                    <ScoreBadge score={r.matchScore} band={r.matchBand} />
                  </td>
                  <td style={{ maxWidth: 360 }}>
                    {matched.slice(0, 5).map((s) => (
                      <span key={s} className="stcc-chip stcc-chip--ok">
                        {s}
                      </span>
                    ))}
                    {matched.length > 5 ? <span className="stcc-muted">+{matched.length - 5}</span> : null}
                    {missing.length ? <div className="stcc-muted">Missing: {missing.slice(0, 4).join(', ')}</div> : null}
                  </td>
                  <td className="stcc-num">{r.yearsExperience ?? '–'}</td>
                  <td>
                    <select className="stcc-select" value={r.stage || 'new'} onChange={(e) => setStage([r.id], e.target.value)} aria-label="Stage">
                      {STAGE_OPTIONS.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="stcc-muted">{new Date(r.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
