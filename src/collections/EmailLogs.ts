import type { CollectionConfig, Endpoint } from 'payload'

import { isStaffUser, userHasRole } from '@/access'
import { deliverEmail } from '@/lib/email/send'
import { json } from '@/lib/publicGuard'

const resend: Endpoint = {
  path: '/:id/resend',
  method: 'post',
  handler: async (req) => {
    if (!userHasRole(req.user)) return json({ ok: false, error: 'Forbidden' }, 403)
    const log = await req.payload.findByID({ collection: 'email-logs', id: req.routeParams!.id as string, overrideAccess: true })
    const res = await deliverEmail(req.payload, {
      to: String(log.to).split(',').map((s) => s.trim()),
      subject: log.subject,
      html: log.html || '',
      category: `${log.category || 'general'}.resend`,
    })
    return json(res, res.ok ? 200 : 500)
  },
}

export const EmailLogs: CollectionConfig = {
  slug: 'email-logs',
  labels: { singular: 'Email log entry', plural: 'Email log' },
  access: {
    create: () => false,
    update: () => false,
    delete: ({ req: { user } }) => userHasRole(user),
    read: ({ req: { user } }) => {
      if (userHasRole(user)) return true
      if (!isStaffUser(user)) return false
      const or = []
      if (userHasRole(user, 'hr')) or.push({ category: { like: 'careers' } })
      if (userHasRole(user, 'procurement')) or.push({ category: { like: 'vendors' } })
      if (userHasRole(user, 'editor')) or.push({ category: { like: 'forms' } })
      return or.length ? { or } : false
    },
  },
  admin: {
    group: 'Administration',
    useAsTitle: 'subject',
    defaultColumns: ['subject', 'to', 'category', 'status', 'createdAt'],
    description: 'Every email the website sends, with delivery status. Open an entry to preview or resend it.',
  },
  defaultSort: '-createdAt',
  endpoints: [resend],
  fields: [
    { name: 'subject', type: 'text', required: true },
    {
      type: 'row',
      fields: [
        { name: 'to', type: 'text', admin: { width: '50%' } },
        { name: 'cc', type: 'text', admin: { width: '50%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'category', type: 'text', index: true, admin: { width: '33%' } },
        {
          name: 'status',
          type: 'select',
          index: true,
          options: [
            { label: 'Sent', value: 'sent' },
            { label: 'Failed', value: 'failed' },
            { label: 'Logged only (SMTP off)', value: 'logged' },
          ],
          admin: { width: '33%' },
        },
        { name: 'messageId', type: 'text', admin: { width: '33%' } },
      ],
    },
    { name: 'error', type: 'textarea', admin: { condition: (d) => Boolean(d?.error) } },
    {
      type: 'row',
      fields: [
        { name: 'relatedCollection', type: 'text', admin: { width: '50%' } },
        { name: 'relatedId', type: 'text', admin: { width: '50%' } },
      ],
    },
    { name: 'preview', type: 'ui', admin: { components: { Field: '@/admin/EmailPreview#EmailPreview' } } },
    { name: 'html', type: 'code', admin: { language: 'html', hidden: true } },
  ],
}
