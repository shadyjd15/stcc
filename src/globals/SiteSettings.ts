import type { GlobalConfig } from 'payload'

import { anyone, canEditContent, fieldAdminOnly } from '@/access'
import { revalidateSite } from '@/lib/revalidate'
import { invalidateEmailSettings } from '@/lib/email/settings'
import { iconOptions } from '@/fields/icons'

const hex = (v: unknown) =>
  !v || /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(String(v)) ? true : 'Use a hex colour like #F07A2B'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site settings',
  access: { read: anyone, update: canEditContent },
  admin: { group: 'Settings', description: 'Company details, brand colours, languages and announcements.' },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'general',
          label: 'General',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'siteName', type: 'text', defaultValue: 'Sahara Technical Contracting Co.', required: true, admin: { width: '50%' } },
                { name: 'shortName', type: 'text', defaultValue: 'STCC', admin: { width: '50%' } },
              ],
            },
            { name: 'tagline', type: 'text', localized: true, defaultValue: 'Seamless Integration, Unmatched Security' },
            {
              name: 'titleTemplate',
              type: 'text',
              defaultValue: '%s | STCC',
              admin: { description: 'Browser title pattern. %s is replaced with the page title.' },
            },
            { name: 'defaultDescription', type: 'textarea', localized: true },
            {
              type: 'row',
              fields: [
                { name: 'logo', type: 'upload', relationTo: 'media', admin: { width: '33%', description: 'Optional – replaces the built-in STCC mark' } },
                { name: 'logoLight', type: 'upload', relationTo: 'media', admin: { width: '33%', description: 'Version for dark backgrounds' } },
                { name: 'ogImage', type: 'upload', relationTo: 'media', admin: { width: '33%', description: 'Default social share image (1200×630)' } },
              ],
            },
          ],
        },
        {
          name: 'company',
          label: 'Company & contact',
          fields: [
            { name: 'legalName', type: 'text', defaultValue: 'Sahara Technical Contracting Co.' },
            {
              type: 'row',
              fields: [
                { name: 'street', type: 'text', localized: true, admin: { width: '50%' } },
                { name: 'city', type: 'text', localized: true, defaultValue: 'Dammam', admin: { width: '25%' } },
                { name: 'postalCode', type: 'text', defaultValue: '32236', admin: { width: '25%' } },
              ],
            },
            { name: 'country', type: 'text', localized: true, defaultValue: 'Kingdom of Saudi Arabia' },
            {
              name: 'phones',
              type: 'array',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'label', type: 'text', localized: true, admin: { width: '40%' } },
                    { name: 'number', type: 'text', required: true, admin: { width: '60%' } },
                  ],
                },
              ],
            },
            {
              name: 'emails',
              type: 'array',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'label', type: 'text', localized: true, admin: { width: '40%' } },
                    { name: 'email', type: 'email', required: true, admin: { width: '60%' } },
                  ],
                },
              ],
            },
            { name: 'whatsapp', type: 'text', admin: { description: 'International format, e.g. 966510880876' } },
            { name: 'officeHours', type: 'text', localized: true },
            {
              type: 'row',
              fields: [
                { name: 'mapUrl', type: 'text', admin: { width: '50%', description: 'Google Maps link' } },
                { name: 'latitude', type: 'number', admin: { width: '25%' } },
                { name: 'longitude', type: 'number', admin: { width: '25%' } },
              ],
            },
            { name: 'foundingYear', type: 'number', admin: { description: 'Used for Organization structured data' } },
          ],
        },
        {
          name: 'social',
          label: 'Social',
          fields: [
            {
              name: 'profiles',
              type: 'array',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'platform',
                      type: 'select',
                      required: true,
                      options: iconOptions.filter((o) =>
                        ['linkedin', 'x', 'instagram', 'facebook', 'whatsapp', 'youtube'].includes(o.value),
                      ),
                      admin: { width: '30%' },
                    },
                    { name: 'url', type: 'text', required: true, admin: { width: '70%' } },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'theme',
          label: 'Brand colours',
          description: 'These colours are applied across the website and the emails it sends.',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'accent', type: 'text', defaultValue: '#F07A2B', validate: hex, admin: { width: '33%', components: { Field: '@/admin/ColorField#ColorField' } } },
                { name: 'navy', type: 'text', defaultValue: '#0B2545', validate: hex, admin: { width: '33%', components: { Field: '@/admin/ColorField#ColorField' } } },
                { name: 'navyDeep', type: 'text', defaultValue: '#071A33', validate: hex, admin: { width: '33%', components: { Field: '@/admin/ColorField#ColorField' } } },
              ],
            },
          ],
        },
        {
          name: 'languages',
          label: 'Languages',
          fields: [
            {
              name: 'enableArabic',
              type: 'checkbox',
              defaultValue: false,
              label: 'Publish the Arabic version of the site',
              admin: {
                description:
                  'Translate content first (switch the locale selector at the top of any document to العربية). When enabled, the language switch appears in the header and /ar URLs go live.',
              },
            },
          ],
        },
        {
          name: 'announcement',
          label: 'Announcement bar',
          fields: [
            { name: 'enabled', type: 'checkbox' },
            { name: 'text', type: 'text', localized: true },
            { name: 'linkLabel', type: 'text', localized: true },
            { name: 'linkUrl', type: 'text' },
            {
              name: 'tone',
              type: 'select',
              defaultValue: 'accent',
              options: [
                { label: 'Accent', value: 'accent' },
                { label: 'Navy', value: 'navy' },
              ],
            },
          ],
        },
        {
          name: 'code',
          label: 'Custom code',
          description: 'Administrators only. Use for verification tags or third-party widgets.',
          fields: [
            { name: 'head', type: 'code', admin: { language: 'html' }, access: { read: fieldAdminOnly, update: fieldAdminOnly } },
            { name: 'bodyEnd', type: 'code', admin: { language: 'html' }, access: { read: fieldAdminOnly, update: fieldAdminOnly } },
            {
              name: 'googleSiteVerification',
              type: 'text',
              admin: { description: 'Content value of the google-site-verification meta tag' },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      ({ doc, req }) => {
        invalidateEmailSettings()
        revalidateSite(req.payload, { everything: true, tags: ['global_site-settings'] })
        return doc
      },
    ],
  },
}
