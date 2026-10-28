import type { CollectionConfig } from 'payload'
import { APIError } from 'payload'

import { canManageVendors, isVendorUser, userHasRole } from '@/access'
import { sniffFileType } from '@/lib/publicGuard'
import { uploadsDir } from '@/utilities/uploadsDir'

/**
 * Private storage for vendor compliance documents. A vendor can only see and upload its
 * own files; procurement can see everything. Files are never publicly reachable.
 */
export const VendorDocuments: CollectionConfig = {
  slug: 'vendor-documents',
  labels: { singular: 'Vendor document', plural: 'Vendor documents' },
  access: {
    create: ({ req: { user } }) => isVendorUser(user) || userHasRole(user, 'procurement'),
    read: ({ req: { user } }) => {
      if (userHasRole(user, 'procurement', 'analyst')) return true
      if (isVendorUser(user)) return { owner: { equals: user!.id } }
      return false
    },
    update: canManageVendors,
    delete: ({ req: { user } }) => {
      if (userHasRole(user, 'procurement')) return true
      if (isVendorUser(user)) return { owner: { equals: user!.id } }
      return false
    },
  },
  admin: {
    group: 'Vendors',
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'owner', 'docType', 'createdAt'],
  },
  fields: [
    { name: 'owner', type: 'relationship', relationTo: 'vendors', index: true, admin: { readOnly: true } },
    { name: 'docType', type: 'text', admin: { readOnly: true } },
  ],
  upload: {
    staticDir: uploadsDir('private/vendor-documents'),
    mimeTypes: ['application/pdf', 'image/png', 'image/jpeg', 'image/webp'],
    modifyResponseHeaders: ({ headers }) => {
      headers.set('Cache-Control', 'private, no-store')
      headers.set('X-Robots-Tag', 'noindex')
      return headers
    },
  },
  hooks: {
    beforeValidate: [
      ({ data, req, operation }) => {
        if (operation === 'create') {
          const buf = req.file?.data as Buffer | undefined
          if (buf) {
            const kind = sniffFileType(buf)
            if (!kind || !['pdf', 'png', 'jpg', 'webp'].includes(kind)) {
              throw new APIError('Documents must be PDF, PNG, JPG or WEBP files.', 400, null, true)
            }
            if (buf.length > 10 * 1024 * 1024) throw new APIError('Each document must be 10 MB or smaller.', 400, null, true)
          }
          if (isVendorUser(req.user)) return { ...data, owner: req.user!.id }
        }
        return data
      },
    ],
  },
}
