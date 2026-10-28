import type { GlobalConfig } from 'payload'

import { anyone, canEditContent } from '@/access'
import { link } from '@/fields/link'
import { revalidateSite } from '@/lib/revalidate'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  access: { read: anyone, update: canEditContent },
  admin: { group: 'Settings' },
  fields: [
    { name: 'about', type: 'textarea', localized: true },
    {
      name: 'columns',
      type: 'array',
      maxRows: 4,
      admin: { initCollapsed: true, components: { RowLabel: '@/admin/RowLabels#TitleRowLabel' } },
      fields: [
        { name: 'title', type: 'text', localized: true, required: true },
        {
          name: 'source',
          type: 'select',
          defaultValue: 'custom',
          options: [
            { label: 'Custom links', value: 'custom' },
            { label: 'Automatic: all divisions', value: 'divisions' },
          ],
        },
        {
          name: 'links',
          type: 'array',
          admin: { condition: (_, s) => s?.source !== 'divisions', initCollapsed: true },
          fields: [link()],
        },
      ],
    },
    {
      name: 'showContactColumn',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show the head office / contact column (from Site settings)',
    },
    {
      name: 'wordmark',
      type: 'text',
      localized: true,
      defaultValue: 'SAHARA TECHNICAL',
      admin: { description: 'Large outlined text across the footer. Leave empty to hide.' },
    },
    { name: 'copyright', type: 'text', localized: true, admin: { description: '{{year}} is replaced with the current year' } },
    { name: 'bottomLinks', type: 'array', maxRows: 5, fields: [link()] },
  ],
  hooks: {
    afterChange: [({ doc, req }) => (revalidateSite(req.payload, { everything: true, tags: ['global_footer'] }), doc)],
  },
}
