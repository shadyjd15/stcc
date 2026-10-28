import type { CollectionConfig } from 'payload'

import { anyone, canEditContent } from '@/access'
import { contentBlocks } from '@/blocks/configs'
import { revalidateSite } from '@/lib/revalidate'

export const ReusableBlocks: CollectionConfig = {
  slug: 'reusable-blocks',
  labels: { singular: 'Reusable section', plural: 'Reusable sections' },
  access: { create: canEditContent, delete: canEditContent, read: anyone, update: canEditContent },
  admin: {
    group: 'Website',
    useAsTitle: 'title',
    description:
      'Sections you use on several pages (e.g. the closing call to action). Edit here once and every page updates.',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'blocks', type: 'blocks', blocks: contentBlocks, admin: { initCollapsed: true } },
  ],
  hooks: {
    afterChange: [({ doc, req }) => (revalidateSite(req.payload, { everything: true }), doc)],
  },
}
