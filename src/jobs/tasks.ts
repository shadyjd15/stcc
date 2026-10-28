import type { TaskConfig } from 'payload'

import type { Vendor } from '@/payload-types'
import { purgeOldEvents } from '@/lib/analytics/queries'
import { rescoreJob, scoreApplication } from '@/lib/careers/service'
import { composeEmail } from '@/lib/email/compose'
import { deliverEmail, queueEmail, type OutgoingEmail } from '@/lib/email/send'
import { getEmailSettings } from '@/lib/email/settings'
import { getVendorSettings } from '@/lib/vendors/workflow'

export const sendEmailTask: TaskConfig<'sendEmail'> = {
  slug: 'sendEmail',
  label: 'Send email',
  retries: { attempts: 4, backoff: { type: 'exponential', delay: 30_000 } },
  inputSchema: [{ name: 'email', type: 'json', required: true }],
  handler: async ({ input, req }) => {
    const result = await deliverEmail(req.payload, input.email as unknown as OutgoingEmail)
    if (!result.ok) throw new Error(result.error || 'Email failed')
    return { output: {} }
  },
}

export const scoreApplicationTask: TaskConfig<'scoreApplication'> = {
  slug: 'scoreApplication',
  label: 'Score job application',
  retries: 2,
  inputSchema: [
    { name: 'applicationId', type: 'text', required: true },
    { name: 'notifyTeam', type: 'checkbox' },
  ],
  handler: async ({ input, req }) => {
    await scoreApplication(req.payload, input.applicationId, { notifyTeam: Boolean(input.notifyTeam) })
    return { output: {} }
  },
}

export const rescoreJobTask: TaskConfig<'rescoreJob'> = {
  slug: 'rescoreJob',
  label: 'Re-score all applicants for a job',
  retries: 1,
  inputSchema: [{ name: 'jobId', type: 'text', required: true }],
  handler: async ({ input, req }) => {
    const n = await rescoreJob(req.payload, input.jobId)
    req.payload.logger.info(`[careers] re-scored ${n} applications for job ${input.jobId}`)
    return { output: {} }
  },
}

/**
 * Nightly housekeeping:
 *  - vendor documents expiring soon → reminder email; expired → marked expired
 *  - approved vendors past their validity date → clarification request
 *  - job openings past their closing date → closed
 *  - analytics & applications older than the retention period → deleted
 */
export const dailyMaintenanceTask: TaskConfig<'dailyMaintenance'> = {
  slug: 'dailyMaintenance',
  label: 'Daily maintenance',
  schedule: [{ cron: '0 15 3 * * *', queue: 'maintenance' }],
  handler: async ({ req }) => {
    const { payload } = req
    const now = new Date()
    const log = (m: string) => payload.logger.info(`[maintenance] ${m}`)

    /* ---- close expired job openings ---- */
    const expiredJobs = await payload.update({
      collection: 'job-openings',
      where: { and: [{ status: { equals: 'open' } }, { closesAt: { less_than: now.toISOString() } }] },
      data: { status: 'closed' },
      overrideAccess: true,
      context: { skipRescore: true },
    })
    if (expiredJobs.docs.length) log(`closed ${expiredJobs.docs.length} job openings`)

    /* ---- vendor document expiry ---- */
    const vs = await getVendorSettings(payload)
    const reminder = vs.expiryReminder
    const days = reminder?.daysBefore ?? 30
    const horizon = new Date(now.getTime() + days * 86400_000)
    const vendors = await payload.find({
      collection: 'vendors',
      where: { status: { in: ['approved', 'submitted', 'document_review', 'technical_review', 'compliance_review'] } },
      limit: 1000,
      depth: 0,
      overrideAccess: true,
    })
    const emailSettings = await getEmailSettings(payload)
    for (const v of vendors.docs as Vendor[]) {
      let changed = false
      const expiring: string[] = []
      const docs = (v.documents || []).map((d) => {
        if (!d.expiryDate) return d
        const exp = new Date(d.expiryDate)
        if (exp < now && d.reviewStatus !== 'expired') {
          changed = true
          expiring.push(`${labelFor(vs, d.docType)} – expired ${exp.toISOString().slice(0, 10)}`)
          return { ...d, reviewStatus: 'expired' as const }
        }
        if (exp < horizon && !d.reminderSentAt) {
          changed = true
          expiring.push(`${labelFor(vs, d.docType)} – expires ${exp.toISOString().slice(0, 10)}`)
          return { ...d, reminderSentAt: now.toISOString() }
        }
        return d
      })
      if (changed) {
        await payload.update({
          collection: 'vendors',
          id: v.id,
          data: { documents: docs.map((d) => ({ ...d, file: typeof d.file === 'object' ? d.file?.id : d.file })) },
          overrideAccess: true,
          context: { vendorSystem: true, skipAudit: true },
        })
        if (reminder?.enabled !== false && expiring.length) {
          const { subject, html } = await composeEmail(
            payload,
            { subject: reminder?.subject, body: reminder?.body },
            {
              companyName: v.companyName,
              contactName: v.primaryContact?.name || v.companyName,
              portalUrl: `${emailSettings.brand.siteUrl}/vendor-portal`,
              reference: v.referenceNumber,
              vendorCode: v.vendorCode,
            },
            {
              eyebrow: 'Vendor documents',
              details: expiring.map((e, i) => ({ label: `Document ${i + 1}`, value: e })),
              cta: { label: 'Upload renewed documents', url: `${emailSettings.brand.siteUrl}/vendor-portal` },
            },
          )
          await queueEmail(payload, {
            to: [v.email, v.primaryContact?.email].filter(Boolean) as string[],
            cc: emailSettings.recipients.vendors,
            subject,
            html,
            category: 'vendors.expiry-reminder',
            related: { collection: 'vendors', id: v.id },
          })
        }
      }
    }

    /* ---- retention ---- */
    try {
      const integrations = await payload.findGlobal({ slug: 'integrations', overrideAccess: true })
      const n = await purgeOldEvents(payload, integrations?.analytics?.retentionDays || 760)
      if (n) log(`deleted ${n} old analytics events`)
    } catch (err) {
      log(`analytics retention skipped: ${String(err)}`)
    }
    const cs = await payload.findGlobal({ slug: 'careers-settings', overrideAccess: true })
    const months = cs?.retentionMonths ?? 24
    if (months > 0) {
      const cutoff = new Date(now)
      cutoff.setMonth(cutoff.getMonth() - months)
      const old = await payload.find({
        collection: 'applications',
        where: { and: [{ createdAt: { less_than: cutoff.toISOString() } }, { stage: { not_in: ['hired'] } }] },
        limit: 500,
        depth: 0,
        overrideAccess: true,
        select: { resume: true },
      })
      for (const a of old.docs) {
        if (a.resume) await payload.delete({ collection: 'resumes', id: typeof a.resume === 'object' ? a.resume.id : a.resume, overrideAccess: true }).catch(() => null)
        await payload.delete({ collection: 'applications', id: a.id, overrideAccess: true, context: { skipAudit: true } }).catch(() => null)
      }
      if (old.docs.length) log(`deleted ${old.docs.length} applications past the ${months}-month retention period`)
    }

    // Prune old email logs (keep 1 year)
    const yearAgo = new Date(now.getTime() - 365 * 86400_000).toISOString()
    await payload.delete({ collection: 'email-logs', where: { createdAt: { less_than: yearAgo } }, overrideAccess: true }).catch(() => null)

    return { output: {} }
  },
}

const labelFor = (vs: { documentTypes?: { key: string; label: string }[] | null }, key: string) =>
  vs.documentTypes?.find((d) => d.key === key)?.label || key

export const tasks = [sendEmailTask, scoreApplicationTask, rescoreJobTask, dailyMaintenanceTask]
