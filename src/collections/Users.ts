import type { CollectionConfig } from 'payload'

import { ROLE_OPTIONS, isAdmin, isStaffUser, userHasRole, fieldAdminOnly } from '@/access'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Team user', plural: 'Team users' },
  auth: {
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000,
    tokenExpiration: 60 * 60 * 8,
    cookies: { sameSite: 'Lax', secure: process.env.NODE_ENV === 'production' },
  },
  access: {
    admin: ({ req: { user } }) => isStaffUser(user),
    create: isAdmin,
    delete: isAdmin,
    read: ({ req: { user } }) => {
      if (userHasRole(user)) return true
      if (isStaffUser(user)) return { id: { equals: user!.id } }
      return false
    },
    update: ({ req: { user } }) => {
      if (userHasRole(user)) return true
      if (isStaffUser(user)) return { id: { equals: user!.id } }
      return false
    },
  },
  admin: {
    group: 'Administration',
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'roles', 'updatedAt'],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      required: true,
      defaultValue: ['editor'],
      options: ROLE_OPTIONS,
      saveToJWT: true,
      access: { update: fieldAdminOnly, create: fieldAdminOnly },
      admin: { description: 'Controls which sections of the CMS this person can see and edit.' },
    },
    { name: 'jobTitle', type: 'text' },
    {
      name: 'notifications',
      type: 'group',
      admin: { description: 'Personal email alerts (in addition to the shared inboxes in Email settings)' },
      fields: [
        { name: 'newApplications', type: 'checkbox', label: 'New job applications (HR role)' },
        { name: 'newVendors', type: 'checkbox', label: 'New vendor registrations (Procurement role)' },
        { name: 'formSubmissions', type: 'checkbox', label: 'Website form submissions' },
        { name: 'weeklyDigest', type: 'checkbox', label: 'Weekly analytics digest' },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, operation, req }) => {
        // The very first account created through /admin/create-first-user becomes an administrator
        if (operation === 'create') {
          const { totalDocs } = await req.payload.count({ collection: 'users', overrideAccess: true, req })
          if (totalDocs === 0) data.roles = ['admin']
        }
        return data
      },
    ],
  },
  timestamps: true,
}
