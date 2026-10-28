import type { GlobalConfig } from 'payload'

import { anyone, canEditContent } from '@/access'
import { link } from '@/fields/link'
import { revalidateSite } from '@/lib/revalidate'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header & menu',
  access: { read: anyone, update: canEditContent },
  admin: { group: 'Settings', description: 'Top bar, main menu, dropdowns and the header button.' },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'topBar',
          label: 'Top bar',
          fields: [
            { name: 'enabled', type: 'checkbox', defaultValue: true, label: 'Show the top bar' },
            {
              name: 'showContacts',
              type: 'checkbox',
              defaultValue: true,
              label: 'Show phone numbers and email (from Site settings)',
            },
            {
              name: 'vendorButton',
              type: 'group',
              fields: [
                { name: 'enabled', type: 'checkbox', defaultValue: true, label: 'Show Vendor Registration button' },
                link({ overrides: { admin: { condition: (_, s) => Boolean(s?.enabled) } } }),
              ],
            },
            {
              name: 'extraLinks',
              type: 'array',
              maxRows: 3,
              labels: { singular: 'Extra link', plural: 'Extra links' },
              fields: [link()],
            },
          ],
        },
        {
          label: 'Main menu',
          fields: [
            {
              name: 'navItems',
              type: 'array',
              maxRows: 9,
              admin: {
                initCollapsed: true,
                components: { RowLabel: '@/admin/RowLabels#NavRowLabel' },
              },
              fields: [
                link(),
                {
                  name: 'dropdown',
                  type: 'select',
                  defaultValue: 'none',
                  options: [
                    { label: 'No dropdown', value: 'none' },
                    { label: 'Automatic: all divisions (mega menu)', value: 'divisions' },
                    { label: 'Custom links', value: 'custom' },
                  ],
                },
                {
                  name: 'children',
                  type: 'array',
                  admin: { condition: (_, s) => s?.dropdown === 'custom', initCollapsed: true },
                  fields: [
                    link(),
                    { name: 'description', type: 'text', localized: true },
                  ],
                },
                {
                  name: 'activeOn',
                  type: 'text',
                  admin: {
                    description:
                      'Optional path prefix that also highlights this item, e.g. /divisions highlights it on every division page',
                  },
                },
              ],
            },
          ],
        },
        {
          name: 'cta',
          label: 'Header button',
          fields: [
            { name: 'enabled', type: 'checkbox', defaultValue: true },
            link({ overrides: { admin: { condition: (_, s) => Boolean(s?.enabled) } } }),
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [({ doc, req }) => (revalidateSite(req.payload, { everything: true, tags: ['global_header'] }), doc)],
  },
}
