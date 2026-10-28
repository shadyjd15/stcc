import type { Access, FieldAccess, PayloadRequest } from 'payload'

/**
 * Role model
 * ----------
 * admin        – everything, including users, settings and integrations
 * editor       – website content (pages, divisions, projects, media, navigation, SEO)
 * hr           – careers: job openings and applications
 * procurement  – vendor registrations and vendor documents
 * analyst      – read-only access to analytics and submissions
 */
export const ROLES = ['admin', 'editor', 'hr', 'procurement', 'analyst'] as const
export type Role = (typeof ROLES)[number]

export const ROLE_OPTIONS: { label: string; value: Role }[] = [
  { label: 'Administrator', value: 'admin' },
  { label: 'Content editor', value: 'editor' },
  { label: 'HR / Recruitment', value: 'hr' },
  { label: 'Procurement', value: 'procurement' },
  { label: 'Analyst (read-only)', value: 'analyst' },
]

type MaybeUser = PayloadRequest['user']

export const isStaffUser = (user: MaybeUser): boolean =>
  Boolean(user && (user as { collection?: string }).collection === 'users')

export const isVendorUser = (user: MaybeUser): boolean =>
  Boolean(user && (user as { collection?: string }).collection === 'vendors')

export const userHasRole = (user: MaybeUser, ...roles: Role[]): boolean => {
  if (!isStaffUser(user)) return false
  const userRoles = ((user as { roles?: Role[] }).roles || []) as Role[]
  if (userRoles.includes('admin')) return true
  return roles.some((r) => userRoles.includes(r))
}

/* ---------- collection-level access helpers ---------- */

export const anyone: Access = () => true
export const nobody: Access = () => false

export const isStaff: Access = ({ req: { user } }) => isStaffUser(user)
export const isAdmin: Access = ({ req: { user } }) => userHasRole(user)

export const roles =
  (...allowed: Role[]): Access =>
  ({ req: { user } }) =>
    userHasRole(user, ...allowed)

export const canEditContent = roles('editor')
export const canManageCareers = roles('hr')
export const canManageVendors = roles('procurement')
export const canViewAnalytics = roles('analyst', 'editor')

/** Published documents for the public, everything for content staff */
export const publishedOrStaff: Access = ({ req: { user } }) => {
  if (isStaffUser(user)) return true
  return { _status: { equals: 'published' } }
}

/* ---------- field-level access helpers ---------- */

export const fieldAdminOnly: FieldAccess = ({ req: { user } }) => userHasRole(user)
export const fieldStaffOnly: FieldAccess = ({ req: { user } }) => isStaffUser(user)
export const fieldRoles =
  (...allowed: Role[]): FieldAccess =>
  ({ req: { user } }) =>
    userHasRole(user, ...allowed)
