import type { Payload } from 'payload'

import type { Application, JobOpening, Resume } from '@/payload-types'
import { composeEmail } from '@/lib/email/compose'
import { queueEmail } from '@/lib/email/send'
import { getEmailSettings } from '@/lib/email/settings'
import { lexicalToText } from '@/utilities/lexicalToText'
import { readUpload } from '@/lib/storage'
import { aiAssess } from './ai'
import { extractResumeTextFromBuffer } from './extract'
import {
  buildCorpusStats,
  DEFAULT_WEIGHTS,
  scoreApplicant,
  type JobForMatching,
  type MatchWeights,
} from './matching'

export const jobText = (job: JobOpening): string =>
  [
    job.title,
    job.summary,
    lexicalToText(job.description),
    ...(job.responsibilities || []).map((r) => r.text),
    ...(job.requirements || []).map((r) => r.text),
  ]
    .filter(Boolean)
    .join('\n')

export const jobForMatching = (job: JobOpening): JobForMatching => ({
  title: job.title,
  skills: job.skills,
  certifications: job.certifications,
  keywords: job.keywords,
  experienceMin: job.experienceMin,
  experienceMax: job.experienceMax,
  educationLevel: job.educationLevel,
  screeningQuestions: job.screeningQuestions,
  text: jobText(job),
})

export async function getWeights(payload: Payload): Promise<MatchWeights & { autoRejectKnockouts: boolean }> {
  try {
    const s = await payload.findGlobal({ slug: 'careers-settings', overrideAccess: true, depth: 0 })
    const w = s?.weights || {}
    return {
      skills: w.skills ?? DEFAULT_WEIGHTS.skills,
      experience: w.experience ?? DEFAULT_WEIGHTS.experience,
      relevance: w.relevance ?? DEFAULT_WEIGHTS.relevance,
      certifications: w.certifications ?? DEFAULT_WEIGHTS.certifications,
      education: w.education ?? DEFAULT_WEIGHTS.education,
      screening: w.screening ?? DEFAULT_WEIGHTS.screening,
      missingMustHavePenalty: w.missingMustHavePenalty ?? DEFAULT_WEIGHTS.missingMustHavePenalty,
      autoRejectKnockouts: Boolean(w.autoRejectKnockouts),
    }
  } catch {
    return { ...DEFAULT_WEIGHTS, autoRejectKnockouts: false }
  }
}

export const applicationReference = (app: Pick<Application, 'id' | 'createdAt'>) =>
  `APP-${new Date(app.createdAt).getFullYear()}-${String(app.id).padStart(5, '0')}`

/**
 * Extract CV text (if needed), score against the job, optionally run the AI assessment,
 * and save the result. Uses context flags so the save does not trigger stage emails.
 */
export async function scoreApplication(
  payload: Payload,
  applicationId: string | number,
  opts: { notifyTeam?: boolean; corpusDocs?: string[] } = {},
): Promise<number | null> {
  const app = (await payload.findByID({
    collection: 'applications',
    id: applicationId,
    depth: 1,
    overrideAccess: true,
  })) as Application
  // The relation is populated with the slim defaultPopulate shape, so load the full job
  const jobId = typeof app.job === 'object' && app.job ? app.job.id : app.job
  if (!jobId) return null
  const job = (await payload.findByID({
    collection: 'job-openings',
    id: jobId,
    depth: 0,
    overrideAccess: true,
  })) as JobOpening
  if (!job) return null

  let resumeText = app.resumeText || ''
  if (!resumeText && app.resume && typeof app.resume === 'object') {
    const resume = app.resume as Resume & { prefix?: string | null }
    const buf = await readUpload('resumes', resume)
    if (buf) resumeText = await extractResumeTextFromBuffer(buf, resume.filename || 'cv', resume.mimeType)
  }

  let corpusDocs = opts.corpusDocs
  if (!corpusDocs) {
    const siblings = await payload.find({
      collection: 'applications',
      where: { job: { equals: job.id } },
      limit: 500,
      depth: 0,
      overrideAccess: true,
      select: { resumeText: true },
    })
    corpusDocs = [jobText(job), ...siblings.docs.map((d) => d.resumeText || '').filter(Boolean)]
  }
  if (resumeText && !corpusDocs.includes(resumeText)) corpusDocs = [...corpusDocs, resumeText]

  const weights = await getWeights(payload)
  const result = scoreApplicant(
    jobForMatching(job),
    { ...app, resumeText },
    weights,
    buildCorpusStats(corpusDocs),
  )

  let ai: Awaited<ReturnType<typeof aiAssess>> = null
  if (opts.notifyTeam && resumeText) {
    ai = await aiAssess(payload, {
      jobTitle: job.title,
      jobText: jobText(job),
      resumeText,
      profile: `Current title: ${app.currentTitle || '-'}; years: ${app.yearsExperience ?? '-'}; skills: ${app.skillsText || '-'}; certifications: ${app.certificationsText || '-'}`,
    })
  }

  const shouldAutoReject = weights.autoRejectKnockouts && result.knockoutFailed && app.stage === 'new'

  await payload.update({
    collection: 'applications',
    id: app.id,
    overrideAccess: true,
    context: { skipApplicationHooks: true },
    data: {
      resumeText,
      matchScore: result.score,
      matchBand: result.band,
      matchBreakdown: result as unknown as Record<string, unknown>,
      matchedSkills: result.matchedSkills.join(', '),
      missingSkills: result.missingSkills.join(', '),
      screeningAnswers: result.screening.map((s) => ({ question: s.question, answer: s.answer, passed: s.passed ?? undefined })),
      scoredAt: new Date().toISOString(),
      ...(ai ? { aiScore: ai.score, aiSummary: [ai.summary, ai.strengths.length ? `Strengths: ${ai.strengths.join('; ')}` : '', ai.concerns.length ? `Concerns: ${ai.concerns.join('; ')}` : ''].filter(Boolean).join('\n\n') } : {}),
      ...(shouldAutoReject
        ? {
            stage: 'rejected' as const,
            rejectionReason: 'screening' as const,
            activity: [...(app.activity || []), { at: new Date().toISOString(), event: 'Auto-rejected: failed knockout question', by: 'system' }],
          }
        : {}),
    },
  })

  if (opts.notifyTeam) await notifyTeamOfApplication(payload, { ...app, matchScore: result.score }, job, result.summary)
  return result.score
}

export async function rescoreJob(payload: Payload, jobId: string | number): Promise<number> {
  const job = (await payload.findByID({ collection: 'job-openings', id: jobId, depth: 0, overrideAccess: true })) as JobOpening
  const apps = await payload.find({
    collection: 'applications',
    where: { job: { equals: jobId } },
    limit: 1000,
    depth: 0,
    overrideAccess: true,
    select: { resumeText: true },
  })
  const corpusDocs = [jobText(job), ...apps.docs.map((d) => d.resumeText || '').filter(Boolean)]
  for (const a of apps.docs) await scoreApplication(payload, a.id, { corpusDocs })
  return apps.docs.length
}

async function notifyTeamOfApplication(payload: Payload, app: Application, job: JobOpening, summary: string) {
  const settings = await payload.findGlobal({ slug: 'careers-settings', overrideAccess: true })
  const tpl = settings?.newApplication
  if (tpl && tpl.enabled === false) return
  if ((settings?.notifyOnlyAbove || 0) > (app.matchScore || 0)) return

  const emailSettings = await getEmailSettings(payload)
  const extra = (job.notifyRecipients || []).map((r) => r.email).filter(Boolean)
  const staff = await payload.find({
    collection: 'users',
    where: { 'notifications.newApplications': { equals: true } },
    overrideAccess: true,
    depth: 0,
    limit: 50,
    select: { email: true },
  })
  const to = [...new Set([...emailSettings.recipients.careers, ...extra, ...staff.docs.map((u) => u.email)])]
  const adminUrl = `${emailSettings.brand.siteUrl}/admin/collections/applications/${app.id}`

  const { subject, html } = await composeEmail(
    payload,
    tpl || {},
    {
      firstName: app.firstName,
      lastName: app.lastName,
      jobTitle: job.title,
      matchScore: app.matchScore ?? 0,
      reference: applicationReference(app),
    },
    {
      eyebrow: 'Careers · New application',
      details: [
        { label: 'Match score', value: `${app.matchScore ?? 0} / 100` },
        { label: 'Assessment', value: summary },
        { label: 'Current role', value: [app.currentTitle, app.currentEmployer].filter(Boolean).join(' · ') },
        { label: 'Experience', value: app.yearsExperience != null ? `${app.yearsExperience} years` : '' },
        { label: 'Location', value: app.location || '' },
        { label: 'Email', value: app.email },
        { label: 'Phone', value: app.phone || '' },
      ],
      cta: { label: 'Open application', url: adminUrl },
      footnote: 'You receive this because your inbox is set for job applications in Email & notifications.',
    },
  )
  await queueEmail(payload, {
    to,
    subject,
    html,
    replyTo: app.email,
    category: 'careers.new-application',
    related: { collection: 'applications', id: app.id },
  })
}
