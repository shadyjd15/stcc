import type { CollectionConfig } from 'payload'

import { uploadsDir } from '@/utilities/uploadsDir'

import { canManageCareers, roles } from '@/access'

/** Private CV storage – files are only served to signed-in HR users. */
export const Resumes: CollectionConfig = {
  slug: 'resumes',
  labels: { singular: 'CV', plural: 'CVs' },
  access: {
    create: canManageCareers,
    read: roles('hr'),
    update: canManageCareers,
    delete: canManageCareers,
  },
  admin: { group: 'Careers', hidden: ({ user }) => !user, useAsTitle: 'filename', defaultColumns: ['filename', 'filesize', 'createdAt'] },
  fields: [{ name: 'candidateEmail', type: 'email', admin: { readOnly: true } }],
  upload: {
    staticDir: uploadsDir('private/resumes'),
    mimeTypes: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
    modifyResponseHeaders: ({ headers }) => {
      headers.set('Cache-Control', 'private, no-store')
      headers.set('X-Robots-Tag', 'noindex')
      return headers
    },
  },
}
