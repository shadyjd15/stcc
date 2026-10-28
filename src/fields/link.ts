import type { ArrayField, Field, GroupField } from 'payload'

import deepMerge from '@/utilities/deepMerge'

export const LINKABLE_COLLECTIONS = ['pages', 'divisions', 'projects', 'job-openings', 'news'] as const

export type LinkAppearance = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link'

const appearanceOptions: { label: string; value: LinkAppearance }[] = [
  { label: 'Primary (accent)', value: 'primary' },
  { label: 'Secondary (navy)', value: 'secondary' },
  { label: 'Outline', value: 'outline' },
  { label: 'Ghost', value: 'ghost' },
  { label: 'Text link', value: 'link' },
]

type LinkOptions = {
  appearances?: boolean
  disableLabel?: boolean
  name?: string
  overrides?: Partial<GroupField>
  required?: boolean
}

/**
 * A link that points at a CMS document (stays valid when slugs change)
 * or at any custom URL / anchor / mailto / tel.
 */
export const link = ({
  appearances = false,
  disableLabel = false,
  name = 'link',
  overrides = {},
  required = true,
}: LinkOptions = {}): Field => {
  const result: GroupField = {
    name,
    type: 'group',
    admin: { hideGutter: true },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'type',
            type: 'radio',
            admin: { layout: 'horizontal', width: '50%' },
            defaultValue: 'reference',
            options: [
              { label: 'Internal page', value: 'reference' },
              { label: 'Custom URL', value: 'custom' },
            ],
          },
          {
            name: 'newTab',
            type: 'checkbox',
            admin: { style: { alignSelf: 'flex-end' }, width: '50%' },
            label: 'Open in new tab',
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'reference',
            type: 'relationship',
            relationTo: [...LINKABLE_COLLECTIONS],
            label: 'Document to link to',
            required,
            maxDepth: 1,
            admin: {
              condition: (_, siblingData) => siblingData?.type !== 'custom',
              width: disableLabel ? '100%' : '50%',
            },
          },
          {
            name: 'url',
            type: 'text',
            label: 'URL',
            required,
            admin: {
              condition: (_, siblingData) => siblingData?.type === 'custom',
              description: 'e.g. /vendor-registration, https://…, mailto:…, tel:…, #section',
              width: disableLabel ? '100%' : '50%',
            },
          },
          ...(!disableLabel
            ? ([
                {
                  name: 'label',
                  type: 'text',
                  localized: true,
                  required,
                  admin: { width: '50%' },
                },
              ] as Field[])
            : []),
        ],
      },
    ],
  }

  if (appearances) {
    result.fields.push({
      name: 'appearance',
      type: 'select',
      defaultValue: 'primary',
      options: appearanceOptions,
    })
  }

  return deepMerge(result, overrides)
}

export const linkGroup = ({
  name = 'links',
  maxRows = 2,
  appearances = true,
}: { name?: string; maxRows?: number; appearances?: boolean } = {}): ArrayField => ({
  name,
  type: 'array',
  maxRows,
  admin: { initCollapsed: true },
  fields: [link({ appearances })],
})
