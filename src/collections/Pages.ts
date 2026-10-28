import type { CollectionBeforeChangeHook, CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { canEditContent, publishedOrStaff } from '@/access'
import { pageBlocks } from '@/blocks/configs'
import { hero } from '@/fields/hero'
import { seoTab } from '@/fields/seo'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { revalidateCollection, revalidateCollectionDelete } from '@/hooks/revalidateCollection'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'

/** Full URL path, including parent pages, e.g. /company/hse */
const computePath: CollectionBeforeChangeHook = async ({ data, req, originalDoc }) => {
  const slug = data.slug ?? originalDoc?.slug
  if (!slug) return data
  if (slug === 'home') {
    data.path = '/'
    return data
  }
  const parentId =
    typeof data.parent === 'object' && data.parent ? data.parent.id : (data.parent ?? originalDoc?.parent)
  let prefix = ''
  if (parentId) {
    try {
      const parent = await req.payload.findByID({
        collection: 'pages',
        id: typeof parentId === 'object' ? parentId.id : parentId,
        depth: 0,
        draft: true,
        req,
        select: { path: true, slug: true },
      })
      prefix = parent?.path && parent.path !== '/' ? parent.path : ''
    } catch {
      prefix = ''
    }
  }
  data.path = `${prefix}/${slug}`
  return data
}

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  labels: { singular: 'Page', plural: 'Pages' },
  access: {
    create: canEditContent,
    delete: canEditContent,
    read: publishedOrStaff,
    update: canEditContent,
    readVersions: canEditContent,
  },
  defaultPopulate: { title: true, slug: true, path: true },
  admin: {
    group: 'Website',
    useAsTitle: 'title',
    defaultColumns: ['title', 'path', '_status', 'updatedAt'],
    listSearchableFields: ['title', 'slug', 'path'],
    livePreview: {
      url: ({ data, locale }) =>
        generatePreviewPath({ collection: 'pages', doc: data, locale: locale?.code }),
    },
    preview: (data, { locale }) =>
      generatePreviewPath({ collection: 'pages', doc: data as { slug: string; path?: string }, locale }),
    description: 'Every page is built from reusable blocks. Drag to reorder, duplicate or remove them.',
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    {
      type: 'tabs',
      tabs: [
        { label: 'Hero', fields: [hero()] },
        {
          label: 'Content',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: pageBlocks,
              admin: { initCollapsed: true },
            },
          ],
        },
        seoTab(),
      ],
    },
    { name: 'publishedAt', type: 'date', admin: { position: 'sidebar' } },
    slugField(),
    {
      name: 'path',
      type: 'text',
      index: true,
      admin: { position: 'sidebar', readOnly: true, description: 'Generated from the slug and parent page' },
    },
  ],
  hooks: {
    beforeChange: [populatePublishedAt, computePath],
    afterChange: [revalidateCollection('pages')],
    afterDelete: [revalidateCollectionDelete('pages')],
  },
  versions: {
    drafts: { autosave: { interval: 300 }, schedulePublish: true },
    maxPerDoc: 50,
  },
}
