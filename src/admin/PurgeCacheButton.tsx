'use client'
import { toast, useConfig } from '@payloadcms/ui'
import React, { useState } from 'react'

import './admin.css'

/** Manual Cloudflare purge: everything, or a list of URLs */
export const PurgeCacheButton: React.FC = () => {
  const {
    config: {
      routes: { api },
    },
  } = useConfig()
  const [urls, setUrls] = useState('')
  const [busy, setBusy] = useState(false)

  const purge = async (everything: boolean) => {
    if (everything && !window.confirm('Purge the entire Cloudflare cache? Pages will be re-fetched from the server on next visit.')) return
    setBusy(true)
    try {
      const list = everything
        ? []
        : urls
            .split(/\s+/)
            .map((u) => u.trim())
            .filter(Boolean)
      const res = await fetch(`${api}/admin-tools/purge-cache`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ urls: list }),
      })
      const data = (await res.json()) as { ok: boolean; error?: string; skipped?: boolean }
      if (data.ok) toast.success(everything ? 'Entire cache purged' : `Purged ${list.length} URL(s)`)
      else toast.error(data.error || 'Purge failed – check the zone ID and API token')
    } catch (e) {
      toast.error(String(e))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="stcc-card" style={{ margin: '8px 0 24px' }}>
      <h3>Purge Cloudflare cache</h3>
      <p className="stcc-muted" style={{ marginTop: 0 }}>
        Publishing content purges affected pages automatically. Use this after design changes or if something looks stale.
      </p>
      <textarea
        className="stcc-textarea"
        placeholder={'Optional: one URL per line, e.g.\nhttps://stcc.sa/careers'}
        value={urls}
        onChange={(e) => setUrls(e.target.value)}
      />
      <div className="stcc-toolbar" style={{ margin: '10px 0 0' }}>
        <button type="button" className="stcc-btn" disabled={busy || !urls.trim()} onClick={() => purge(false)}>
          Purge these URLs
        </button>
        <button type="button" className="stcc-btn stcc-btn--danger" disabled={busy} onClick={() => purge(true)}>
          Purge everything
        </button>
      </div>
    </div>
  )
}
