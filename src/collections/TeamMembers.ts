import type { CollectionConfig } from 'payload'

import { anyone, canEditContent } from '@/access'
import { revalidateSite } from '@/lib/revalidate'

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  labels: { singular: 'Team member', plural: 'Leadership team' },
  access: { create: canEditContent, delete: canEditContent, read: anyone, update: canEditContent },
  defaultSort: 'order',
  admin: { group: 'Website', useAsTitle: 'name', defaultColumns: ['name', 'role', 'order'] },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true, localized: true, admin: { width: '50%' } },
        { name: 'role', type: 'text', localized: true, admin: { width: '50%' } },
      ],
    },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    { name: 'bio', type: 'textarea', localized: true },
    { name: 'linkedin', type: 'text' },
    { name: 'order', type: 'number', defaultValue: 10, admin: { position: 'sidebar' } },
  ],
  hooks: {
    afterChange: [({ doc, req }) => (revalidateSite(req.payload, { tags: ['collection_team-members'] }), doc)],
  },
}
