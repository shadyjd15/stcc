import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { canEditContent, publishedOrStaff } from '@/access'
import { pageBlocks } from '@/blocks/configs'
import { iconField } from '@/fields/common'
import { hero } from '@/fields/hero'
import { seoTab } from '@/fields/seo'
import { revalidateCollection, revalidateCollectionDelete } from '@/hooks/revalidateCollection'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'

export const Divisions: CollectionConfig<'divisions'> = {
  slug: 'divisions',
  labels: { singular: 'Division', plural: 'Divisions' },
  access: {
    create: canEditContent,
    delete: canEditContent,
    read: publishedOrStaff,
    update: canEditContent,
  },
  defaultPopulate: {
    title: true,
    shortTitle: true,
    slug: true,
    number: true,
    category: true,
    summary: true,
    icon: true,
    isNew: true,
    chips: true,
    order: true,
  },
  defaultSort: 'order',
  admin: {
    group: 'Website',
    useAsTitle: 'title',
    defaultColumns: ['number', 'title', 'category', 'isNew', '_status'],
    description:
      'Service divisions. They automatically appear in the menu, home page, divisions hub, quote form, vendor categories and job filters.',
    livePreview: {
      url: ({ data, locale }) =>
        generatePreviewPath({ collection: 'divisions', doc: data, locale: locale?.code }),
    },
    preview: (data, { locale }) =>
      generatePreviewPath({ collection: 'divisions', doc: data as { slug: string }, locale }),
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'title', type: 'text', required: true, localized: true, admin: { width: '60%' } },
        {
          name: 'shortTitle',
          type: 'text',
          localized: true,
          admin: { width: '40%', description: 'Used in menus and buttons, e.g. "RO & SWRO"' },
        },
      ],
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Card & listing',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'number', type: 'text', admin: { width: '20%', description: 'e.g. 01' } },
                {
                  name: 'category',
                  type: 'text',
                  localized: true,
                  admin: { width: '40%', description: 'Small label, e.g. WATER TREATMENT' },
                },
                { ...iconField(), admin: { width: '20%' } },
                {
                  name: 'isNew',
                  type: 'checkbox',
                  label: 'Show "New" badge',
                  admin: { width: '20%', style: { alignSelf: 'flex-end' } },
                },
              ],
            },
            { name: 'summary', type: 'textarea', localized: true, required: true },
            {
              name: 'chips',
              type: 'array',
              labels: { singular: 'Capability', plural: 'Capabilities' },
              admin: { description: 'Short capability tags shown on the divisions hub' },
              fields: [{ name: 'label', type: 'text', localized: true, required: true }],
            },
            {
              name: 'cardImage',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Photo shown on the divisions hub (falls back to a blueprint graphic)' },
            },
          ],
        },
        { label: 'Hero', fields: [hero({ type: 'page' })] },
        {
          label: 'Page content',
          fields: [
            { name: 'layout', type: 'blocks', blocks: pageBlocks, admin: { initCollapsed: true } },
            {
              name: 'showOtherDivisions',
              type: 'checkbox',
              defaultValue: true,
              label: 'Show "Explore other divisions" at the bottom',
            },
          ],
        },
        seoTab(),
      ],
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 10,
      admin: { position: 'sidebar', description: 'Lower numbers come first' },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidateCollection('divisions', ['/'])],
    afterDelete: [revalidateCollectionDelete('divisions', ['/'])],
  },
  versions: {
    drafts: { autosave: { interval: 300 }, schedulePublish: true },
    maxPerDoc: 30,
  },
}
