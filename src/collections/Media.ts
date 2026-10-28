import type { CollectionConfig } from 'payload'

import { uploadsDir } from '@/utilities/uploadsDir'

import { anyone, canEditContent, roles } from '@/access'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Media file', plural: 'Media library' },
  folders: true,
  access: {
    create: roles('editor', 'hr', 'procurement'),
    delete: canEditContent,
    read: anyone,
    update: roles('editor', 'hr', 'procurement'),
  },
  admin: {
    group: 'Website',
    description:
      'Upload images, videos and SVGs once and reuse them anywhere. Set a focal point so crops always keep the subject in frame.',
    defaultColumns: ['filename', 'alt', 'mimeType', 'filesize', 'updatedAt'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      localized: true,
      required: true,
      admin: { description: 'Describe the image for screen readers and Google Images.' },
    },
    { name: 'caption', type: 'text', localized: true },
    {
      name: 'credit',
      type: 'text',
      admin: { description: 'Photographer / source, if attribution is required' },
    },
  ],
  upload: {
    staticDir: uploadsDir('media'),
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    mimeTypes: ['image/*', 'video/mp4', 'video/webm', 'application/pdf'],
    imageSizes: [
      { name: 'thumbnail', width: 400, formatOptions: { format: 'webp', options: { quality: 80 } } },
      { name: 'card', width: 900, formatOptions: { format: 'webp', options: { quality: 80 } } },
      { name: 'hero', width: 1920, formatOptions: { format: 'webp', options: { quality: 80 } } },
      { name: 'og', width: 1200, height: 630, crop: 'center', formatOptions: { format: 'jpeg', options: { quality: 82 } } },
    ],
    resizeOptions: { width: 2560, withoutEnlargement: true },
    modifyResponseHeaders: ({ headers }) => {
      headers.set('Cache-Control', 'public, max-age=31536000, immutable')
      return headers
    },
  },
}
