import type { Block, Field } from 'payload'

import { anchorField, backgroundField, iconField, sectionHeader } from '@/fields/common'
import { link, linkGroup } from '@/fields/link'

const commonTail: Field[] = [anchorField()]

/* ------------------------------------------------------------------ */
/* Divisions grid                                                      */
/* ------------------------------------------------------------------ */
export const DivisionsGridBlock: Block = {
  slug: 'divisionsGrid',
  interfaceName: 'DivisionsGridBlock',
  labels: { singular: 'Divisions grid', plural: 'Divisions grids' },
  fields: [
    sectionHeader(),
    {
      type: 'row',
      fields: [
        {
          name: 'variant',
          type: 'select',
          defaultValue: 'cards',
          options: [
            { label: 'Cards (home page)', value: 'cards' },
            { label: 'Detailed rows (divisions hub)', value: 'detailed' },
            { label: 'Compact links ("explore other divisions")', value: 'compact' },
          ],
          admin: { width: '50%' },
        },
        {
          name: 'source',
          type: 'select',
          defaultValue: 'all',
          options: [
            { label: 'All published divisions', value: 'all' },
            { label: 'Hand-picked', value: 'selected' },
          ],
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'divisions',
      type: 'relationship',
      relationTo: 'divisions',
      hasMany: true,
      admin: { condition: (_, s) => s?.source === 'selected' },
    },
    {
      name: 'ctaCard',
      type: 'group',
      admin: { condition: (_, s) => s?.variant === 'cards' },
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true },
        { name: 'eyebrow', type: 'text', localized: true },
        { name: 'heading', type: 'text', localized: true },
        link({ required: false }),
      ],
    },
    backgroundField('paper'),
    ...commonTail,
  ],
}

/* ------------------------------------------------------------------ */
/* Process / timeline                                                   */
/* ------------------------------------------------------------------ */
export const ProcessStepsBlock: Block = {
  slug: 'processSteps',
  interfaceName: 'ProcessStepsBlock',
  labels: { singular: 'Process steps', plural: 'Process steps' },
  fields: [
    sectionHeader(),
    {
      type: 'row',
      fields: [
        {
          name: 'variant',
          type: 'select',
          defaultValue: 'timeline',
          options: [
            { label: 'Timeline with progress line', value: 'timeline' },
            { label: 'Cards', value: 'cards' },
            { label: 'Top-border columns', value: 'columns' },
            { label: 'Numbered tiles (large numbers)', value: 'tiles' },
          ],
          admin: { width: '50%' },
        },
        backgroundField('navy'),
      ],
    },
    {
      name: 'steps',
      type: 'array',
      minRows: 1,
      admin: { initCollapsed: true },
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'description', type: 'textarea', localized: true },
        {
          name: 'note',
          type: 'text',
          localized: true,
          admin: { description: 'Optional small line under the step, e.g. "Email sent"' },
        },
      ],
    },
    {
      name: 'sideText',
      type: 'text',
      localized: true,
      admin: { description: 'Optional mono text on the right of the heading' },
    },
    ...commonTail,
  ],
}

/* ------------------------------------------------------------------ */
/* Feature cards                                                        */
/* ------------------------------------------------------------------ */
export const FeatureCardsBlock: Block = {
  slug: 'featureCards',
  interfaceName: 'FeatureCardsBlock',
  labels: { singular: 'Feature cards', plural: 'Feature cards' },
  fields: [
    sectionHeader(),
    {
      type: 'row',
      fields: [
        {
          name: 'variant',
          type: 'select',
          defaultValue: 'icon',
          options: [
            { label: 'Icon cards', value: 'icon' },
            { label: 'Numbered cards (accent bar)', value: 'numbered' },
            { label: 'Statement cards (large text)', value: 'statement' },
            { label: 'Checklist cards', value: 'checklist' },
          ],
          admin: { width: '33%' },
        },
        {
          name: 'columns',
          type: 'select',
          defaultValue: '3',
          options: ['2', '3', '4'].map((v) => ({ label: `${v} columns`, value: v })),
          admin: { width: '33%' },
        },
        { ...backgroundField('paper'), admin: { width: '33%' } },
      ],
    },
    {
      name: 'cards',
      type: 'array',
      minRows: 1,
      admin: { initCollapsed: true },
      fields: [
        {
          type: 'row',
          fields: [
            { ...iconField(), admin: { width: '33%', isClearable: true } },
            {
              name: 'tone',
              type: 'select',
              defaultValue: 'light',
              options: [
                { label: 'Light', value: 'light' },
                { label: 'Navy', value: 'navy' },
                { label: 'Accent', value: 'accent' },
              ],
              admin: { width: '33%' },
            },
            { name: 'eyebrow', type: 'text', localized: true, admin: { width: '33%' } },
          ],
        },
        { name: 'title', type: 'text', localized: true },
        { name: 'text', type: 'textarea', localized: true },
        {
          name: 'items',
          type: 'array',
          labels: { singular: 'Bullet', plural: 'Bullets' },
          fields: [{ name: 'text', type: 'text', localized: true, required: true }],
        },
        link({ required: false, overrides: { admin: { description: 'Optional link for the whole card' } } }),
      ],
    },
    ...commonTail,
  ],
}

/* ------------------------------------------------------------------ */
/* Stats                                                               */
/* ------------------------------------------------------------------ */
export const StatsBlock: Block = {
  slug: 'stats',
  interfaceName: 'StatsBlock',
  labels: { singular: 'Stats', plural: 'Stats' },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'variant',
          type: 'select',
          defaultValue: 'bar',
          options: [
            { label: 'Divided bar', value: 'bar' },
            { label: 'Highlight words (Quality · Reliability…)', value: 'words' },
          ],
          admin: { width: '50%' },
        },
        { ...backgroundField('white'), admin: { width: '50%' } },
      ],
    },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'value', type: 'text', required: true, admin: { width: '30%', description: 'e.g. 12, 24/7, ISO' } },
            { name: 'suffix', type: 'text', admin: { width: '20%', description: 'e.g. +' } },
            { name: 'label', type: 'text', localized: true, admin: { width: '50%' } },
          ],
        },
      ],
    },
    ...commonTail,
  ],
}

/* ------------------------------------------------------------------ */
/* Logos (clients / partners)                                           */
/* ------------------------------------------------------------------ */
export const LogosBlock: Block = {
  slug: 'logos',
  interfaceName: 'LogosBlock',
  labels: { singular: 'Logo wall', plural: 'Logo walls' },
  fields: [
    sectionHeader({ intro: false }),
    {
      type: 'row',
      fields: [
        {
          name: 'source',
          type: 'select',
          defaultValue: 'client',
          options: [
            { label: 'All clients', value: 'client' },
            { label: 'All technical partners', value: 'partner' },
            { label: 'Hand-picked', value: 'selected' },
          ],
          admin: { width: '50%' },
        },
        {
          name: 'variant',
          type: 'select',
          defaultValue: 'marquee',
          options: [
            { label: 'Scrolling strip', value: 'marquee' },
            { label: 'Grid', value: 'grid' },
          ],
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'partners',
      type: 'relationship',
      relationTo: 'partners',
      hasMany: true,
      admin: { condition: (_, s) => s?.source === 'selected' },
    },
    { name: 'sideLabel', type: 'text', localized: true, admin: { description: 'e.g. "13 OEM & TECHNOLOGY PARTNERS"' } },
    backgroundField('white'),
    ...commonTail,
  ],
}

/* ------------------------------------------------------------------ */
/* Call to action                                                       */
/* ------------------------------------------------------------------ */
export const CallToActionBlock: Block = {
  slug: 'cta',
  interfaceName: 'CallToActionBlock',
  labels: { singular: 'Call to action', plural: 'Calls to action' },
  fields: [
    {
      name: 'tone',
      type: 'select',
      defaultValue: 'deep',
      options: [
        { label: 'Deep navy with grid', value: 'deep' },
        { label: 'Accent', value: 'accent' },
      ],
    },
    { name: 'eyebrow', type: 'text', localized: true },
    { name: 'heading', type: 'text', localized: true, required: true },
    { name: 'text', type: 'textarea', localized: true },
    linkGroup({ maxRows: 2 }),
    { name: 'showPhone', type: 'checkbox', label: 'Show main phone number as a second button' },
    ...commonTail,
  ],
}

/* ------------------------------------------------------------------ */
/* Rich text                                                            */
/* ------------------------------------------------------------------ */
export const ContentBlock: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  labels: { singular: 'Text', plural: 'Text' },
  fields: [
    sectionHeader({ intro: false }),
    {
      type: 'row',
      fields: [
        {
          name: 'layout',
          type: 'select',
          defaultValue: 'split',
          options: [
            { label: 'Heading left, text right', value: 'split' },
            { label: 'Single column', value: 'single' },
            { label: 'Narrow article', value: 'narrow' },
          ],
          admin: { width: '50%' },
        },
        { ...backgroundField('paper'), admin: { width: '50%' } },
      ],
    },
    { name: 'content', type: 'richText', localized: true },
    ...commonTail,
  ],
}

/* ------------------------------------------------------------------ */
/* Chips / sectors                                                      */
/* ------------------------------------------------------------------ */
export const ChipsBlock: Block = {
  slug: 'chips',
  interfaceName: 'ChipsBlock',
  labels: { singular: 'Tags / sectors', plural: 'Tags / sectors' },
  fields: [
    sectionHeader(),
    {
      type: 'row',
      fields: [
        {
          name: 'variant',
          type: 'select',
          defaultValue: 'pills',
          options: [
            { label: 'Pills', value: 'pills' },
            { label: 'Numbered rows (sectors)', value: 'rows' },
          ],
          admin: { width: '50%' },
        },
        { ...backgroundField('white'), admin: { width: '50%' } },
      ],
    },
    { name: 'listLabel', type: 'text', localized: true, admin: { description: 'Optional label above the tags' } },
    {
      name: 'items',
      type: 'array',
      fields: [{ name: 'label', type: 'text', localized: true, required: true }],
    },
    ...commonTail,
  ],
}

/* ------------------------------------------------------------------ */
/* Tabs                                                                 */
/* ------------------------------------------------------------------ */
export const TabsBlock: Block = {
  slug: 'tabs',
  interfaceName: 'TabsBlock',
  labels: { singular: 'Tabs', plural: 'Tabs' },
  fields: [
    sectionHeader(),
    {
      name: 'orientation',
      type: 'select',
      defaultValue: 'horizontal',
      options: [
        { label: 'Pills above', value: 'horizontal' },
        { label: 'List on the side', value: 'vertical' },
      ],
    },
    {
      name: 'tabs',
      type: 'array',
      minRows: 1,
      admin: { initCollapsed: true },
      fields: [
        { name: 'label', type: 'text', localized: true, required: true },
        { name: 'text', type: 'textarea', localized: true },
        {
          name: 'items',
          type: 'array',
          labels: { singular: 'Bullet', plural: 'Bullets' },
          fields: [{ name: 'text', type: 'text', localized: true, required: true }],
        },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    backgroundField('paper'),
    ...commonTail,
  ],
}

/* ------------------------------------------------------------------ */
/* Comparison table                                                     */
/* ------------------------------------------------------------------ */
export const ComparisonBlock: Block = {
  slug: 'comparison',
  interfaceName: 'ComparisonBlock',
  labels: { singular: 'Comparison table', plural: 'Comparison tables' },
  fields: [
    sectionHeader(),
    {
      type: 'row',
      fields: [
        { name: 'col1', type: 'text', localized: true, defaultValue: 'Criteria', admin: { width: '33%' } },
        { name: 'col2', type: 'text', localized: true, admin: { width: '33%' } },
        { name: 'col3', type: 'text', localized: true, admin: { width: '33%', description: 'Highlighted column' } },
      ],
    },
    {
      name: 'rows',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'label', type: 'text', localized: true, required: true, admin: { width: '33%' } },
            { name: 'a', type: 'text', localized: true, admin: { width: '33%' } },
            { name: 'b', type: 'text', localized: true, admin: { width: '33%' } },
          ],
        },
      ],
    },
    backgroundField('navy'),
    ...commonTail,
  ],
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                  */
/* ------------------------------------------------------------------ */
export const FAQBlock: Block = {
  slug: 'faq',
  interfaceName: 'FAQBlock',
  labels: { singular: 'FAQ', plural: 'FAQs' },
  fields: [
    sectionHeader(),
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      admin: { initCollapsed: true },
      fields: [
        { name: 'question', type: 'text', localized: true, required: true },
        { name: 'answer', type: 'textarea', localized: true, required: true },
      ],
    },
    {
      name: 'enableSchema',
      type: 'checkbox',
      defaultValue: true,
      label: 'Output FAQPage structured data for Google',
    },
    backgroundField('paper'),
    ...commonTail,
  ],
}

/* ------------------------------------------------------------------ */
/* Downloads                                                            */
/* ------------------------------------------------------------------ */
export const DownloadsBlock: Block = {
  slug: 'downloads',
  interfaceName: 'DownloadsBlock',
  labels: { singular: 'Downloads', plural: 'Downloads' },
  fields: [
    sectionHeader(),
    {
      name: 'documents',
      type: 'relationship',
      relationTo: 'documents',
      hasMany: true,
    },
    backgroundField('white'),
    ...commonTail,
  ],
}

/* ------------------------------------------------------------------ */
/* Team                                                                 */
/* ------------------------------------------------------------------ */
export const TeamBlock: Block = {
  slug: 'team',
  interfaceName: 'TeamBlock',
  labels: { singular: 'Team grid', plural: 'Team grids' },
  fields: [
    sectionHeader({ intro: false }),
    { name: 'members', type: 'relationship', relationTo: 'team-members', hasMany: true, admin: { description: 'Leave empty to show everyone, in their set order' } },
    backgroundField('paper'),
    ...commonTail,
  ],
}

/* ------------------------------------------------------------------ */
/* Media                                                                */
/* ------------------------------------------------------------------ */
export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  labels: { singular: 'Image / video', plural: 'Images / videos' },
  fields: [
    { name: 'media', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'size',
      type: 'select',
      defaultValue: 'contained',
      options: [
        { label: 'Contained', value: 'contained' },
        { label: 'Full width', value: 'full' },
      ],
    },
    { name: 'caption', type: 'text', localized: true },
    ...commonTail,
  ],
}

export const ImageTextBlock: Block = {
  slug: 'imageText',
  interfaceName: 'ImageTextBlock',
  labels: { singular: 'Image + text', plural: 'Image + text' },
  fields: [
    sectionHeader(),
    { name: 'media', type: 'upload', relationTo: 'media' },
    {
      type: 'row',
      fields: [
        {
          name: 'imagePosition',
          type: 'select',
          defaultValue: 'end',
          options: [
            { label: 'Image after text', value: 'end' },
            { label: 'Image before text', value: 'start' },
          ],
          admin: { width: '50%' },
        },
        { ...backgroundField('white'), admin: { width: '50%' } },
      ],
    },
    { name: 'content', type: 'richText', localized: true },
    linkGroup({ maxRows: 2 }),
    ...commonTail,
  ],
}

/* ------------------------------------------------------------------ */
/* Forms                                                                */
/* ------------------------------------------------------------------ */
export const FormBlock: Block = {
  slug: 'formBlock',
  interfaceName: 'FormBlock',
  labels: { singular: 'Form', plural: 'Forms' },
  fields: [
    { name: 'form', type: 'relationship', relationTo: 'forms', required: true },
    { name: 'heading', type: 'text', localized: true },
    { name: 'intro', type: 'textarea', localized: true },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'withContact',
      options: [
        { label: 'Form + contact details card', value: 'withContact' },
        { label: 'Centered form', value: 'centered' },
      ],
    },
    {
      name: 'overlapHero',
      type: 'checkbox',
      defaultValue: true,
      label: 'Pull the form up over the hero',
    },
    ...commonTail,
  ],
}

/* ------------------------------------------------------------------ */
/* Projects                                                             */
/* ------------------------------------------------------------------ */
export const ProjectsBlock: Block = {
  slug: 'projects',
  interfaceName: 'ProjectsBlock',
  labels: { singular: 'Projects', plural: 'Projects' },
  fields: [
    sectionHeader(),
    {
      type: 'row',
      fields: [
        {
          name: 'source',
          type: 'select',
          defaultValue: 'all',
          options: [
            { label: 'All (with filters)', value: 'all' },
            { label: 'Featured only', value: 'featured' },
            { label: 'Hand-picked', value: 'selected' },
          ],
          admin: { width: '50%' },
        },
        { name: 'limit', type: 'number', defaultValue: 9, admin: { width: '50%' } },
      ],
    },
    { name: 'projects', type: 'relationship', relationTo: 'projects', hasMany: true, admin: { condition: (_, s) => s?.source === 'selected' } },
    { name: 'showFeatured', type: 'checkbox', defaultValue: true, label: 'Show the featured case study banner' },
    backgroundField('paper'),
    ...commonTail,
  ],
}

/* ------------------------------------------------------------------ */
/* Jobs                                                                 */
/* ------------------------------------------------------------------ */
export const JobsBlock: Block = {
  slug: 'jobs',
  interfaceName: 'JobsBlock',
  labels: { singular: 'Open positions', plural: 'Open positions' },
  fields: [
    sectionHeader({ intro: false }),
    { name: 'limit', type: 'number', defaultValue: 50 },
    { name: 'showFilters', type: 'checkbox', defaultValue: true },
    { name: 'emptyText', type: 'text', localized: true, defaultValue: 'There are no open positions right now. Send us your CV below and we will contact you when a matching role opens.' },
    backgroundField('paper'),
    ...commonTail,
  ],
}

/* ------------------------------------------------------------------ */
/* List panel (IT/OT stack, pledges, perks)                              */
/* ------------------------------------------------------------------ */
export const ListPanelBlock: Block = {
  slug: 'listPanel',
  interfaceName: 'ListPanelBlock',
  labels: { singular: 'List panel', plural: 'List panels' },
  fields: [
    sectionHeader(),
    {
      type: 'row',
      fields: [
        {
          name: 'variant',
          type: 'select',
          defaultValue: 'stack',
          options: [
            { label: 'Layered stack (text left, layers right)', value: 'stack' },
            { label: 'Key / value rows', value: 'rows' },
          ],
          admin: { width: '50%' },
        },
        { ...backgroundField('navy'), admin: { width: '50%' } },
      ],
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'key', type: 'text', admin: { width: '20%', description: 'e.g. L5, 24h' } },
            { name: 'title', type: 'text', localized: true, required: true, admin: { width: '40%' } },
            { name: 'highlight', type: 'checkbox', admin: { width: '20%', style: { alignSelf: 'flex-end' } } },
          ],
        },
        { name: 'text', type: 'text', localized: true },
      ],
    },
    ...commonTail,
  ],
}

/* ------------------------------------------------------------------ */
/* Upload-your-BOM / RFQ card                                           */
/* ------------------------------------------------------------------ */
export const SearchCatalogueBlock: Block = {
  slug: 'rfqCard',
  interfaceName: 'RfqCardBlock',
  labels: { singular: 'Quote request card', plural: 'Quote request cards' },
  fields: [
    { name: 'eyebrow', type: 'text', localized: true, defaultValue: 'FAST RFQ' },
    { name: 'heading', type: 'text', localized: true, required: true },
    { name: 'text', type: 'textarea', localized: true },
    link({ required: false, overrides: { admin: { description: 'Where the card sends people (usually the quote page)' } } }),
    ...commonTail,
  ],
}

/* ------------------------------------------------------------------ */
/* Reusable section                                                     */
/* ------------------------------------------------------------------ */
export const ReusableBlock: Block = {
  slug: 'reusable',
  interfaceName: 'ReusableBlockRef',
  labels: { singular: 'Reusable section', plural: 'Reusable sections' },
  fields: [
    {
      name: 'section',
      type: 'relationship',
      relationTo: 'reusable-blocks',
      required: true,
      admin: { description: 'Edit once in "Reusable sections", update everywhere it is used.' },
    },
  ],
}

/** Blocks that can be nested inside a reusable section */
export const contentBlocks: Block[] = [
  DivisionsGridBlock,
  ProcessStepsBlock,
  FeatureCardsBlock,
  StatsBlock,
  LogosBlock,
  CallToActionBlock,
  ContentBlock,
  ChipsBlock,
  TabsBlock,
  ComparisonBlock,
  FAQBlock,
  DownloadsBlock,
  TeamBlock,
  MediaBlock,
  ImageTextBlock,
  FormBlock,
  ProjectsBlock,
  JobsBlock,
  ListPanelBlock,
  SearchCatalogueBlock,
]

/** Everything available in the page builder */
export const pageBlocks: Block[] = [...contentBlocks, ReusableBlock]
