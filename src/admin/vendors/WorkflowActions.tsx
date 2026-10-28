'use client'
import { toast, useAuth, useConfig, useDocumentInfo, useFormFields } from '@payloadcms/ui'
import React, { useState } from 'react'

import { statusLabel, TRANSITIONS, type VendorStatus } from '@/lib/vendors/constants'

import '../admin.css'

const ACTION_LABEL: Partial<Record<VendorStatus, string>> = {
  submitted: 'Mark as submitted',
  document_review: 'Start document check',
  technical_review: 'Pass to technical review',
  compliance_review: 'Pass to compliance & HSE',
  clarification: 'Request clarification',
  approved: 'Approve vendor',
  rejected: 'Reject',
  suspended: 'Suspend',
}

const NEEDS_NOTE: VendorStatus[] = ['clarification', 'rejected', 'suspended']

/** Sidebar panel on a vendor: current status + the allowed next steps. Every move emails the vendor. */
export const WorkflowActions: React.FC = () => {
  const { id } = useDocumentInfo()
  const { user } = useAuth()
  const {
    config: {
      routes: { api },
    },
  } = useConfig()
  const status = (useFormFields(([f]) => f?.status?.value) as VendorStatus) || 'draft'
  const completeness = useFormFields(([f]) => f?.completeness?.value) as number | undefined
  const vendorCode = useFormFields(([f]) => f?.vendorCode?.value) as string | undefined
  const [note, setNote] = useState('')
  const [notify, setNotify] = useState(true)
  const [busy, setBusy] = useState<VendorStatus | null>(null)

  const roles = (user as { roles?: string[] })?.roles || []
  const canAct = roles.includes('admin') || roles.includes('procurement')
  if (!id) return null

  const next = TRANSITIONS[status] || []

  const move = async (to: VendorStatus) => {
    if (NEEDS_NOTE.includes(to) && !note.trim()) {
      toast.error('Please add a note – the vendor will see it in their email and portal.')
      return
    }
    if (to === 'approved' && !window.confirm('Approve this vendor? A vendor code will be issued and they will be emailed.')) return
    setBusy(to)
    try {
      const res = await fetch(`${api}/vendors/${id}/transition`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to, note: note.trim() || undefined, notify }),
      })
      const data = (await res.json()) as { ok: boolean; error?: string; vendorCode?: string }
      if (!data.ok) throw new Error(data.error || 'Could not update status')
      toast.success(`Moved to “${statusLabel(to)}”${notify ? ' · vendor emailed' : ''}${data.vendorCode && to === 'approved' ? ` · code ${data.vendorCode}` : ''}`)
      setTimeout(() => window.location.reload(), 600)
    } catch (e) {
      toast.error(e instanceof Error ? e.message : String(e))
      setBusy(null)
    }
  }

  return (
    <div className="stcc-wf">
      <div className="stcc-section__title" style={{ margin: 0 }}>
        Review workflow
      </div>
      <div className="stcc-wf__status">
        <i className={`stcc-dot stcc-dot--${status}`} />
        {statusLabel(status)}
      </div>
      {typeof completeness === 'number' ? (
        <div>
          <div className="stcc-muted" style={{ fontSize: 12, marginBottom: 4 }}>
            Profile completeness {completeness}%
          </div>
          <div className="stcc-meter__track">
            <div className="stcc-meter__fill" style={{ width: `${completeness}%`, background: completeness >= 100 ? 'var(--stcc-good)' : undefined }} />
          </div>
        </div>
      ) : null}
      {vendorCode ? (
        <div style={{ fontSize: 13 }}>
          Vendor code <b>{vendorCode}</b>
        </div>
      ) : null}

      {canAct && next.length ? (
        <>
          <textarea
            className="stcc-textarea"
            placeholder="Note to the vendor (required for clarification / rejection)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <label>
            <input type="checkbox" checked={notify} onChange={(e) => setNotify(e.target.checked)} /> Email the vendor
          </label>
          <div className="stcc-wf__actions">
            {next.map((to) => (
              <button
                key={to}
                type="button"
                className={`stcc-btn ${to === 'approved' ? 'stcc-btn--primary' : to === 'rejected' || to === 'suspended' ? 'stcc-btn--danger' : ''}`}
                style={{ justifyContent: 'center' }}
                disabled={busy !== null}
                onClick={() => move(to)}
              >
                {busy === to ? 'Updating…' : ACTION_LABEL[to] || statusLabel(to)}
              </button>
            ))}
          </div>
        </>
      ) : status === 'draft' ? (
        <p className="stcc-muted" style={{ margin: 0 }}>
          The vendor hasn’t submitted yet. You’ll be notified when they do.
        </p>
      ) : !canAct ? (
        <p className="stcc-muted" style={{ margin: 0 }}>
          Only procurement can change the status.
        </p>
      ) : null}
    </div>
  )
}
