'use client'
import { toast, useConfig } from '@payloadcms/ui'
import { useCallback, useEffect, useState } from 'react'

export type AppRow = {
  id: number | string
  candidateName?: string | null
  email?: string
  currentTitle?: string | null
  location?: string | null
  yearsExperience?: number | null
  matchScore?: number | null
  matchBand?: string | null
  matchedSkills?: string | null
  missingSkills?: string | null
  stage?: string | null
  rating?: number | null
  createdAt: string
  job?: number | string | { id: number | string; title?: string } | null
}

const SELECT = [
  'candidateName',
  'email',
  'currentTitle',
  'location',
  'yearsExperience',
  'matchScore',
  'matchBand',
  'matchedSkills',
  'missingSkills',
  'stage',
  'rating',
  'createdAt',
  'job',
]

/** Loads applications (optionally for one job) via REST and lets the caller change stages */
export function useApplications(jobId?: string | number | null) {
  const {
    config: {
      routes: { api },
    },
  } = useConfig()
  const [rows, setRows] = useState<AppRow[]>([])
  // which job's rows are on screen; a mismatch means the first load for this job is in flight
  const [loadedFor, setLoadedFor] = useState<string | null>(null)
  const [version, setVersion] = useState(0)
  const key = String(jobId ?? 'all')
  const loading = loadedFor !== key

  useEffect(() => {
    let live = true
    const q = new URLSearchParams({ limit: '500', depth: '1', sort: '-matchScore' })
    if (jobId) q.set('where[job][equals]', String(jobId))
    SELECT.forEach((k) => q.set(`select[${k}]`, 'true'))
    fetch(`${api}/applications?${q}`, { credentials: 'include' })
      .then((res) => res.json() as Promise<{ docs?: AppRow[] }>)
      .then((data) => live && setRows(data.docs || []))
      .catch(() => live && toast.error('Could not load applications'))
      .finally(() => live && setLoadedFor(key))
    return () => {
      live = false
    }
  }, [api, jobId, key, version])

  /** re-fetch in the background (e.g. after re-scoring) */
  const load = useCallback(() => setVersion((v) => v + 1), [])

  const setStage = useCallback(
    async (ids: (string | number)[], stage: string) => {
      const prev = rows
      setRows((r) => r.map((x) => (ids.includes(x.id) ? { ...x, stage } : x)))
      try {
        const results = await Promise.all(
          ids.map((id) =>
            fetch(`${api}/applications/${id}`, {
              method: 'PATCH',
              credentials: 'include',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ stage }),
            }),
          ),
        )
        if (results.some((r) => !r.ok)) throw new Error('Some updates failed')
        toast.success(ids.length > 1 ? `${ids.length} applicants moved` : 'Stage updated')
      } catch (e) {
        setRows(prev)
        toast.error(e instanceof Error ? e.message : String(e))
      }
    },
    [api, rows],
  )

  return { rows, loading, reload: load, setStage }
}

export const splitList = (s?: string | null) =>
  (s || '')
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean)
