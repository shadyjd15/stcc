/* eslint-disable @typescript-eslint/no-explicit-any */
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { searchPlugin } from '@payloadcms/plugin-search'
import { seoPlugin } from '@payloadcms/plugin-seo'
import type { GenerateDescription, GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import type { Plugin } from 'payload'

import { canEditContent, roles } from '@/access'
import { formSubmissionHooks } from '@/lib/forms/hooks'
import { revalidateSite } from '@/lib/revalidate'
import { lexicalToText } from '@/utilities/lexicalToText'
import { docPath } from '@/utilities/paths'

const siteUrl = () => (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000').replace(/\/$/, '')

const generateTitle: GenerateTitle = ({ doc }) => (doc?.title ? `${doc.title}` : 'STCC')

const generateDescription: GenerateDescription = ({ doc }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const d = doc as any
  const text = d?.summary || d?.excerpt || d?.hero?.text || lexicalToText(d?.content) || lexicalToText(d?.description) || ''
  return String(text).replace(/\s+/g, ' ').slice(0, 155)
}

const generateURL: GenerateURL = ({ doc, collectionSlug }) =>
  `${siteUrl()}${docPath(collectionSlug || 'pages', doc as { slug?: string; path?: string })}`

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages', 'divisions', 'projects', 'news', 'job-openings'],
    redirectTypes: ['301', '302'],
    overrides: {
      access: { read: () => true, create: canEditContent, update: canEditContent, delete: canEditContent },
      admin: {
        group: 'Website',
        description: 'Send old URLs (e.g. /index.php/about/) to their new home. Changes go live immediately.',
      },
      hooks: {
        afterChange: [({ doc, req }) => (revalidateSite(req.payload, { tags: ['redirects'] }), doc)],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['pages'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({ generateTitle, generateDescription, generateURL }),
  formBuilderPlugin({
    fields: {
      payment: false,
      state: false,
      country: true,
      // custom field blocks (cast: the plugin merges any object into its block list)
      choices: {
        slug: 'choices',
        labels: { singular: 'Choice buttons', plural: 'Choice buttons' },
        fields: [
          {
            type: 'row',
            fields: [
              { name: 'name', type: 'text', required: true, admin: { width: '50%' } },
              { name: 'label', type: 'text', localized: true, admin: { width: '50%' } },
            ],
          },
          {
            type: 'row',
            fields: [
              { name: 'width', type: 'number', admin: { width: '33%' } },
              { name: 'required', type: 'checkbox', admin: { width: '33%' } },
              { name: 'multiple', type: 'checkbox', defaultValue: true, label: 'Allow several', admin: { width: '33%' } },
            ],
          },
          {
            name: 'source',
            type: 'select',
            defaultValue: 'divisions',
            options: [
              { label: 'All divisions (automatic)', value: 'divisions' },
              { label: 'Custom options', value: 'custom' },
            ],
          },
          {
            name: 'options',
            type: 'array',
            admin: { condition: (_: unknown, s: any) => s?.source === 'custom' },
            fields: [
              {
                type: 'row',
                fields: [
                  { name: 'label', type: 'text', localized: true, required: true, admin: { width: '50%' } },
                  { name: 'value', type: 'text', required: true, admin: { width: '50%' } },
                ],
              },
            ],
          },
        ],
      } as any,
      fileUpload: {
        slug: 'fileUpload',
        labels: { singular: 'File upload', plural: 'File uploads' },
        fields: [
          {
            type: 'row',
            fields: [
              { name: 'name', type: 'text', required: true, admin: { width: '50%' } },
              { name: 'label', type: 'text', localized: true, admin: { width: '50%' } },
            ],
          },
          {
            type: 'row',
            fields: [
              { name: 'width', type: 'number', admin: { width: '33%' } },
              { name: 'required', type: 'checkbox', admin: { width: '33%' } },
              { name: 'maxFiles', type: 'number', defaultValue: 5, admin: { width: '33%' } },
            ],
          },
          { name: 'hint', type: 'text', localized: true, defaultValue: 'PDF, Word, Excel, CSV or images · up to 15 MB each' },
        ],
      } as any,
    },
    defaultToEmail: 'sales@stcc.sa',
    formOverrides: {
      admin: { group: 'Website', description: 'Forms used on the website. Submissions appear under Form submissions.' },
      access: { read: () => true, create: canEditContent, update: canEditContent, delete: canEditContent },
      hooks: {
        afterChange: [({ doc, req }) => (revalidateSite(req.payload, { everything: true, tags: ['collection_forms'] }), doc)],
      },
      fields: ({ defaultFields }) => [
        // Notification routing replaces the plugin's per-form email list
        ...defaultFields.filter((f) => !('name' in f && f.name === 'emails')),
        {
          name: 'multiStep',
          type: 'checkbox',
          label: 'Multi-step form: every "Message" block starts a new step (its text is the step title)',
        },
        {
          type: 'collapsible',
          label: 'Notifications & tracking',
          fields: [
            {
              name: 'notifyInbox',
              type: 'select',
              defaultValue: 'contact',
              options: [
                { label: 'Contact inbox', value: 'contact' },
                { label: 'Quote requests inbox', value: 'quote' },
                { label: 'Fallback inbox', value: 'fallback' },
                { label: 'Do not notify', value: 'none' },
              ],
              admin: { description: 'Inboxes are set in Settings → Email & notifications' },
            },
            {
              name: 'extraRecipients',
              type: 'text',
              admin: { description: 'Additional emails for this form only, comma separated' },
            },
            {
              name: 'autoReply',
              type: 'group',
              fields: [
                { name: 'enabled', type: 'checkbox', defaultValue: true, label: 'Send a confirmation to the person who submitted' },
                { name: 'subject', type: 'text', defaultValue: 'We received your message' },
                {
                  name: 'body',
                  type: 'textarea',
                  defaultValue:
                    'Dear {{name}},\n\nThank you for contacting {{company}}. An engineer from our team will reply within 24 hours.\n\nFor urgent matters call +966 51 088 0876.',
                  admin: { description: 'Use {{fieldName}} for any form field, plus {{company}}' },
                },
              ],
            },
            {
              name: 'analyticsEvent',
              type: 'select',
              defaultValue: 'form_submit',
              options: [
                { label: 'Contact enquiry (form_submit)', value: 'form_submit' },
                { label: 'Quote request (quote_request)', value: 'quote_request' },
              ],
            },
          ],
        },
      ],
    },
    formSubmissionOverrides: {
      admin: { group: 'Website', defaultColumns: ['form', 'createdAt'] },
      access: { read: roles('editor', 'analyst'), update: () => false, delete: canEditContent },
      fields: ({ defaultFields }) => [
        ...defaultFields,
        { name: 'turnstileToken', type: 'text', admin: { hidden: true }, hooks: { afterRead: [() => undefined] } },
        { name: 'pagePath', type: 'text', admin: { readOnly: true, position: 'sidebar' } },
        { name: 'country', type: 'text', admin: { readOnly: true, position: 'sidebar' } },
        {
          name: 'status',
          type: 'select',
          defaultValue: 'new',
          options: [
            { label: 'New', value: 'new' },
            { label: 'In progress', value: 'progress' },
            { label: 'Done', value: 'done' },
            { label: 'Spam', value: 'spam' },
          ],
          admin: { position: 'sidebar' },
        },
      ],
      hooks: formSubmissionHooks,
    },
  }),
  searchPlugin({
    collections: ['pages', 'divisions', 'projects', 'news'],
    defaultPriorities: { divisions: 10, pages: 20, projects: 40, news: 50 },
    searchOverrides: {
      admin: { group: 'Administration', hidden: true },
      fields: ({ defaultFields }) => [
        ...defaultFields,
        { name: 'url', type: 'text', admin: { readOnly: true } },
        { name: 'excerpt', type: 'textarea', admin: { readOnly: true } },
      ],
    },
    beforeSync: ({ originalDoc, searchDoc }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const d = originalDoc as any
      const collection = searchDoc.doc.relationTo
      return {
        ...searchDoc,
        url: docPath(collection, d),
        excerpt: String(d?.meta?.description || d?.summary || d?.excerpt || d?.hero?.text || '').slice(0, 240),
      }
    },
  }),
]
