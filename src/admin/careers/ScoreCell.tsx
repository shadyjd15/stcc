'use client'
import type { DefaultCellComponentProps } from 'payload'
import React from 'react'

import '../admin.css'

export const bandFor = (score: number) => (score >= 80 ? 'strong' : score >= 65 ? 'good' : score >= 45 ? 'fair' : 'low')
export const colorFor = (score: number) =>
  score >= 80 ? 'var(--stcc-good)' : score >= 65 ? '#3a7bd5' : score >= 45 ? 'var(--stcc-warn)' : 'var(--stcc-bad)'

export const ScoreBadge: React.FC<{ score?: number | null; band?: string | null }> = ({ score, band }) => {
  if (score === null || score === undefined) return <span className="stcc-muted">Scoring…</span>
  const b = band || bandFor(score)
  return (
    <span className="stcc-score">
      <span className="stcc-score__ring" style={{ ['--p' as string]: score, ['--c' as string]: colorFor(score) }}>
        <span>{score}</span>
      </span>
      <span className={`stcc-band stcc-band--${b}`}>{b}</span>
    </span>
  )
}

/** List-view cell for the match score column */
export const ScoreCell: React.FC<DefaultCellComponentProps> = ({ cellData, rowData }) => (
  <ScoreBadge score={cellData as number | null} band={(rowData as { matchBand?: string })?.matchBand} />
)
