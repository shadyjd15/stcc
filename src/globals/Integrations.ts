import type { GlobalConfig } from 'payload'

import { isAdmin } from '@/access'
import { invalidateCloudflareSettings } from '@/lib/cloudflare'
import { secretField } from '@/lib/crypto'
import { revalidateSite } from '@/lib/revalidate'

export const Integrations: GlobalConfig = {
  slug: 'integrations',
  label: 'Integrations',
  access: { read: isAdmin, update: isAdmin },
  admin: { group: 'Settings', description: 'Cloudflare, analytics and AI-assisted screening.' },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'cloudflare',
          label: 'Cloudflare',
          description:
            'Edge caching, automatic cache purge on publish, bot protection on forms (Turnstile) and edge analytics in the dashboard.',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'zoneId', type: 'text', admin: { width: '50%', description: 'Cloudflare dashboard → your domain → Overview → Zone ID' } },
                secretField('apiToken', {
                  admin: {
                    width: '50%',
                    description: 'API token with Zone → Cache Purge: Purge and Zone → Analytics: Read',
                  },
                }),
              ],
            },
            {
              name: 'purgeOnPublish',
              type: 'checkbox',
              defaultValue: true,
              label: 'Purge changed URLs from Cloudflare when content is published',
            },
            {
              name: 'purgeButton',
              type: 'ui',
              admin: { components: { Field: '@/admin/PurgeCacheButton#PurgeCacheButton' } },
            },
            {
              type: 'row',
              fields: [
                { name: 'turnstileSiteKey', type: 'text', admin: { width: '50%', description: 'Turnstile → your widget → Site key' } },
                secretField('turnstileSecretKey', { admin: { width: '50%' } }),
              ],
            },
            {
              name: 'webAnalyticsToken',
              type: 'text',
              admin: {
                description:
                  'Optional Cloudflare Web Analytics beacon token (not needed if the site is proxied through Cloudflare with Web Analytics enabled).',
              },
            },
          ],
        },
        {
          name: 'analytics',
          label: 'Analytics',
          fields: [
            {
              name: 'enabled',
              type: 'checkbox',
              defaultValue: true,
              label: 'Built-in privacy-friendly analytics (no cookies, no consent banner needed)',
            },
            {
              name: 'retentionDays',
              type: 'number',
              defaultValue: 760,
              admin: { description: 'Raw events older than this are deleted nightly (default ~25 months)' },
            },
            {
              name: 'excludedPaths',
              type: 'textarea',
              admin: { description: 'One path prefix per line to ignore, e.g. /vendor-portal' },
            },
            {
              type: 'row',
              fields: [
                { name: 'ga4Id', type: 'text', admin: { width: '50%', description: 'Optional Google Analytics 4 ID (G-XXXX). Loaded after the page is interactive.' } },
                { name: 'gtmId', type: 'text', admin: { width: '50%', description: 'Optional Google Tag Manager ID (GTM-XXXX)' } },
              ],
            },
          ],
        },
        {
          name: 'ai',
          label: 'AI screening',
          description:
            'Optional. When enabled, each job application also gets an AI-written fit summary next to the built-in match score. CV text is sent to the provider.',
          fields: [
            { name: 'enabled', type: 'checkbox', defaultValue: false },
            {
              type: 'row',
              fields: [
                {
                  name: 'provider',
                  type: 'select',
                  defaultValue: 'anthropic',
                  options: [{ label: 'Anthropic (Claude)', value: 'anthropic' }],
                  admin: { width: '30%' },
                },
                { name: 'model', type: 'text', defaultValue: 'claude-sonnet-5-5', admin: { width: '30%' } },
                secretField('apiKey', { admin: { width: '40%' } }),
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      ({ doc, req }) => {
        invalidateCloudflareSettings()
        revalidateSite(req.payload, { everything: true, tags: ['global_integrations'] })
        return doc
      },
    ],
  },
}
