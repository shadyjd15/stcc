import type { CollectionConfig } from 'payload'

import { canManageCareers, fieldRoles, roles } from '@/access'
import { EDUCATION_LEVELS } from './JobOpenings'
import { logApplicationActivity, onApplicationChange } from '@/lib/careers/hooks'

export const STAGES = [
  { label: 'New', value: 'new' },
  { label: 'Reviewing', value: 'reviewing' },
  { label: 'Shortlisted', value: 'shortlisted' },
  { label: 'Interview', value: 'interview' },
  { label: 'Offer', value: 'offer' },
  { label: 'Hired', value: 'hired' },
  { label: 'Rejected', value: 'rejected' },
  { label: 'Withdrawn', value: 'withdrawn' },
] as const

export type Stage = (typeof STAGES)[number]['value']

export const Applications: CollectionConfig<'applications'> = {
  slug: 'applications',
  labels: { singular: 'Application', plural: 'Applications' },
  access: {
    // Public submissions go through POST /api/job-openings/:id/apply (validation, spam & file checks)
    create: canManageCareers,
    read: roles('hr', 'analyst'),
    update: canManageCareers,
    delete: canManageCareers,
  },
  defaultSort: '-createdAt',
  admin: {
    group: 'Careers',
    useAsTitle: 'candidateName',
    defaultColumns: ['candidateName', 'job', 'matchScore', 'stage', 'rating', 'createdAt'],
    listSearchableFields: ['candidateName', 'email', 'currentTitle', 'skillsText'],
    description:
      'Every application with its automatic match score. Open "Careers pipeline" in the sidebar for the ranked board view.',
    components: {
      beforeList: ['@/admin/careers/PipelineLink#PipelineLink'],
    },
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Candidate',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'firstName', type: 'text', required: true, admin: { width: '50%' } },
                { name: 'lastName', type: 'text', required: true, admin: { width: '50%' } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'email', type: 'email', required: true, index: true, admin: { width: '50%' } },
                { name: 'phone', type: 'text', admin: { width: '50%' } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'currentTitle', type: 'text', admin: { width: '33%' } },
                { name: 'currentEmployer', type: 'text', admin: { width: '33%' } },
                { name: 'location', type: 'text', admin: { width: '33%', description: 'City, country' } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'yearsExperience', type: 'number', min: 0, admin: { width: '25%' } },
                { name: 'educationLevel', type: 'select', options: EDUCATION_LEVELS, admin: { width: '25%' } },
                { name: 'fieldOfStudy', type: 'text', admin: { width: '25%' } },
                {
                  name: 'noticePeriod',
                  type: 'select',
                  options: [
                    { label: 'Immediately', value: 'immediate' },
                    { label: '2 weeks', value: '2w' },
                    { label: '1 month', value: '1m' },
                    { label: '2 months', value: '2m' },
                    { label: '3 months +', value: '3m' },
                  ],
                  admin: { width: '25%' },
                },
              ],
            },
            { name: 'skillsText', label: 'Skills (as entered)', type: 'textarea' },
            { name: 'certificationsText', label: 'Certifications (as entered)', type: 'textarea' },
            {
              type: 'row',
              fields: [
                { name: 'languages', type: 'text', admin: { width: '33%' } },
                { name: 'linkedin', type: 'text', admin: { width: '33%' } },
                {
                  name: 'expectedSalary',
                  type: 'text',
                  admin: { width: '33%' },
                  access: { read: fieldRoles('hr') },
                },
              ],
            },
            { name: 'coverLetter', type: 'textarea' },
            { name: 'resume', type: 'upload', relationTo: 'resumes' },
            {
              name: 'screeningAnswers',
              type: 'array',
              admin: { readOnly: true },
              fields: [
                { name: 'question', type: 'text' },
                { name: 'answer', type: 'text' },
                { name: 'passed', type: 'checkbox' },
              ],
            },
          ],
        },
        {
          label: 'Match analysis',
          fields: [
            {
              name: 'matchReport',
              type: 'ui',
              admin: { components: { Field: '@/admin/careers/MatchReport#MatchReport' } },
            },
            { name: 'matchBreakdown', type: 'json', admin: { readOnly: true, hidden: true } },
            { name: 'matchedSkills', type: 'text', admin: { readOnly: true } },
            { name: 'missingSkills', type: 'text', admin: { readOnly: true } },
            { name: 'aiSummary', type: 'textarea', admin: { readOnly: true } },
            { name: 'aiScore', type: 'number', admin: { readOnly: true } },
            {
              name: 'resumeText',
              type: 'textarea',
              admin: { readOnly: true, description: 'Text extracted from the CV, used for matching and search' },
              access: { read: fieldRoles('hr') },
            },
            { name: 'scoredAt', type: 'date', admin: { readOnly: true } },
          ],
        },
        {
          label: 'Notes & activity',
          fields: [
            {
              name: 'notes',
              type: 'array',
              admin: { initCollapsed: false },
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
              name: 'activity',
              type: 'array',
              admin: { readOnly: true, initCollapsed: true },
              fields: [
                { name: 'at', type: 'date' },
                { name: 'event', type: 'text' },
                { name: 'by', type: 'text' },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'source', type: 'text', admin: { width: '50%', readOnly: true, description: 'Referrer / campaign' } },
                { name: 'country', type: 'text', admin: { width: '50%', readOnly: true } },
              ],
            },
            { name: 'consentAt', type: 'date', admin: { readOnly: true } },
          ],
        },
      ],
    },
    /* ---------------- sidebar ---------------- */
    {
      name: 'job',
      type: 'relationship',
      relationTo: 'job-openings',
      required: true,
      index: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'stage',
      type: 'select',
      defaultValue: 'new',
      index: true,
      options: [...STAGES],
      admin: { position: 'sidebar' },
    },
    {
      name: 'rejectionReason',
      type: 'select',
      options: [
        { label: 'Not enough experience', value: 'experience' },
        { label: 'Missing required skills/certifications', value: 'skills' },
        { label: 'Failed screening question', value: 'screening' },
        { label: 'Position filled', value: 'filled' },
        { label: 'Other', value: 'other' },
      ],
      admin: { position: 'sidebar', condition: (d) => d?.stage === 'rejected' },
    },
    {
      name: 'sendStageEmail',
      type: 'checkbox',
      defaultValue: true,
      label: 'Email the candidate when the stage changes',
      admin: { position: 'sidebar' },
      hooks: { afterRead: [() => true] },
    },
    {
      name: 'matchScore',
      type: 'number',
      index: true,
      min: 0,
      max: 100,
      admin: {
        position: 'sidebar',
        readOnly: true,
        components: { Cell: '@/admin/careers/ScoreCell#ScoreCell' },
      },
    },
    {
      name: 'matchBand',
      type: 'select',
      options: [
        { label: 'Strong match', value: 'strong' },
        { label: 'Good match', value: 'good' },
        { label: 'Partial match', value: 'fair' },
        { label: 'Low match', value: 'low' },
        { label: 'Failed knockout', value: 'knockout' },
        { label: 'Pending', value: 'pending' },
      ],
      defaultValue: 'pending',
      admin: { position: 'sidebar', readOnly: true },
    },
    {
      name: 'rating',
      type: 'select',
      options: ['1', '2', '3', '4', '5'].map((v) => ({ label: '★'.repeat(Number(v)), value: v })),
      admin: { position: 'sidebar', description: 'Your own rating' },
    },
    {
      name: 'tags',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Top pick', value: 'top' },
        { label: 'Future role', value: 'future' },
        { label: 'Saudi national', value: 'saudi' },
        { label: 'Available now', value: 'available' },
        { label: 'Referral', value: 'referral' },
        { label: 'Needs visa transfer', value: 'transfer' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'assignedTo', type: 'relationship', relationTo: 'users', admin: { position: 'sidebar' } },
    { name: 'candidateName', type: 'text', admin: { hidden: true }, index: true },
  ],
  hooks: {
    beforeChange: [
      ({ data, originalDoc, req }) => {
        const first = data.firstName ?? originalDoc?.firstName ?? ''
        const last = data.lastName ?? originalDoc?.lastName ?? ''
        data.candidateName = `${first} ${last}`.trim()
        if (Array.isArray(data.notes)) {
          data.notes = data.notes.map((n: { createdAt?: string; author?: unknown }) => ({
            ...n,
            createdAt: n.createdAt || new Date().toISOString(),
            author: n.author || req.user?.id,
          }))
        }
        return data
      },
      logApplicationActivity,
    ],
    afterChange: [onApplicationChange],
  },
}
