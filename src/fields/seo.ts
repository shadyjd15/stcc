import type { Tab } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const seoTab = (): Tab => ({
  name: 'meta',
  label: 'SEO',
  fields: [
    OverviewField({
      titlePath: 'meta.title',
      descriptionPath: 'meta.description',
      imagePath: 'meta.image',
    }),
    MetaTitleField({ hasGenerateFn: true }),
    MetaDescriptionField({ hasGenerateFn: true }),
    MetaImageField({ relationTo: 'media' }),
    PreviewField({
      hasGenerateFn: true,
      titlePath: 'meta.title',
      descriptionPath: 'meta.description',
    }),
    {
      name: 'focusKeyword',
      type: 'text',
      localized: true,
      admin: { description: 'The search phrase this page should rank for. Used by the SEO checklist.' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'noIndex',
          type: 'checkbox',
          label: 'Hide from search engines (noindex)',
          admin: { width: '50%' },
        },
        {
          name: 'canonical',
          type: 'text',
          admin: { width: '50%', description: 'Optional canonical URL override' },
        },
      ],
    },
    {
      name: 'seoChecklist',
      type: 'ui',
      admin: { components: { Field: '@/admin/SeoChecklist#SeoChecklist' } },
    },
  ],
})
