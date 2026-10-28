import type { CollectionAfterChangeHook, CollectionBeforeChangeHook } from 'payload'

import type { Application, JobOpening } from '@/payload-types'
import { composeEmail } from '@/lib/email/compose'
import { queueEmail } from '@/lib/email/send'
import { applicationReference } from './service'

const STAGE_LABEL: Record<string, string> = {
  new: 'New',
  reviewing: 'Reviewing',
  shortlisted: 'Shortlisted',
  interview: 'Interview',
  offer: 'Offer',
  hired: 'Hired',
  rejected: 'Rejected',
  withdrawn: 'Withdrawn',
}

/** Keeps an audit trail of stage, rating and owner changes on the application itself. */
export const logApplicationActivity: CollectionBeforeChangeHook<Application> = ({ data, originalDoc, req, operation }) => {
  if (operation !== 'update' || !originalDoc || req.context.skipApplicationHooks) return data
  const by = (req.user as { name?: string; email?: string } | null)?.name || req.user?.email || 'system'
  const events: string[] = []
  if (data.stage && data.stage !== originalDoc.stage)
    events.push(`Stage: ${STAGE_LABEL[originalDoc.stage || 'new']} → ${STAGE_LABEL[data.stage]}`)
  if (data.rating !== undefined && data.rating !== originalDoc.rating) events.push(`Rating: ${data.rating ? '★'.repeat(Number(data.rating)) : 'cleared'}`)
  const ownerId = (v: unknown) => (v && typeof v === 'object' ? (v as { id: unknown }).id : v)
  if (data.assignedTo !== undefined && ownerId(data.assignedTo) !== ownerId(originalDoc.assignedTo)) events.push('Assigned owner changed')
  if (events.length) {
    const at = new Date().toISOString()
    data.activity = [...(data.activity || originalDoc.activity || []), ...events.map((event) => ({ at, event, by }))]
  }
  return data
}

export const onApplicationChange: CollectionAfterChangeHook<Application> = async ({
  doc,
  previousDoc,
  operation,
  req,
}) => {
  if (req.context.skipApplicationHooks) return doc
  const { payload } = req

  if (operation === 'create') {
    // Score in the background; team notification goes out once the score is known
    await payload.jobs.queue({
      task: 'scoreApplication',
      input: { applicationId: String(doc.id), notifyTeam: Boolean(req.context.publicSubmission) },
      req,
    })

    if (req.context.publicSubmission) {
      const settings = await payload.findGlobal({ slug: 'careers-settings', overrideAccess: true, req })
      const tpl = settings?.applicationReceived
      if (tpl?.enabled !== false) {
        const job = (typeof doc.job === 'object' ? doc.job : await payload.findByID({ collection: 'job-openings', id: doc.job, depth: 0, req })) as JobOpening
        const { subject, html } = await composeEmail(
          payload,
          tpl || { subject: 'We received your application', body: 'Thank you for applying.' },
          { firstName: doc.firstName, lastName: doc.lastName, jobTitle: job?.title, reference: applicationReference(doc) },
          { eyebrow: 'Careers', footnote: 'This is an automated message. Please do not reply to this email.' },
        )
        await queueEmail(payload, { to: doc.email, subject, html, category: 'careers.application-received', related: { collection: 'applications', id: doc.id } }, req)
      }
    }
    return doc
  }

  if (operation === 'update' && previousDoc && doc.stage !== previousDoc.stage && doc.sendStageEmail !== false) {
    const settings = await payload.findGlobal({ slug: 'careers-settings', overrideAccess: true, req })
    const tpl = (settings?.stageEmails || []).find((t) => t.stage === doc.stage && t.enabled !== false)
    if (tpl) {
      const job = (typeof doc.job === 'object' ? doc.job : await payload.findByID({ collection: 'job-openings', id: doc.job, depth: 0, req })) as JobOpening
      const { subject, html } = await composeEmail(
        payload,
        tpl,
        {
          firstName: doc.firstName,
          lastName: doc.lastName,
          jobTitle: job?.title,
          reference: applicationReference(doc),
          stage: STAGE_LABEL[doc.stage || 'new'],
        },
        { eyebrow: 'Careers · Application update' },
      )
      await queueEmail(payload, { to: doc.email, subject, html, category: `careers.stage-${doc.stage}`, related: { collection: 'applications', id: doc.id } }, req)
    }
  }
  return doc
}
