import type { GroupField } from 'payload'

import { linkGroup } from './link'

export const ILLUSTRATIONS = [
  { label: 'Divisions network (home)', value: 'network' },
  { label: 'Building blueprint (CME)', value: 'blueprint' },
  { label: 'RO membrane', value: 'membrane' },
  { label: 'MBBR reactor', value: 'reactor' },
  { label: 'Valve drawing (materials)', value: 'valve' },
  { label: 'HVAC schematic', value: 'hvac' },
  { label: 'IT terminal', value: 'terminal' },
] as const

export const hero = (defaults: { type?: string } = {}): GroupField => ({
  name: 'hero',
  type: 'group',
  label: false,
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'type',
          type: 'select',
          defaultValue: defaults.type || 'page',
          options: [
            { label: 'Home (with stats strip)', value: 'home' },
            { label: 'Page hero', value: 'page' },
            { label: 'Centered (forms)', value: 'centered' },
            { label: 'None', value: 'none' },
          ],
          admin: { width: '33%' },
        },
        {
          name: 'visual',
          type: 'select',
          defaultValue: 'none',
          options: [
            { label: 'None (text only)', value: 'none' },
            { label: 'Text on the right', value: 'sideText' },
            { label: 'Illustration', value: 'illustration' },
            { label: 'Image', value: 'image' },
            { label: 'Highlights panel', value: 'panel' },
            { label: 'Stat tiles', value: 'tiles' },
            { label: 'Wide image under the heading', value: 'wideImage' },
          ],
          admin: { width: '33%', condition: (_, s) => s?.type !== 'none' },
        },
        {
          name: 'pattern',
          type: 'select',
          defaultValue: 'grid',
          options: [
            { label: 'Blueprint grid', value: 'grid' },
            { label: 'Dots', value: 'dots' },
          ],
          admin: { width: '33%', condition: (_, s) => s?.type !== 'none' },
        },
      ],
    },
    {
      name: 'eyebrow',
      type: 'text',
      localized: true,
      admin: { condition: (_, s) => s?.type !== 'none' },
    },
    {
      name: 'heading',
      type: 'textarea',
      localized: true,
      admin: {
        condition: (_, s) => s?.type !== 'none',
        description: 'Wrap words in *asterisks* to colour them with the accent. New lines are kept.',
        rows: 2,
      },
    },
    {
      name: 'text',
      type: 'textarea',
      localized: true,
      admin: { condition: (_, s) => s?.type !== 'none' },
    },
    { ...linkGroup({ maxRows: 2 }), admin: { condition: (_, s) => s?.type !== 'none' } },
    {
      name: 'illustration',
      type: 'select',
      options: ILLUSTRATIONS.map((i) => ({ ...i })),
      admin: { condition: (_, s) => s?.visual === 'illustration' },
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      admin: { condition: (_, s) => s?.visual === 'image' || s?.visual === 'wideImage' },
    },
    {
      name: 'panel',
      type: 'group',
      admin: { condition: (_, s) => s?.visual === 'panel' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'title', type: 'text', localized: true, admin: { width: '50%' } },
            { name: 'badge', type: 'text', localized: true, admin: { width: '50%' } },
          ],
        },
        {
          name: 'items',
          type: 'array',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'key', type: 'text', admin: { width: '25%' } },
                { name: 'title', type: 'text', localized: true, admin: { width: '75%' } },
              ],
            },
            { name: 'text', type: 'text', localized: true },
          ],
        },
      ],
    },
    {
      name: 'tiles',
      type: 'array',
      maxRows: 4,
      admin: { condition: (_, s) => s?.visual === 'tiles' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'value', type: 'text', required: true, admin: { width: '30%' } },
            { name: 'label', type: 'text', localized: true, admin: { width: '50%' } },
            { name: 'highlight', type: 'checkbox', admin: { width: '20%', style: { alignSelf: 'flex-end' } } },
          ],
        },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      maxRows: 4,
      admin: {
        condition: (_, s) => s?.type === 'home',
        description: 'Strip of numbers along the bottom of the home hero',
      },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'value', type: 'text', required: true, admin: { width: '30%' } },
            { name: 'suffix', type: 'text', admin: { width: '20%' } },
            { name: 'label', type: 'text', localized: true, admin: { width: '50%' } },
          ],
        },
      ],
    },
    {
      name: 'showDivisionLinks',
      type: 'checkbox',
      label: 'Show jump links to every division under the hero',
      admin: { condition: (_, s) => s?.type === 'page' },
    },
  ],
})
