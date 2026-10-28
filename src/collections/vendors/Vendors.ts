import type { CollectionConfig, Field, GroupField } from 'payload'

import { fieldRoles, isVendorUser, userHasRole } from '@/access'
import { encryptedField } from '@/lib/crypto'
import { REGIONS, VENDOR_STATUSES, VENDOR_TYPES } from '@/lib/vendors/constants'
import { vendorBeforeChange, vendorAfterChange } from '@/lib/vendors/hooks'
import { vendorEndpoints } from '@/lib/vendors/endpoints'
import { vendorAuthEmail } from '@/lib/vendors/authEmails'

const staffOnly = fieldRoles('procurement')
const staffOrAnalyst = fieldRoles('procurement', 'analyst')

const contact = (name: string, label: string, required = false): GroupField => ({
  name,
  label,
  type: 'group',
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required, admin: { width: '50%' } },
        { name: 'title', type: 'text', admin: { width: '50%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'email', type: 'email', required, admin: { width: '50%' } },
        { name: 'phone', type: 'text', required, admin: { width: '50%' } },
      ],
    },
  ],
})

const workflowFields: Field[] = [
  {
    name: 'status',
    type: 'select',
    defaultValue: 'draft',
    index: true,
    options: [...VENDOR_STATUSES],
    access: { update: () => false, create: () => false },
    admin: {
      position: 'sidebar',
      readOnly: true,
      description: 'Change with the workflow buttons below so the vendor is notified.',
    },
  },
  {
    name: 'workflow',
    type: 'ui',
    admin: { position: 'sidebar', components: { Field: '@/admin/vendors/WorkflowActions#WorkflowActions' } },
  },
  { name: 'referenceNumber', type: 'text', index: true, access: { update: () => false }, admin: { position: 'sidebar', readOnly: true } },
  { name: 'vendorCode', type: 'text', index: true, access: { update: staffOnly }, admin: { position: 'sidebar', readOnly: true } },
  { name: 'submittedAt', type: 'date', access: { update: () => false }, admin: { position: 'sidebar', readOnly: true } },
  { name: 'approvedAt', type: 'date', access: { update: staffOnly }, admin: { position: 'sidebar', readOnly: true } },
  { name: 'validUntil', type: 'date', access: { update: staffOnly }, admin: { position: 'sidebar', description: 'Approval expiry' } },
  { name: 'assignedTo', type: 'relationship', relationTo: 'users', access: { read: staffOrAnalyst, update: staffOnly }, admin: { position: 'sidebar' } },
  {
    name: 'riskRating',
    type: 'select',
    options: [
      { label: 'Low', value: 'low' },
      { label: 'Medium', value: 'medium' },
      { label: 'High', value: 'high' },
    ],
    access: { read: staffOrAnalyst, update: staffOnly },
    admin: { position: 'sidebar' },
  },
  {
    name: 'performanceScore',
    type: 'number',
    min: 0,
    max: 100,
    access: { read: staffOrAnalyst, update: staffOnly },
    admin: { position: 'sidebar', description: 'Optional supplier evaluation score' },
  },
  {
    name: 'completeness',
    type: 'number',
    admin: { position: 'sidebar', readOnly: true, description: '% of required information and documents provided' },
  },
]

export const Vendors: CollectionConfig = {
  slug: 'vendors',
  labels: { singular: 'Vendor', plural: 'Vendors' },
  auth: {
    verify: {
      generateEmailSubject: () => 'Verify your email to continue your STCC vendor registration',
      generateEmailHTML: (args) => vendorAuthEmail('verify', args),
    },
    forgotPassword: {
      generateEmailSubject: () => 'Reset your STCC vendor portal password',
      generateEmailHTML: (args) => vendorAuthEmail('reset', args ?? {}),
    },
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000,
    tokenExpiration: 60 * 60 * 8,
    cookies: { sameSite: 'Lax', secure: process.env.NODE_ENV === 'production' },
  },
  access: {
    admin: () => false, // vendors use /vendor-portal, never the CMS
    create: ({ req: { user } }) => userHasRole(user, 'procurement'), // public sign-up goes through /api/vendors/register
    read: ({ req: { user } }) => {
      if (userHasRole(user, 'procurement', 'analyst')) return true
      if (isVendorUser(user)) return { id: { equals: user!.id } }
      return false
    },
    update: ({ req: { user } }) => {
      if (userHasRole(user, 'procurement')) return true
      if (isVendorUser(user)) return { id: { equals: user!.id } }
      return false
    },
    delete: ({ req: { user } }) => userHasRole(user),
  },
  admin: {
    group: 'Vendors',
    useAsTitle: 'companyName',
    defaultColumns: ['companyName', 'vendorType', 'status', 'completeness', 'submittedAt', 'vendorCode'],
    listSearchableFields: ['companyName', 'email', 'crNumber', 'vatNumber', 'referenceNumber', 'vendorCode'],
    description: 'Supplier & subcontractor registrations. Use the workflow buttons on a vendor to move it through review – the vendor is emailed at every step.',
    components: { beforeList: ['@/admin/vendors/VendorStatusSummary#VendorStatusSummary'] },
  },
  endpoints: vendorEndpoints,
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: '1 · Company',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'companyName', type: 'text', required: true, admin: { width: '50%' } },
                { name: 'companyNameAr', label: 'Company name (Arabic)', type: 'text', admin: { width: '50%', rtl: true } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'vendorType', type: 'select', options: VENDOR_TYPES, admin: { width: '33%' } },
                { name: 'yearEstablished', type: 'number', admin: { width: '33%' } },
                {
                  name: 'employees',
                  type: 'select',
                  options: ['1–10', '11–50', '51–200', '201–1000', '1000+'].map((v) => ({ label: v, value: v })),
                  admin: { width: '33%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'country', type: 'text', defaultValue: 'Saudi Arabia', admin: { width: '33%' } },
                { name: 'city', type: 'text', admin: { width: '33%' } },
                { name: 'nationalAddress', type: 'text', admin: { width: '33%', description: 'Saudi National Address short code' } },
              ],
            },
            { name: 'address', type: 'textarea' },
            {
              type: 'row',
              fields: [
                { name: 'website', type: 'text', admin: { width: '50%' } },
                { name: 'companyPhone', type: 'text', admin: { width: '50%' } },
              ],
            },
            { name: 'description', type: 'textarea', admin: { description: 'Short company overview' } },
          ],
        },
        {
          label: '2 · Contacts',
          fields: [
            contact('primaryContact', 'Primary contact', false),
            contact('salesContact', 'Sales contact'),
            contact('financeContact', 'Finance contact'),
          ],
        },
        {
          label: '3 · Legal',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'crNumber', label: 'Commercial Registration (CR) no.', type: 'text', index: true, admin: { width: '50%' } },
                { name: 'crExpiry', label: 'CR expiry date', type: 'date', admin: { width: '50%' } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'vatNumber', label: 'VAT registration no.', type: 'text', admin: { width: '50%' } },
                { name: 'chamberNumber', label: 'Chamber of Commerce no.', type: 'text', admin: { width: '50%' } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'gosiNumber', label: 'GOSI no.', type: 'text', admin: { width: '50%' } },
                {
                  name: 'nitaqat',
                  label: 'Nitaqat category',
                  type: 'select',
                  options: [
                    { label: 'Platinum', value: 'platinum' },
                    { label: 'High green', value: 'high-green' },
                    { label: 'Medium green', value: 'mid-green' },
                    { label: 'Low green', value: 'low-green' },
                    { label: 'Yellow', value: 'yellow' },
                    { label: 'Red', value: 'red' },
                    { label: 'Not applicable', value: 'na' },
                  ],
                  admin: { width: '50%' },
                },
              ],
            },
          ],
        },
        {
          label: '4 · Capabilities',
          fields: [
            { name: 'divisions', label: 'STCC divisions you can serve', type: 'relationship', relationTo: 'divisions', hasMany: true },
            {
              name: 'categories',
              type: 'text',
              hasMany: true,
              admin: { description: 'Product / service categories (chosen from Vendor settings on the registration form)' },
            },
            { name: 'brands', type: 'textarea', admin: { description: 'Brands manufactured or represented, agency agreements' } },
            { name: 'regions', type: 'select', hasMany: true, options: REGIONS },
            {
              name: 'certifications',
              type: 'select',
              hasMany: true,
              options: [
                { label: 'ISO 9001 (Quality)', value: 'iso9001' },
                { label: 'ISO 14001 (Environment)', value: 'iso14001' },
                { label: 'ISO 45001 (Health & safety)', value: 'iso45001' },
                { label: 'ISO 27001 (Information security)', value: 'iso27001' },
                { label: 'Aramco approved', value: 'aramco' },
                { label: 'SABIC approved', value: 'sabic' },
                { label: 'SEC approved', value: 'sec' },
                { label: 'Other', value: 'other' },
              ],
            },
            {
              name: 'references',
              type: 'array',
              labels: { singular: 'Reference project', plural: 'Reference projects' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'client', type: 'text', required: true, admin: { width: '33%' } },
                    { name: 'project', type: 'text', admin: { width: '33%' } },
                    { name: 'year', type: 'number', admin: { width: '33%' } },
                  ],
                },
                { name: 'contact', type: 'text', admin: { description: 'Reference contact (optional)' } },
              ],
            },
          ],
        },
        {
          label: '5 · Banking',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'turnoverBand',
                  label: 'Annual turnover (SAR)',
                  type: 'select',
                  options: ['< 1M', '1M – 5M', '5M – 20M', '20M – 100M', '100M +'].map((v) => ({ label: v, value: v })),
                  admin: { width: '50%' },
                },
                {
                  name: 'paymentTerms',
                  type: 'select',
                  options: ['Advance', '30 days', '45 days', '60 days', '90 days'].map((v) => ({ label: v, value: v })),
                  admin: { width: '50%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'bankName', type: 'text', admin: { width: '50%' } },
                { name: 'accountHolder', type: 'text', admin: { width: '50%' } },
              ],
            },
            {
              type: 'row',
              fields: [
                encryptedField('iban', {
                  label: 'IBAN',
                  admin: { width: '50%', description: 'Encrypted at rest' },
                  access: { read: ({ req: { user }, doc }) => userHasRole(user, 'procurement') || (isVendorUser(user) && user!.id === doc?.id) },
                }),
                { name: 'swift', label: 'SWIFT / BIC', type: 'text', admin: { width: '25%' } },
                { name: 'currency', type: 'text', defaultValue: 'SAR', admin: { width: '25%' } },
              ],
            },
          ],
        },
        {
          label: '6 · Documents',
          fields: [
            {
              name: 'documents',
              type: 'array',
              admin: { components: { RowLabel: '@/admin/RowLabels#VendorDocRowLabel' } },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'docType', type: 'text', required: true, admin: { width: '40%', description: 'Document type key from Vendor settings' } },
                    { name: 'file', type: 'upload', relationTo: 'vendor-documents', required: true, admin: { width: '60%' } },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'number', type: 'text', admin: { width: '33%', description: 'Certificate / registration no.' } },
                    { name: 'issueDate', type: 'date', admin: { width: '33%' } },
                    { name: 'expiryDate', type: 'date', admin: { width: '33%' } },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'reviewStatus',
                      type: 'select',
                      defaultValue: 'pending',
                      options: [
                        { label: 'Pending review', value: 'pending' },
                        { label: 'Accepted', value: 'accepted' },
                        { label: 'Rejected – please replace', value: 'rejected' },
                        { label: 'Expired', value: 'expired' },
                      ],
                      access: { update: staffOnly },
                      admin: { width: '33%' },
                    },
                    { name: 'reviewNote', type: 'text', access: { update: staffOnly }, admin: { width: '67%' } },
                  ],
                },
                { name: 'reminderSentAt', type: 'date', admin: { hidden: true } },
              ],
            },
          ],
        },
        {
          label: '7 · Declaration',
          fields: [
            { name: 'acceptCodeOfConduct', type: 'checkbox', label: 'Accepts the STCC supplier code of conduct' },
            { name: 'acceptHse', type: 'checkbox', label: 'Acknowledges the STCC HSE policy' },
            { name: 'noConflictOfInterest', type: 'checkbox', label: 'Declares no conflict of interest' },
            { name: 'conflictDetails', type: 'textarea', admin: { condition: (d) => d?.noConflictOfInterest === false } },
            {
              type: 'row',
              fields: [
                { name: 'signatoryName', type: 'text', admin: { width: '33%' } },
                { name: 'signatoryPosition', type: 'text', admin: { width: '33%' } },
                { name: 'signature', type: 'text', admin: { width: '33%', description: 'Typed full name as signature' } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'declaredAt', type: 'date', admin: { width: '50%', readOnly: true } },
                { name: 'declaredIp', type: 'text', access: { read: staffOrAnalyst }, admin: { width: '50%', readOnly: true } },
              ],
            },
          ],
        },
        {
          label: 'Review',
          fields: [
            {
              name: 'internalNotes',
              type: 'array',
              access: { read: staffOrAnalyst, update: staffOnly, create: staffOnly },
              fields: [
                { name: 'note', type: 'textarea', required: true },
                {
                  type: 'row',
                  fields: [
                    { name: 'author', type: 'relationship', relationTo: 'users', admin: { width: '50%', readOnly: true } },
                    { name: 'createdAt', type: 'date', admin: { width: '50%', readOnly: true } },
                  ],
                },
              ],
            },
            {
              name: 'statusHistory',
              type: 'array',
              access: { update: () => false, create: () => false },
              admin: { readOnly: true },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'status', type: 'select', options: [...VENDOR_STATUSES], admin: { width: '30%' } },
                    { name: 'at', type: 'date', admin: { width: '30%' } },
                    { name: 'by', type: 'text', admin: { width: '20%' } },
                    { name: 'notified', type: 'checkbox', admin: { width: '20%' } },
                  ],
                },
                { name: 'note', type: 'textarea' },
              ],
            },
          ],
        },
      ],
    },
    ...workflowFields,
  ],
  hooks: {
    beforeChange: [vendorBeforeChange],
    afterChange: [vendorAfterChange],
  },
  timestamps: true,
}
