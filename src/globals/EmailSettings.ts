import type { GlobalConfig } from 'payload'

import { isAdmin, roles } from '@/access'
import { secretField } from '@/lib/crypto'
import { invalidateEmailSettings } from '@/lib/email/settings'
import { resetTransport } from '@/lib/email/send'

const recipients = (name: string, label: string, description: string) => ({
  name,
  label,
  type: 'array' as const,
  admin: { description },
  labels: { singular: 'Recipient', plural: 'Recipients' },
  fields: [{ name: 'email', type: 'email' as const, required: true }],
})

export const EmailSettings: GlobalConfig = {
  slug: 'email-settings',
  label: 'Email & notifications',
  access: { read: roles('hr', 'procurement'), update: isAdmin },
  admin: {
    group: 'Settings',
    description:
      'Outgoing mail server, and which inboxes receive each kind of notification. Every email the site sends is recorded in Email log.',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'smtp',
          label: 'Mail server',
          fields: [
            {
              name: 'enabled',
              type: 'checkbox',
              defaultValue: true,
              label: 'Send emails',
              admin: { description: 'Untick to pause all outgoing mail (emails are still written to the log).' },
            },
            {
              type: 'row',
              fields: [
                { name: 'host', type: 'text', admin: { width: '50%', placeholder: 'smtp.office365.com' } },
                { name: 'port', type: 'number', defaultValue: 587, admin: { width: '20%' } },
                {
                  name: 'security',
                  type: 'select',
                  defaultValue: 'starttls',
                  options: [
                    { label: 'STARTTLS (587)', value: 'starttls' },
                    { label: 'SSL/TLS (465)', value: 'ssl' },
                    { label: 'None', value: 'none' },
                  ],
                  admin: { width: '30%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'username', type: 'text', admin: { width: '50%' } },
                secretField('password', { admin: { width: '50%' } }),
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'fromName', type: 'text', defaultValue: 'STCC', admin: { width: '33%' } },
                { name: 'fromAddress', type: 'email', admin: { width: '33%', placeholder: 'no-reply@stcc.sa' } },
                { name: 'replyTo', type: 'email', admin: { width: '33%' } },
              ],
            },
            {
              name: 'testEmail',
              type: 'ui',
              admin: { components: { Field: '@/admin/TestEmailButton#TestEmailButton' } },
            },
          ],
        },
        {
          name: 'routing',
          label: 'Notification inboxes',
          description: 'Who receives each kind of notification. Leave a list empty to use the fallback inbox.',
          fields: [
            recipients('contactRecipients', 'Contact form', 'Messages from the Contact page.'),
            recipients('quoteRecipients', 'Quote requests', 'Project briefs from the Request a Quote form.'),
            recipients('careersRecipients', 'Job applications', 'New applications (a job can also have its own recipients).'),
            recipients('vendorRecipients', 'Vendor registrations', 'New and re-submitted vendor registrations.'),
            recipients('fallbackRecipients', 'Fallback inbox', 'Used when a list above is empty.'),
          ],
        },
        {
          name: 'branding',
          label: 'Email branding',
          fields: [
            {
              name: 'footerText',
              type: 'text',
              admin: { description: 'Shown at the bottom of every email' },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      ({ doc }) => {
        invalidateEmailSettings()
        resetTransport()
        return doc
      },
    ],
  },
}
