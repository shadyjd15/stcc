import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { canEditContent, publishedOrStaff } from '@/access'
import { seoTab } from '@/fields/seo'
import { revalidateCollection, revalidateCollectionDelete } from '@/hooks/revalidateCollection'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'

export const Projects: CollectionConfig<'projects'> = {
  slug: 'projects',
  labels: { singular: 'Project', plural: 'Projects' },
  access: {
    create: canEditContent,
    delete: canEditContent,
    read: publishedOrStaff,
    update: canEditContent,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    client: true,
    location: true,
    year: true,
    divisions: true,
    coverImage: true,
    featured: true,
  },
  defaultSort: '-year',
  admin: {
    group: 'Website',
    useAsTitle: 'title',
    defaultColumns: ['title', 'client', 'year', 'featured', '_status'],
    livePreview: {
      url: ({ data, locale }) => generatePreviewPath({ collection: 'projects', doc: data, locale: locale?.code }),
    },
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Overview',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'client', type: 'text', admin: { width: '33%' } },
                { name: 'location', type: 'text', localized: true, admin: { width: '33%' } },
                { name: 'year', type: 'number', admin: { width: '33%' } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'divisions', type: 'relationship', relationTo: 'divisions', hasMany: true, admin: { width: '50%' } },
                { name: 'value', type: 'text', admin: { width: '25%', description: 'Optional, e.g. "SAR 12M"' } },
                { name: 'duration', type: 'text', admin: { width: '25%', description: 'e.g. 14 months' } },
              ],
            },
            { name: 'coverImage', type: 'upload', relationTo: 'media' },
            { name: 'summary', type: 'textarea', localized: true },
            { name: 'challenge', type: 'textarea', localized: true },
            { name: 'solution', type: 'textarea', localized: true },
            { name: 'result', type: 'textarea', localized: true },
            {
              name: 'metrics',
              type: 'array',
              maxRows: 4,
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'value', type: 'text', required: true, admin: { width: '40%' } },
                    { name: 'label', type: 'text', localized: true, admin: { width: '60%' } },
                  ],
                },
              ],
            },
            { name: 'gallery', type: 'upload', relationTo: 'media', hasMany: true },
            { name: 'content', type: 'richText', localized: true },
          ],
        },
        seoTab(),
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      admin: { position: 'sidebar', description: 'Show as the featured case study' },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidateCollection('projects')],
    afterDelete: [revalidateCollectionDelete('projects')],
  },
  versions: { drafts: { autosave: { interval: 300 } }, maxPerDoc: 20 },
}
