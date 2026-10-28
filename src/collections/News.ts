import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { canEditContent, publishedOrStaff } from '@/access'
import { seoTab } from '@/fields/seo'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { revalidateCollection, revalidateCollectionDelete } from '@/hooks/revalidateCollection'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'

export const News: CollectionConfig<'news'> = {
  slug: 'news',
  labels: { singular: 'News article', plural: 'News & insights' },
  access: { create: canEditContent, delete: canEditContent, read: publishedOrStaff, update: canEditContent },
  defaultPopulate: { title: true, slug: true, excerpt: true, coverImage: true, publishedAt: true, category: true },
  defaultSort: '-publishedAt',
  admin: {
    group: 'Website',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', '_status'],
    livePreview: {
      url: ({ data, locale }) => generatePreviewPath({ collection: 'news', doc: data, locale: locale?.code }),
    },
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Article',
          fields: [
            { name: 'excerpt', type: 'textarea', localized: true },
            { name: 'coverImage', type: 'upload', relationTo: 'media' },
            { name: 'content', type: 'richText', localized: true, required: true },
          ],
        },
        seoTab(),
      ],
    },
    {
      name: 'category',
      type: 'select',
      defaultValue: 'news',
      options: [
        { label: 'Company news', value: 'news' },
        { label: 'Project update', value: 'project' },
        { label: 'Insight', value: 'insight' },
        { label: 'HSE', value: 'hse' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'author', type: 'relationship', relationTo: 'users', admin: { position: 'sidebar' } },
    { name: 'publishedAt', type: 'date', admin: { position: 'sidebar' } },
    slugField(),
  ],
  hooks: {
    beforeChange: [populatePublishedAt],
    afterChange: [revalidateCollection('news')],
    afterDelete: [revalidateCollectionDelete('news')],
  },
  versions: { drafts: { autosave: { interval: 300 }, schedulePublish: true }, maxPerDoc: 20 },
}
