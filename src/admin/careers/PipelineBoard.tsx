'use client'
import { useConfig } from '@payloadcms/ui'
import React, { useMemo, useState } from 'react'

import { RankedTable, STAGE_OPTIONS } from './RankedTable'
import { ScoreBadge } from './ScoreCell'
import { type AppRow, splitList, useApplications } from './useApplications'

import '../admin.css'

type Job = { id: string | number; title: string; status: string | null; count: number }

const BOARD_STAGES = STAGE_OPTIONS.filter((s) => s.value !== 'withdrawn')

export const PipelineBoard: React.FC<{ jobs: Job[]; initialJob?: string }> = ({ jobs, initialJob }) => {
  const {
    config: {
      routes: { admin },
    },
  } = useConfig()
  const [job, setJob] = useState<string>(initialJob || '')
  const [mode, setMode] = useState<'board' | 'ranked'>('board')
  const [query, setQuery] = useState('')
  const { rows, loading, setStage } = useApplications(job || null)
  const [over, setOver] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return rows
    return rows.filter((r) =>
      [r.candidateName, r.email, r.currentTitle, r.location, r.matchedSkills].some((v) => (v || '').toLowerCase().includes(q)),
    )
  }, [rows, query])

  const byStage = useMemo(() => {
    const m = new Map<string, AppRow[]>()
    BOARD_STAGES.forEach((s) => m.set(s.value, []))
    filtered.forEach((r) => m.get(r.stage || 'new')?.push(r))
    m.forEach((list) => list.sort((a, b) => (b.matchScore ?? -1) - (a.matchScore ?? -1)))
    return m
  }, [filtered])

  const changeJob = (v: string) => {
    setJob(v)
    const u = new URL(window.location.href)
    if (v) u.searchParams.set('job', v)
    else u.searchParams.delete('job')
    window.history.replaceState(null, '', u)
  }

  return (
    <div>
      <div className="stcc-toolbar">
        <select className="stcc-select" value={job} onChange={(e) => changeJob(e.target.value)} aria-label="Job">
          <option value="">All jobs</option>
          {jobs.map((j) => (
            <option key={j.id} value={String(j.id)}>
              {j.title} ({j.count}){j.status && j.status !== 'open' ? ` · ${j.status}` : ''}
            </option>
          ))}
        </select>
        <input className="stcc-input" type="search" placeholder="Search name, title, skill…" value={query} onChange={(e) => setQuery(e.target.value)} />
        <div className="stcc-seg" role="group" aria-label="View">
          <button type="button" aria-pressed={mode === 'board'} onClick={() => setMode('board')}>
            Board
          </button>
          <button type="button" aria-pressed={mode === 'ranked'} onClick={() => setMode('ranked')}>
            Ranked
          </button>
        </div>
        <span className="stcc-muted" style={{ marginInlineStart: 'auto' }}>
          Moving a candidate may send them an email, depending on Careers settings.
        </span>
      </div>

      {mode === 'ranked' ? (
        <div className="stcc-card">
          <RankedTable rows={filtered} loading={loading} setStage={setStage} showJob={!job} />
        </div>
      ) : loading ? (
        <div className="stcc-empty">Loading…</div>
      ) : (
        <div className="stcc-board">
          {BOARD_STAGES.map((s) => {
            const list = byStage.get(s.value) || []
            return (
              <section
                key={s.value}
                className={`stcc-col ${over === s.value ? 'stcc-col--over' : ''}`}
                aria-label={s.label}
                onDragOver={(e) => {
                  e.preventDefault()
                  setOver(s.value)
                }}
                onDragLeave={() => setOver((o) => (o === s.value ? null : o))}
                onDrop={(e) => {
                  e.preventDefault()
                  setOver(null)
                  const id = e.dataTransfer.getData('text/plain')
                  const row = rows.find((r) => String(r.id) === id)
                  if (row && (row.stage || 'new') !== s.value) void setStage([row.id], s.value)
                }}
              >
                <div className="stcc-col__head">
                  <span>{s.label}</span>
                  <span className="stcc-muted">{list.length}</span>
                </div>
                {list.map((r) => (
                  <article
                    key={r.id}
                    className="stcc-cand"
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData('text/plain', String(r.id))}
                  >
                    <div className="stcc-cand__top">
                      <a className="stcc-cand__name" href={`${admin}/collections/applications/${r.id}`}>
                        {r.candidateName || r.email}
                      </a>
                      <ScoreBadge score={r.matchScore} band={null} />
                    </div>
                    <div className="stcc-cand__meta">
                      {[r.currentTitle, r.yearsExperience != null ? `${r.yearsExperience} yrs` : null].filter(Boolean).join(' · ')}
                    </div>
                    {!job && typeof r.job === 'object' && r.job ? <div className="stcc-cand__meta">{r.job.title}</div> : null}
                    <div>
                      {splitList(r.matchedSkills)
                        .slice(0, 3)
                        .map((k) => (
                          <span key={k} className="stcc-chip stcc-chip--ok">
                            {k}
                          </span>
                        ))}
                    </div>
                    {/* keyboard / touch alternative to drag & drop */}
                    <select
                      className="stcc-select"
                      value={r.stage || 'new'}
                      onChange={(e) => setStage([r.id], e.target.value)}
                      aria-label={`Move ${r.candidateName}`}
                    >
                      {STAGE_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </article>
                ))}
                {!list.length ? <div className="stcc-muted" style={{ padding: 8, fontSize: 12 }}>Drop here</div> : null}
              </section>
            )
          })}
        </div>
      )}
    </div>
  )
}
