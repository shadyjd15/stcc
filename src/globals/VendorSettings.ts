import { revalidateSite } from '@/lib/revalidate'
import type { GlobalConfig } from 'payload'

import { anyone, canManageVendors } from '@/access'
import { VENDOR_STATUSES, VENDOR_TYPES } from '@/lib/vendors/constants'

export const VENDOR_PLACEHOLDERS =
  'Placeholders: {{companyName}} {{contactName}} {{reference}} {{vendorCode}} {{status}} {{note}} {{portalUrl}} {{company}}. Blank line = new paragraph, **bold**, [link](https://…).'

export const VendorSettings: GlobalConfig = {
  slug: 'vendor-settings',
  label: 'Vendor settings',
  // The registration form needs document types & categories, so reading is public (no secrets here)
  access: { read: anyone, update: canManageVendors },
  admin: { group: 'Vendors', description: 'Required documents, categories, numbering and every email vendors receive.' },
  hooks: { afterChange: [({ doc, req }) => (revalidateSite(req.payload, { tags: ['global_vendor-settings'] }), doc)] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Required documents',
          fields: [
            {
              name: 'documentTypes',
              type: 'array',
              admin: { initCollapsed: true, components: { RowLabel: '@/admin/RowLabels#LabelRowLabel' } },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'key', type: 'text', required: true, admin: { width: '30%', description: 'Short id, e.g. cr' } },
                    { name: 'label', type: 'text', required: true, localized: true, admin: { width: '70%' } },
                  ],
                },
                { name: 'description', type: 'text', localized: true },
                {
                  type: 'row',
                  fields: [
                    { name: 'required', type: 'checkbox', defaultValue: true, admin: { width: '25%' } },
                    { name: 'requiresExpiry', type: 'checkbox', admin: { width: '25%' } },
                    { name: 'requiresNumber', type: 'checkbox', admin: { width: '25%' } },
                  ],
                },
                {
                  name: 'requiredFor',
                  type: 'select',
                  hasMany: true,
                  options: VENDOR_TYPES,
                  admin: { description: 'Only required for these vendor types (empty = everyone)' },
                },
              ],
            },
          ],
        },
        {
          label: 'Categories',
          fields: [
            {
              name: 'categories',
              type: 'array',
              admin: { description: 'Product & service categories vendors can choose from' },
              fields: [{ name: 'label', type: 'text', required: true, localized: true }],
            },
          ],
        },
        {
          label: 'Emails to vendors',
          description: VENDOR_PLACEHOLDERS,
          fields: [
            {
              name: 'statusEmails',
              type: 'array',
              admin: { initCollapsed: true, components: { RowLabel: '@/admin/RowLabels#StatusRowLabel' } },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'status', type: 'select', required: true, options: [...VENDOR_STATUSES], admin: { width: '50%' } },
                    { name: 'enabled', type: 'checkbox', defaultValue: true, admin: { width: '50%', style: { alignSelf: 'flex-end' } } },
                  ],
                },
                { name: 'subject', type: 'text', required: true },
                { name: 'heading', type: 'text' },
                { name: 'body', type: 'textarea', required: true, admin: { rows: 6 } },
              ],
            },
            {
              name: 'expiryReminder',
              type: 'group',
              fields: [
                { name: 'enabled', type: 'checkbox', defaultValue: true },
                { name: 'daysBefore', type: 'number', defaultValue: 30 },
                { name: 'subject', type: 'text', defaultValue: 'Action needed: documents expiring soon – {{companyName}}' },
                {
                  name: 'body',
                  type: 'textarea',
                  defaultValue:
                    'Dear {{contactName}},\n\nThe documents listed below are expiring soon. To keep your approved vendor status active, please upload renewed copies in the vendor portal.\n\n[Open vendor portal]({{portalUrl}})',
                },
              ],
            },
          ],
        },
        {
          label: 'Team notifications',
          fields: [
            {
              name: 'newSubmission',
              type: 'group',
              admin: { description: 'Sent to the vendor registrations inbox (Email & notifications) when a vendor submits or re-submits.' },
              fields: [
                { name: 'subject', type: 'text', defaultValue: 'New vendor registration · {{companyName}} ({{reference}})' },
                { name: 'body', type: 'textarea', defaultValue: '**{{companyName}}** has submitted a vendor registration for review.' },
              ],
            },
          ],
        },
        {
          label: 'Numbering & validity',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'referencePrefix', type: 'text', defaultValue: 'VR', admin: { width: '33%' } },
                { name: 'vendorCodePrefix', type: 'text', defaultValue: 'STCC-V', admin: { width: '33%' } },
                { name: 'approvalValidityMonths', type: 'number', defaultValue: 24, admin: { width: '33%' } },
              ],
            },
          ],
        },
        {
          label: 'Declarations',
          fields: [
            { name: 'introText', type: 'textarea', localized: true },
            { name: 'declarationText', type: 'textarea', localized: true },
            { name: 'codeOfConduct', type: 'upload', relationTo: 'documents' },
            { name: 'hsePolicy', type: 'upload', relationTo: 'documents' },
          ],
        },
      ],
    },
  ],
}
