import type { Field, GroupField, SelectField, TextField } from 'payload'

import { iconOptions } from './icons'

export const iconField = (overrides: Partial<SelectField> = {}): SelectField =>
  ({
    name: 'icon',
    type: 'select',
    options: iconOptions,
    admin: { isClearable: true },
    ...overrides,
  }) as SelectField

/** Small mono label + heading + intro used at the top of most sections */
export const sectionHeader = (opts: { intro?: boolean } = { intro: true }): GroupField => ({
  name: 'header',
  type: 'group',
  label: 'Section heading',
  admin: { hideGutter: true },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          localized: true,
          admin: { width: '35%', description: 'Small label, e.g. "01 / OUR DIVISIONS"' },
        },
        { name: 'heading', type: 'text', localized: true, admin: { width: '65%' } },
      ],
    },
    ...((opts.intro
      ? [{ name: 'intro', type: 'textarea', localized: true }]
      : []) as Field[]),
  ],
})

export const backgroundField = (defaultValue = 'paper'): SelectField => ({
  name: 'background',
  type: 'select',
  defaultValue,
  options: [
    { label: 'Paper (light grey)', value: 'paper' },
    { label: 'White', value: 'white' },
    { label: 'Navy', value: 'navy' },
    { label: 'Deep navy', value: 'deep' },
  ],
  admin: { description: 'Section background' },
})

export const anchorField = (): TextField => ({
  name: 'anchor',
  type: 'text',
  admin: {
    description: 'Optional id so links like #scope can jump here',
  },
})
