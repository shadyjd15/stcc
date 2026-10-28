'use client'
import { toast, useConfig, useDocumentInfo } from '@payloadcms/ui'
import React, { useState } from 'react'

import { RankedTable } from './RankedTable'
import { useApplications } from './useApplications'

import '../admin.css'

/** "Applicants" tab on a job: everyone who applied, best match first */
export const ApplicantRanking: React.FC = () => {
  const { id } = useDocumentInfo()
  const {
    config: {
      routes: { api, admin },
    },
  } = useConfig()
  const { rows, loading, reload, setStage } = useApplications(id ?? null)
  const [busy, setBusy] = useState(false)

  if (!id) return <div className="stcc-empty">Save the job first – applicants will appear here, ranked by match.</div>

  const rescore = async () => {
    setBusy(true)
    try {
      const res = await fetch(`${api}/job-openings/${id}/rescore`, { method: 'POST', credentials: 'include' })
      if (!res.ok) throw new Error('Could not start re-scoring')
      toast.success('Re-scoring started – the list refreshes in a few seconds')
      setTimeout(() => void reload(), 6000)
    } catch (e) {
      toast.error(String(e))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div style={{ margin: '8px 0 28px' }}>
      <div className="stcc-card__head">
        <div>
          <h3 style={{ margin: 0 }}>Applicants ranked by match</h3>
          <p className="stcc-muted" style={{ margin: '4px 0 0' }}>
            Scores compare each CV with this job’s skills, experience, certifications and screening answers. Change the weights in Careers settings;
            re-score after editing the job’s requirements.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8, flex: 'none' }}>
          <button type="button" className="stcc-btn" onClick={rescore} disabled={busy}>
            Re-score all
          </button>
          <a className="stcc-btn" href={`${admin}/careers-pipeline?job=${id}`}>
            Board view
          </a>
        </div>
      </div>
      <RankedTable rows={rows} loading={loading} setStage={setStage} />
    </div>
  )
}
