'use client'
import { toast, useAuth, useConfig } from '@payloadcms/ui'
import React, { useState } from 'react'

import './admin.css'

/** Sends a test email using the saved SMTP settings */
export const TestEmailButton: React.FC = () => {
  const { user } = useAuth()
  const {
    config: {
      routes: { api },
    },
  } = useConfig()
  const [to, setTo] = useState<string>((user as { email?: string })?.email || '')
  const [busy, setBusy] = useState(false)

  const send = async () => {
    setBusy(true)
    try {
      const res = await fetch(`${api}/admin-tools/test-email`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to }),
      })
      const data = (await res.json()) as { ok: boolean; message?: string; error?: string }
      if (data.ok) toast.success(data.message || 'Test email sent')
      else toast.error(data.error || 'Could not send')
    } catch (e) {
      toast.error(String(e))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="stcc-card" style={{ margin: '8px 0 24px' }}>
      <h3>Send a test email</h3>
      <p className="stcc-muted" style={{ marginTop: 0 }}>
        Save your settings first, then send a test to confirm the server, login and From address work.
      </p>
      <div className="stcc-toolbar" style={{ marginBottom: 0 }}>
        <input className="stcc-input" type="email" value={to} onChange={(e) => setTo(e.target.value)} placeholder="you@stcc.sa" style={{ minWidth: 260 }} />
        <button type="button" className="stcc-btn stcc-btn--primary" onClick={send} disabled={busy || !to}>
          {busy ? 'Sending…' : 'Send test email'}
        </button>
      </div>
    </div>
  )
}
