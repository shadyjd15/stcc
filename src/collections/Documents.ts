import type { CollectionConfig } from 'payload'

import { uploadsDir } from '@/utilities/uploadsDir'

import { anyone, canEditContent } from '@/access'

/** Public downloads: HSE policy, quality policy, company profile, brochures */
export const Documents: CollectionConfig = {
  slug: 'documents',
  labels: { singular: 'Download', plural: 'Downloads' },
  access: { create: canEditContent, delete: canEditContent, read: anyone, update: canEditContent },
  admin: {
    group: 'Website',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'revision', 'updatedAt'],
    description: 'Public files such as policies and the company profile. Downloads are tracked in Analytics.',
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'description', type: 'text', localized: true },
    {
      type: 'row',
      fields: [
        {
          name: 'category',
          type: 'select',
          options: [
            { label: 'Policy', value: 'policy' },
            { label: 'Certificate', value: 'certificate' },
            { label: 'Company profile', value: 'profile' },
            { label: 'Brochure / catalogue', value: 'brochure' },
            { label: 'Other', value: 'other' },
          ],
          admin: { width: '50%' },
        },
        { name: 'revision', type: 'text', admin: { width: '50%', description: 'e.g. Rev 3 · Jan 2026' } },
      ],
    },
  ],
  upload: {
    staticDir: uploadsDir('documents'),
    mimeTypes: ['application/pdf', 'image/*', 'application/vnd.openxmlformats-officedocument.*'],
    modifyResponseHeaders: ({ headers }) => {
      headers.set('Cache-Control', 'public, max-age=86400')
      return headers
    },
  },
}
