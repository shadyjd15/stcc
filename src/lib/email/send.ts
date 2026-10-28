import nodemailer, { type Transporter } from 'nodemailer'
import type { Payload, PayloadRequest } from 'payload'

import { getEmailSettings, type ResolvedEmailSettings } from './settings'
import { htmlToText } from './template'

export type OutgoingEmail = {
  to: string | string[]
  cc?: string | string[]
  bcc?: string | string[]
  replyTo?: string
  subject: string
  html: string
  text?: string
  /** used for filtering in the email log, e.g. "careers.applicant-confirmation" */
  category?: string
  related?: { collection: string; id: string | number }
  attachments?: { filename: string; path?: string; content?: string; contentType?: string }[]
}

let transportCache: { key: string; transporter: Transporter } | null = null

const getTransport = (s: ResolvedEmailSettings): Transporter => {
  const key = [s.host, s.port, s.secure, s.user, s.password].join('|')
  if (transportCache?.key === key) return transportCache.transporter
  const transporter = nodemailer.createTransport({
    host: s.host,
    port: s.port,
    secure: s.secure === 'ssl',
    requireTLS: s.secure === 'starttls',
    ignoreTLS: s.secure === 'none',
    auth: s.user ? { user: s.user, pass: s.password } : undefined,
    pool: true,
    maxConnections: 3,
  })
  transportCache = { key, transporter }
  return transporter
}

export const resetTransport = () => {
  transportCache?.transporter.close()
  transportCache = null
}

const asList = (v?: string | string[]) =>
  (Array.isArray(v) ? v : v ? [v] : []).map((x) => x.trim()).filter(Boolean)

/**
 * Sends immediately and writes an entry to the Email log collection.
 * Prefer `queueEmail` from hooks so a slow SMTP server never blocks a request.
 */
export async function deliverEmail(
  payload: Payload,
  email: OutgoingEmail,
  opts: { from?: string } = {},
): Promise<{ ok: boolean; messageId?: string; error?: string; skipped?: boolean }> {
  const settings = await getEmailSettings(payload)
  const to = asList(email.to)
  const text = email.text || htmlToText(email.html)

  let result: { ok: boolean; messageId?: string; error?: string; skipped?: boolean }

  if (!to.length) {
    result = { ok: false, error: 'No recipients' }
  } else if (!settings.enabled) {
    payload.logger.warn(
      `[email] SMTP not configured – "${email.subject}" to ${to.join(', ')} was logged but not sent`,
    )
    result = { ok: true, skipped: true }
  } else {
    try {
      const info = await getTransport(settings).sendMail({
        from: opts.from || `"${settings.fromName}" <${settings.fromAddress}>`,
        to,
        cc: asList(email.cc),
        bcc: asList(email.bcc),
        replyTo: email.replyTo || settings.replyTo || undefined,
        subject: email.subject,
        html: email.html,
        text,
        attachments: email.attachments,
      })
      result = { ok: true, messageId: info.messageId }
    } catch (err) {
      result = { ok: false, error: err instanceof Error ? err.message : String(err) }
      payload.logger.error(`[email] failed "${email.subject}": ${result.error}`)
    }
  }

  try {
    await payload.create({
      collection: 'email-logs',
      overrideAccess: true,
      context: { skipAudit: true },
      data: {
        subject: email.subject,
        to: to.join(', '),
        cc: asList(email.cc).join(', ') || undefined,
        category: email.category || 'general',
        status: result.skipped ? 'logged' : result.ok ? 'sent' : 'failed',
        error: result.error,
        messageId: result.messageId,
        html: email.html,
        relatedCollection: email.related?.collection,
        relatedId: email.related ? String(email.related.id) : undefined,
      },
    })
  } catch (err) {
    payload.logger.error(`[email] could not write email log: ${String(err)}`)
  }

  return result
}

/**
 * Queue an email on the background job runner (retries 3x with back-off).
 * Pass `req` from hooks so the job is created in the same transaction.
 */
export async function queueEmail(
  payload: Payload,
  email: OutgoingEmail,
  req?: PayloadRequest,
): Promise<void> {
  await payload.jobs.queue({
    task: 'sendEmail',
    queue: 'email',
    input: { email: email as unknown as Record<string, unknown> },
    req,
  })
}
