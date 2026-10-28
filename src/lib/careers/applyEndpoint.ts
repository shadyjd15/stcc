import type { Endpoint } from 'payload'
import { z } from 'zod'

import type { JobOpening } from '@/payload-types'
import { getCountry } from '@/lib/cloudflare'
import { guardPublicRequest, json, MIME_FOR, safeFilename, sniffFileType } from '@/lib/publicGuard'
import { recordServerEvent } from '@/lib/analytics/record'
import { applicationReference } from './service'
import { extractResumeTextFromBuffer } from './extract'

const MAX_CV_BYTES = 10 * 1024 * 1024

const schema = z.object({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  email: z.string().trim().toLowerCase().email().max(160),
  phone: z.string().trim().min(6).max(40),
  location: z.string().trim().max(120).optional().default(''),
  currentTitle: z.string().trim().max(120).optional().default(''),
  currentEmployer: z.string().trim().max(120).optional().default(''),
  yearsExperience: z.coerce.number().min(0).max(60).optional(),
  educationLevel: z.enum(['none', 'highschool', 'diploma', 'bachelor', 'master', 'phd']).optional(),
  fieldOfStudy: z.string().trim().max(120).optional().default(''),
  noticePeriod: z.enum(['immediate', '2w', '1m', '2m', '3m']).optional(),
  skills: z.string().trim().max(2000).optional().default(''),
  certifications: z.string().trim().max(2000).optional().default(''),
  languages: z.string().trim().max(200).optional().default(''),
  linkedin: z.string().trim().max(300).optional().default(''),
  expectedSalary: z.string().trim().max(80).optional().default(''),
  coverLetter: z.string().trim().max(6000).optional().default(''),
  consent: z.literal('true', { message: 'Please accept the privacy notice' }),
  answers: z.string().optional().default('[]'),
  source: z.string().max(300).optional().default(''),
})

/**
 * POST /api/job-openings/:id/apply  (multipart/form-data)
 * Public endpoint used by the job application form.
 */
export const applyEndpoint: Endpoint = {
  path: '/:id/apply',
  method: 'post',
  handler: async (req) => {
    const { payload } = req
    const id = req.routeParams?.id as string
    let form: FormData
    try {
      form = await req.formData!()
    } catch {
      return json({ ok: false, error: 'Invalid form submission' }, 400)
    }

    const blocked = await guardPublicRequest(req, {
      key: 'apply',
      limit: 5,
      windowMs: 10 * 60_000,
      turnstileToken: form.get('cf-turnstile-response') as string | null,
      honeypot: form.get('website') as string | null,
    })
    if (blocked) return blocked

    const raw = Object.fromEntries(
      [...form.entries()].filter(([, v]) => typeof v === 'string').map(([k, v]) => [k, v === '' ? undefined : v]),
    )
    const parsed = schema.safeParse(raw)
    if (!parsed.success) {
      const issue = parsed.error.issues[0]
      return json({ ok: false, error: `${issue.path.join('.') || 'Form'}: ${issue.message}`, field: issue.path[0] }, 400)
    }
    const data = parsed.data

    // Job must exist and be open
    let job: JobOpening
    try {
      job = (await payload.findByID({ collection: 'job-openings', id, depth: 0, overrideAccess: true })) as JobOpening
    } catch {
      return json({ ok: false, error: 'This position no longer exists.' }, 404)
    }
    if (job.status !== 'open' || (job.closesAt && new Date(job.closesAt) < new Date())) {
      return json({ ok: false, error: 'This position is no longer accepting applications.' }, 409)
    }

    // One application per person per job
    const dupe = await payload.count({
      collection: 'applications',
      where: { and: [{ job: { equals: job.id } }, { email: { equals: data.email } }] },
      overrideAccess: true,
    })
    if (dupe.totalDocs > 0) {
      return json({ ok: false, error: 'You have already applied for this position. We will be in touch.' }, 409)
    }

    // CV file
    const file = form.get('resume')
    if (!(file instanceof File) || file.size === 0) return json({ ok: false, error: 'Please attach your CV', field: 'resume' }, 400)
    if (file.size > MAX_CV_BYTES) return json({ ok: false, error: 'CV must be 10 MB or smaller', field: 'resume' }, 400)
    const buffer = Buffer.from(await file.arrayBuffer())
    const kind = sniffFileType(buffer)
    if (!kind || !['pdf', 'docx', 'doc'].includes(kind)) {
      return json({ ok: false, error: 'CV must be a PDF or Word document', field: 'resume' }, 400)
    }

    // Screening answers
    let answers: { question: string; answer: string }[] = []
    try {
      const arr = JSON.parse(data.answers)
      if (Array.isArray(arr)) answers = arr.slice(0, 30).map((a) => ({ question: String(a.question).slice(0, 300), answer: String(a.answer ?? '').slice(0, 500) }))
    } catch {
      /* ignore */
    }
    const missingRequired = (job.screeningQuestions || []).find(
      (q) => q.required !== false && !answers.find((a) => a.question === q.question && a.answer.trim()),
    )
    if (missingRequired) return json({ ok: false, error: `Please answer: ${missingRequired.question}` }, 400)

    const resume = await payload.create({
      collection: 'resumes',
      overrideAccess: true,
      data: { candidateEmail: data.email },
      file: {
        data: buffer,
        mimetype: MIME_FOR[kind],
        name: safeFilename(`${data.firstName}-${data.lastName}-cv`, kind),
        size: buffer.length,
      },
    })

    // read the CV text now, while the file is in memory – works the same with disk or cloud storage
    const resumeText = await extractResumeTextFromBuffer(buffer, resume.filename || 'cv', MIME_FOR[kind])

    const app = await payload.create({
      collection: 'applications',
      overrideAccess: true,
      context: { publicSubmission: true },
      data: {
        job: job.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        location: data.location,
        currentTitle: data.currentTitle,
        currentEmployer: data.currentEmployer,
        yearsExperience: data.yearsExperience,
        educationLevel: data.educationLevel,
        fieldOfStudy: data.fieldOfStudy,
        noticePeriod: data.noticePeriod,
        skillsText: data.skills,
        certificationsText: data.certifications,
        languages: data.languages,
        linkedin: data.linkedin,
        expectedSalary: data.expectedSalary,
        coverLetter: data.coverLetter,
        resume: resume.id,
        resumeText: resumeText || undefined,
        screeningAnswers: answers,
        stage: 'new',
        matchBand: 'pending',
        consentAt: new Date().toISOString(),
        source: data.source,
        country: getCountry(req.headers) || undefined,
        activity: [{ at: new Date().toISOString(), event: 'Applied via website', by: 'candidate' }],
      },
    })

    void recordServerEvent(req, { name: 'job_application', path: `/careers/${job.slug}`, props: { job: job.title } })

    return json({ ok: true, reference: applicationReference(app) }, 201)
  },
}
