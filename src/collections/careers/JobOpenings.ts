import type { Access, CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { canManageCareers, isStaffUser } from '@/access'
import { seoTab } from '@/fields/seo'
import { revalidateCollection, revalidateCollectionDelete } from '@/hooks/revalidateCollection'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { applyEndpoint } from '@/lib/careers/applyEndpoint'
import { rescoreEndpoint } from '@/lib/careers/rescoreEndpoint'

export const EDUCATION_LEVELS = [
  { label: 'No formal requirement', value: 'none' },
  { label: 'High school', value: 'highschool' },
  { label: 'Diploma / technical certificate', value: 'diploma' },
  { label: "Bachelor's degree", value: 'bachelor' },
  { label: "Master's degree", value: 'master' },
  { label: 'Doctorate', value: 'phd' },
]

export const EMPLOYMENT_TYPES = [
  { label: 'Full-time', value: 'full-time' },
  { label: 'Contract', value: 'contract' },
  { label: 'Part-time', value: 'part-time' },
  { label: 'Temporary / project', value: 'temporary' },
  { label: 'Internship', value: 'internship' },
]

const publicRead: Access = ({ req: { user } }) => {
  if (isStaffUser(user)) return true
  return { status: { in: ['open', 'closed', 'filled'] } }
}

export const JobOpenings: CollectionConfig<'job-openings'> = {
  slug: 'job-openings',
  labels: { singular: 'Job opening', plural: 'Job openings' },
  access: {
    create: canManageCareers,
    delete: canManageCareers,
    read: publicRead,
    update: canManageCareers,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    location: true,
    employmentType: true,
    division: true,
    status: true,
    postedAt: true,
    closesAt: true,
  },
  defaultSort: '-postedAt',
  admin: {
    group: 'Careers',
    useAsTitle: 'title',
    defaultColumns: ['title', 'division', 'location', 'status', 'closesAt'],
    description:
      'Open a role, define what a great candidate looks like (Matching tab), and STCC ranks every applicant against it automatically.',
    livePreview: {
      url: ({ data, locale }) => generatePreviewPath({ collection: 'job-openings', doc: data, locale: locale?.code }),
    },
  },
  endpoints: [applyEndpoint, rescoreEndpoint],
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Job details',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'division', type: 'relationship', relationTo: 'divisions', admin: { width: '33%' } },
                { name: 'department', type: 'text', localized: true, admin: { width: '33%' } },
                { name: 'location', type: 'text', localized: true, defaultValue: 'Dammam, Saudi Arabia', admin: { width: '33%' } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'employmentType', type: 'select', defaultValue: 'full-time', options: EMPLOYMENT_TYPES, admin: { width: '25%' } },
                {
                  name: 'workplace',
                  type: 'select',
                  defaultValue: 'onsite',
                  options: [
                    { label: 'On-site', value: 'onsite' },
                    { label: 'Site-based (rotating)', value: 'site' },
                    { label: 'Hybrid', value: 'hybrid' },
                    { label: 'Remote', value: 'remote' },
                  ],
                  admin: { width: '25%' },
                },
                { name: 'openings', type: 'number', defaultValue: 1, min: 1, admin: { width: '25%' } },
                { name: 'educationLevel', type: 'select', defaultValue: 'none', options: EDUCATION_LEVELS, admin: { width: '25%' } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'experienceMin', type: 'number', min: 0, label: 'Min. years experience', admin: { width: '25%' } },
                { name: 'experienceMax', type: 'number', min: 0, label: 'Max. years (optional)', admin: { width: '25%' } },
                { name: 'salaryMin', type: 'number', admin: { width: '17%' } },
                { name: 'salaryMax', type: 'number', admin: { width: '17%' } },
                { name: 'showSalary', type: 'checkbox', admin: { width: '16%', style: { alignSelf: 'flex-end' } } },
              ],
            },
            { name: 'summary', type: 'textarea', localized: true, admin: { description: 'One or two sentences shown in the job list and search results' } },
            { name: 'description', type: 'richText', localized: true },
            {
              name: 'responsibilities',
              type: 'array',
              labels: { singular: 'Responsibility', plural: 'Responsibilities' },
              fields: [{ name: 'text', type: 'text', localized: true, required: true }],
            },
            {
              name: 'requirements',
              type: 'array',
              labels: { singular: 'Requirement', plural: 'Requirements' },
              fields: [{ name: 'text', type: 'text', localized: true, required: true }],
            },
            {
              name: 'benefits',
              type: 'array',
              fields: [{ name: 'text', type: 'text', localized: true, required: true }],
            },
          ],
        },
        {
          label: 'Matching',
          description:
            'How applicants are scored. Must-have skills and knockout questions weigh most. Changes re-score every applicant for this job.',
          fields: [
            {
              name: 'skills',
              type: 'array',
              labels: { singular: 'Skill', plural: 'Skills' },
              admin: { initCollapsed: false, components: { RowLabel: '@/admin/RowLabels#SkillRowLabel' } },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'skill', type: 'text', required: true, admin: { width: '40%' } },
                    {
                      name: 'weight',
                      type: 'select',
                      defaultValue: '3',
                      options: [
                        { label: 'Nice to have', value: '1' },
                        { label: 'Useful', value: '2' },
                        { label: 'Important', value: '3' },
                        { label: 'Very important', value: '4' },
                        { label: 'Critical', value: '5' },
                      ],
                      admin: { width: '25%' },
                    },
                    { name: 'mustHave', type: 'checkbox', label: 'Must-have', admin: { width: '15%', style: { alignSelf: 'flex-end' } } },
                  ],
                },
                {
                  name: 'synonyms',
                  type: 'text',
                  admin: { description: 'Other ways candidates write it, comma separated (e.g. "QC, quality control")' },
                },
              ],
            },
            {
              name: 'certifications',
              type: 'array',
              labels: { singular: 'Certification', plural: 'Certifications' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'name', type: 'text', required: true, admin: { width: '60%' } },
                    { name: 'synonyms', type: 'text', admin: { width: '25%' } },
                    { name: 'mustHave', type: 'checkbox', admin: { width: '15%', style: { alignSelf: 'flex-end' } } },
                  ],
                },
              ],
            },
            {
              name: 'keywords',
              type: 'textarea',
              admin: { description: 'Extra terms that signal relevant experience (industries, tools, clients). Comma or line separated.' },
            },
            {
              name: 'screeningQuestions',
              type: 'array',
              admin: { initCollapsed: true },
              fields: [
                { name: 'question', type: 'text', required: true, localized: true },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'type',
                      type: 'select',
                      defaultValue: 'yesno',
                      options: [
                        { label: 'Yes / No', value: 'yesno' },
                        { label: 'Number', value: 'number' },
                        { label: 'Choice', value: 'select' },
                        { label: 'Short text', value: 'text' },
                      ],
                      admin: { width: '25%' },
                    },
                    {
                      name: 'idealAnswer',
                      type: 'text',
                      admin: {
                        width: '25%',
                        description: 'yes / no, a minimum number, the right choice, or keywords',
                      },
                    },
                    {
                      name: 'weight',
                      type: 'select',
                      defaultValue: '3',
                      options: ['1', '2', '3', '4', '5'].map((v) => ({ label: v, value: v })),
                      admin: { width: '15%' },
                    },
                    { name: 'knockout', type: 'checkbox', admin: { width: '15%', style: { alignSelf: 'flex-end' }, description: 'Wrong answer flags the applicant' } },
                    { name: 'required', type: 'checkbox', defaultValue: true, admin: { width: '20%', style: { alignSelf: 'flex-end' } } },
                  ],
                },
                {
                  name: 'options',
                  type: 'text',
                  localized: true,
                  admin: { condition: (_, s) => s?.type === 'select', description: 'Choices, comma separated' },
                },
              ],
            },
          ],
        },
        {
          label: 'Applicants',
          fields: [
            {
              name: 'ranking',
              type: 'ui',
              admin: { components: { Field: '@/admin/careers/ApplicantRanking#ApplicantRanking' } },
            },
            {
              name: 'applications',
              type: 'join',
              collection: 'applications',
              on: 'job',
              defaultSort: '-matchScore',
              defaultLimit: 25,
              admin: {
                defaultColumns: ['candidateName', 'matchScore', 'stage', 'rating', 'createdAt'],
              },
            },
          ],
        },
        {
          label: 'Notifications',
          fields: [
            {
              name: 'notifyRecipients',
              type: 'array',
              admin: { description: 'Also email these people about new applications to this job' },
              fields: [{ name: 'email', type: 'email', required: true }],
            },
            { name: 'hiringManager', type: 'relationship', relationTo: 'users' },
          ],
        },
        seoTab(),
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      required: true,
      index: true,
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Open – accepting applications', value: 'open' },
        { label: 'Paused (hidden)', value: 'paused' },
        { label: 'Closed', value: 'closed' },
        { label: 'Filled', value: 'filled' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'listed',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Untick for the hidden "General application" job that collects open CVs',
      },
    },
    { name: 'postedAt', type: 'date', admin: { position: 'sidebar' } },
    { name: 'closesAt', type: 'date', admin: { position: 'sidebar', description: 'Applications close automatically after this date' } },
    slugField(),
  ],
  hooks: {
    beforeChange: [
      ({ data, originalDoc }) => {
        if (data.status === 'open' && !data.postedAt && !originalDoc?.postedAt) data.postedAt = new Date().toISOString()
        return data
      },
    ],
    afterChange: [
      revalidateCollection('job-openings'),
      async ({ doc, previousDoc, req, operation }) => {
        if (operation !== 'update' || req.context.skipRescore) return doc
        const fingerprint = (d: typeof doc) =>
          JSON.stringify([d?.skills, d?.certifications, d?.keywords, d?.screeningQuestions, d?.experienceMin, d?.experienceMax, d?.educationLevel])
        if (fingerprint(doc) !== fingerprint(previousDoc)) {
          await req.payload.jobs.queue({ task: 'rescoreJob', input: { jobId: String(doc.id) }, req })
        }
        return doc
      },
    ],
    afterDelete: [revalidateCollectionDelete('job-openings')],
  },
}
