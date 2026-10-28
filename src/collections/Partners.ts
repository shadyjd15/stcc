import type { CollectionConfig } from 'payload'

import { anyone, canEditContent } from '@/access'
import { revalidateSite } from '@/lib/revalidate'

export const Partners: CollectionConfig = {
  slug: 'partners',
  labels: { singular: 'Client / partner logo', plural: 'Clients & partners' },
  access: { create: canEditContent, delete: canEditContent, read: anyone, update: canEditContent },
  defaultSort: 'order',
  admin: {
    group: 'Website',
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'order'],
    description: 'Logos for the "Trusted by" strip and the technical partners wall.',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      type: 'row',
      fields: [
        {
          name: 'type',
          type: 'select',
          required: true,
          defaultValue: 'client',
          options: [
            { label: 'Client', value: 'client' },
            { label: 'Technical partner', value: 'partner' },
          ],
          admin: { width: '50%' },
        },
        { name: 'order', type: 'number', defaultValue: 10, admin: { width: '50%' } },
      ],
    },
    { name: 'logo', type: 'upload', relationTo: 'media', admin: { description: 'SVG or transparent PNG works best' } },
    { name: 'url', type: 'text' },
  ],
  hooks: {
    afterChange: [({ doc, req }) => (revalidateSite(req.payload, { tags: ['collection_partners'], paths: ['/'] }), doc)],
  },
}
