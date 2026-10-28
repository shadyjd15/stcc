import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, CollectionConfig, Config } from 'payload'

import { isStaffUser, userHasRole } from '@/access'

export const AuditLogs: CollectionConfig = {
  slug: 'audit-logs',
  labels: { singular: 'Audit entry', plural: 'Audit log' },
  access: {
    create: () => false,
    update: () => false,
    delete: () => false,
    read: ({ req: { user } }) => userHasRole(user),
  },
  admin: {
    group: 'Administration',
    useAsTitle: 'summary',
    defaultColumns: ['summary', 'action', 'collectionSlug', 'userName', 'createdAt'],
    description: 'Who changed what, and when. Kept for accountability; entries cannot be edited.',
  },
  defaultSort: '-createdAt',
  fields: [
    { name: 'summary', type: 'text' },
    {
      type: 'row',
      fields: [
        {
          name: 'action',
          type: 'select',
          index: true,
          options: ['create', 'update', 'publish', 'unpublish', 'delete'].map((v) => ({ label: v, value: v })),
          admin: { width: '25%' },
        },
        { name: 'collectionSlug', type: 'text', index: true, admin: { width: '25%' } },
        { name: 'docId', type: 'text', admin: { width: '25%' } },
        { name: 'userName', type: 'text', admin: { width: '25%' } },
      ],
    },
    { name: 'changedFields', type: 'text' },
    { name: 'ip', type: 'text' },
  ],
}

const SKIP = new Set(['audit-logs', 'email-logs', 'payload-jobs', 'payload-locked-documents', 'payload-preferences', 'payload-migrations', 'search', 'form-submissions', 'payload-folders', 'payload-kv'])

const titleOf = (doc: Record<string, unknown>) =>
  String(doc.title || doc.name || doc.companyName || doc.candidateName || doc.subject || doc.filename || doc.email || doc.id)

const changed = (doc: Record<string, unknown>, prev?: Record<string, unknown>) => {
  if (!prev) return ''
  const keys = Object.keys(doc).filter(
    (k) => !['updatedAt', 'createdAt', '_status', 'id'].includes(k) && JSON.stringify(doc[k]) !== JSON.stringify(prev[k]),
  )
  return keys.slice(0, 20).join(', ')
}

/** Adds audit hooks to every collection that staff can edit */
export const withAuditLog = (config: Config): Config => {
  const afterChange: CollectionAfterChangeHook = async ({ doc, previousDoc, operation, req, collection }) => {
    if (!isStaffUser(req.user) || req.context.skipAudit) return doc
    const status = (doc as { _status?: string })._status
    const prevStatus = (previousDoc as { _status?: string } | undefined)?._status
    // ignore autosave drafts so the log stays readable
    if (operation === 'update' && status === 'draft' && prevStatus === 'draft' && req.query?.autosave === 'true') return doc
    const action =
      operation === 'create'
        ? 'create'
        : status === 'published' && prevStatus !== 'published'
          ? 'publish'
          : status === 'draft' && prevStatus === 'published'
            ? 'unpublish'
            : 'update'
    const user = req.user as { name?: string; email?: string }
    await req.payload
      .create({
        collection: 'audit-logs',
        overrideAccess: true,
        req,
        context: { skipAudit: true },
        data: {
          summary: `${user.name || user.email} ${action}d ${collection.labels?.singular || collection.slug} “${titleOf(doc)}”`.slice(0, 250),
          action,
          collectionSlug: collection.slug,
          docId: String(doc.id),
          userName: user.name || user.email,
          changedFields: changed(doc, previousDoc),
          ip: req.headers?.get('cf-connecting-ip') || req.headers?.get('x-forwarded-for')?.split(',')[0] || undefined,
        },
      })
      .catch(() => null)
    return doc
  }
  const afterDelete: CollectionAfterDeleteHook = async ({ doc, req, collection }) => {
    if (!isStaffUser(req.user) || req.context.skipAudit) return doc
    const user = req.user as { name?: string; email?: string }
    await req.payload
      .create({
        collection: 'audit-logs',
        overrideAccess: true,
        req,
        context: { skipAudit: true },
        data: {
          summary: `${user.name || user.email} deleted ${collection.labels?.singular || collection.slug} “${titleOf(doc)}”`.slice(0, 250),
          action: 'delete',
          collectionSlug: collection.slug,
          docId: String(doc.id),
          userName: user.name || user.email,
        },
      })
      .catch(() => null)
    return doc
  }

  return {
    ...config,
    collections: (config.collections || []).map((c) =>
      SKIP.has(c.slug)
        ? c
        : {
            ...c,
            hooks: {
              ...c.hooks,
              afterChange: [...(c.hooks?.afterChange || []), afterChange],
              afterDelete: [...(c.hooks?.afterDelete || []), afterDelete],
            },
          },
    ),
  }
}
