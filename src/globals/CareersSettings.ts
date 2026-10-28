import { revalidateSite } from '@/lib/revalidate'
import type { Field, GlobalConfig } from 'payload'

import { canManageCareers, roles } from '@/access'

const template = (name: string, label: string, defaults: { subject: string; heading: string; body: string }, description?: string): Field => ({
  name,
  label,
  type: 'group',
  admin: { description },
  fields: [
    { name: 'enabled', type: 'checkbox', defaultValue: true },
    { name: 'subject', type: 'text', defaultValue: defaults.subject },
    { name: 'heading', type: 'text', defaultValue: defaults.heading },
    { name: 'body', type: 'textarea', defaultValue: defaults.body, admin: { rows: 8 } },
  ],
})

export const PLACEHOLDER_HELP =
  'Placeholders: {{firstName}} {{lastName}} {{jobTitle}} {{reference}} {{company}} {{stage}} {{matchScore}}. Blank line = new paragraph, **bold**, [link](https://…).'

export const CareersSettings: GlobalConfig = {
  slug: 'careers-settings',
  label: 'Careers settings',
  access: { read: roles('hr'), update: canManageCareers },
  admin: { group: 'Careers', description: 'Candidate emails, scoring weights and data retention.' },
  hooks: { afterChange: [({ doc, req }) => (revalidateSite(req.payload, { tags: ['global_careers-settings'] }), doc)] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Candidate emails',
          description: PLACEHOLDER_HELP,
          fields: [
            template('applicationReceived', 'Application received (to candidate)', {
              subject: 'We received your application for {{jobTitle}}',
              heading: 'Thank you, {{firstName}}',
              body: 'We have received your application for the **{{jobTitle}}** position at {{company}}.\n\nOur recruitment team reviews every application carefully. If your profile matches the role, we will contact you to arrange the next steps.\n\nYour reference number is **{{reference}}**.',
            }),
            {
              name: 'stageEmails',
              type: 'array',
              labels: { singular: 'Stage email', plural: 'Stage emails' },
              admin: { description: 'Sent to the candidate when you move them to a stage (you can untick "Email the candidate" per change).' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'stage',
                      type: 'select',
                      required: true,
                      options: [
                        { label: 'Reviewing', value: 'reviewing' },
                        { label: 'Shortlisted', value: 'shortlisted' },
                        { label: 'Interview', value: 'interview' },
                        { label: 'Offer', value: 'offer' },
                        { label: 'Hired', value: 'hired' },
                        { label: 'Rejected', value: 'rejected' },
                      ],
                      admin: { width: '40%' },
                    },
                    { name: 'enabled', type: 'checkbox', defaultValue: true, admin: { width: '20%', style: { alignSelf: 'flex-end' } } },
                  ],
                },
                { name: 'subject', type: 'text', required: true },
                { name: 'heading', type: 'text' },
                { name: 'body', type: 'textarea', required: true, admin: { rows: 6 } },
              ],
            },
          ],
        },
        {
          label: 'Team notifications',
          fields: [
            template(
              'newApplication',
              'New application (to HR inbox)',
              {
                subject: 'New application · {{jobTitle}} · {{matchScore}}% match',
                heading: '{{firstName}} {{lastName}} applied for {{jobTitle}}',
                body: 'A new application has been scored against the job requirements.',
              },
              'Recipients are set in Settings → Email & notifications → Job applications, plus any per-job recipients.',
            ),
            {
              name: 'notifyOnlyAbove',
              type: 'number',
              min: 0,
              max: 100,
              defaultValue: 0,
              admin: { description: 'Only email the team about applicants scoring at least this much (0 = always)' },
            },
          ],
        },
        {
          name: 'weights',
          label: 'Match scoring',
          description:
            'How much each factor counts towards the 0–100 match score. Values are relative; they do not need to add up to 100.',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'skills', type: 'number', defaultValue: 40, min: 0, admin: { width: '33%' } },
                { name: 'experience', type: 'number', defaultValue: 20, min: 0, admin: { width: '33%' } },
                { name: 'relevance', type: 'number', defaultValue: 12, min: 0, admin: { width: '33%', description: 'CV text similarity to the job' } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'certifications', type: 'number', defaultValue: 10, min: 0, admin: { width: '33%' } },
                { name: 'education', type: 'number', defaultValue: 8, min: 0, admin: { width: '33%' } },
                { name: 'screening', type: 'number', defaultValue: 10, min: 0, admin: { width: '33%' } },
              ],
            },
            {
              name: 'missingMustHavePenalty',
              type: 'number',
              defaultValue: 12,
              admin: { description: 'Points deducted for each missing must-have skill or certification' },
            },
            {
              name: 'autoRejectKnockouts',
              type: 'checkbox',
              defaultValue: false,
              label: 'Automatically move applicants who fail a knockout question to "Rejected" (no email is sent)',
            },
          ],
        },
        {
          label: 'Privacy',
          fields: [
            {
              name: 'consentText',
              type: 'textarea',
              localized: true,
              defaultValue:
                'I agree that STCC may store and process my personal data and CV for recruitment purposes, for up to 24 months.',
            },
            {
              name: 'retentionMonths',
              type: 'number',
              defaultValue: 24,
              admin: { description: 'Applications (and their CVs) older than this are deleted automatically. 0 = keep forever.' },
            },
          ],
        },
      ],
    },
  ],
}
