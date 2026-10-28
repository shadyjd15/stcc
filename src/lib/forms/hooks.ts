import type { CollectionConfig } from 'payload'
import { APIError } from 'payload'

import { isStaffUser } from '@/access'
import { getClientIp, getCountry, verifyTurnstile } from '@/lib/cloudflare'
import { composeEmail } from '@/lib/email/compose'
import { queueEmail } from '@/lib/email/send'
import { getEmailSettings, splitList } from '@/lib/email/settings'
import { recordServerEvent } from '@/lib/analytics/record'
import { rateLimit } from '@/lib/rateLimit'

type Submission = {
  id: string | number
  form: string | number | { id: string | number }
  submissionData?: { field: string; value: string }[]
  pagePath?: string
}

type FormDoc = {
  id: string | number
  title: string
  fields?: { name?: string; label?: string; blockType: string }[]
  notifyInbox?: 'contact' | 'quote' | 'fallback' | 'none'
  extraRecipients?: string
  autoReply?: { enabled?: boolean; subject?: string; body?: string }
  analyticsEvent?: string
}

export const formSubmissionHooks: CollectionConfig['hooks'] = {
  beforeChange: [
    async ({ data, req, operation }) => {
      if (operation !== 'create' || isStaffUser(req.user)) return data
      const ip = getClientIp(req.headers)
      if (!rateLimit(`form:${ip}`, { limit: 6, windowMs: 10 * 60_000 }).ok) {
        throw new APIError('Too many submissions. Please try again in a few minutes.', 429, null, true)
      }
      const values = (data.submissionData || []) as { field: string; value: string }[]
      if (values.some((v) => v.field === 'website' && v.value)) {
        throw new APIError('Submission rejected', 400, null, true) // honeypot
      }
      const ts = await verifyTurnstile(req.payload, data.turnstileToken, ip)
      if (!ts.ok) throw new APIError('Security check failed. Please refresh the page and try again.', 400, null, true)
      return {
        ...data,
        turnstileToken: undefined,
        submissionData: values.filter((v) => v.field !== 'website').map((v) => ({ field: v.field, value: String(v.value ?? '').slice(0, 5000) })),
        country: getCountry(req.headers) || undefined,
      }
    },
  ],
  afterChange: [
    async ({ doc, operation, req }) => {
      if (operation !== 'create') return doc
      const sub = doc as Submission
      const { payload } = req
      const formId = typeof sub.form === 'object' ? sub.form.id : sub.form
      const form = (await payload.findByID({ collection: 'forms', id: formId, depth: 0, overrideAccess: true, req })) as unknown as FormDoc
      const settings = await getEmailSettings(payload)
      const values = Object.fromEntries((sub.submissionData || []).map((v) => [v.field, v.value]))
      const labelFor = (name: string) => form.fields?.find((f) => f.name === name)?.label || name
      // File-upload answers are stored as JSON [{ id, name }]
      const files = (v: { value: string }) => {
        try {
          const arr = JSON.parse(String(v.value))
          return Array.isArray(arr) && arr.every((x) => x && typeof x === 'object' && 'id' in x) ? (arr as { id: number | string; name?: string }[]) : null
        } catch {
          return null
        }
      }
      const details = (sub.submissionData || []).map((v) => {
        const f = files(v)
        return f ? { label: labelFor(v.field), value: f.map((x) => x.name || 'file').join(', ') } : { label: labelFor(v.field), value: String(v.value) }
      })
      // Staff copy links each attachment to the (login-protected) file in the CMS
      const staffDetails = (sub.submissionData || []).map((v, i) => {
        const f = files(v)
        return f
          ? { ...details[i], links: f.map((x) => ({ label: x.name || `File ${x.id}`, url: `${settings.brand.siteUrl}/admin/collections/form-files/${x.id}` })) }
          : details[i]
      })
      const submitterEmail = Object.entries(values).find(([k, v]) => /email/i.test(k) && String(v).includes('@'))?.[1]
      const name = values.name || values.fullName || [values.firstName, values.lastName].filter(Boolean).join(' ') || ''

      // 1. Team notification
      const inbox = form.notifyInbox || 'contact'
      if (inbox !== 'none') {
        const to = [...(inbox === 'quote' ? settings.recipients.quote : inbox === 'fallback' ? settings.recipients.fallback : settings.recipients.contact), ...splitList(form.extraRecipients)]
        const staff = await payload.find({
          collection: 'users',
          where: { 'notifications.formSubmissions': { equals: true } },
          overrideAccess: true,
          depth: 0,
          limit: 50,
          select: { email: true },
          req,
        })
        const { subject, html } = await composeEmail(
          payload,
          { subject: `${form.title}: ${name || submitterEmail || 'new submission'}`, body: `A new **${form.title}** submission arrived from the website.` },
          {},
          {
            eyebrow: 'Website form',
            details: [...staffDetails, ...(sub.pagePath ? [{ label: 'Page', value: sub.pagePath }] : [])],
            cta: { label: 'Open in CMS', url: `${settings.brand.siteUrl}/admin/collections/form-submissions/${sub.id}` },
            footnote: submitterEmail ? 'Reply to this email to answer the sender directly.' : undefined,
          },
        )
        await queueEmail(payload, { to: [...new Set([...to, ...staff.docs.map((u) => u.email)])], subject, html, replyTo: submitterEmail, category: 'forms.notification', related: { collection: 'form-submissions', id: sub.id } }, req)
      }

      // 2. Auto-reply to the sender
      if (submitterEmail && form.autoReply?.enabled !== false) {
        const { subject, html } = await composeEmail(
          payload,
          { subject: form.autoReply?.subject || 'We received your message', body: form.autoReply?.body || 'Thank you for contacting us. We will reply shortly.' },
          { ...values, name: name || 'there' },
          { eyebrow: form.title, details, footnote: 'A copy of what you sent is included above for your records.' },
        )
        await queueEmail(payload, { to: submitterEmail, subject, html, category: 'forms.auto-reply', related: { collection: 'form-submissions', id: sub.id } }, req)
      }

      // 3. Conversion event
      void recordServerEvent(req, { name: form.analyticsEvent || 'form_submit', path: sub.pagePath || '/contact', props: { form: form.title } })
      return doc
    },
  ],
}
