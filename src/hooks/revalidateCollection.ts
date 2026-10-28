import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidateSite } from '@/lib/revalidate'
import { docPath, collectionPathPrefix, type RoutableCollection } from '@/utilities/paths'

/**
 * On publish: revalidate the document URL, its old URL (if the slug moved), the listing
 * page, the sitemap, and purge those URLs from Cloudflare.
 */
export const revalidateCollection =
  (collection: RoutableCollection, extraPaths: string[] = []): CollectionAfterChangeHook =>
  ({ doc, previousDoc, req: { payload, context } }) => {
    if (context.disableRevalidate) return doc
    const isPublished = !('_status' in doc) || doc._status === 'published'
    const wasPublished = previousDoc && (!('_status' in previousDoc) || previousDoc._status === 'published')
    if (!isPublished && !wasPublished) return doc

    const paths = new Set<string>(extraPaths)
    if (isPublished) paths.add(docPath(collection, doc))
    if (wasPublished) paths.add(docPath(collection, previousDoc))
    const listing = collectionPathPrefix[collection]
    if (listing) paths.add(listing)

    revalidateSite(payload, { paths: [...paths], tags: ['sitemap', `collection_${collection}`] })
    return doc
  }

export const revalidateCollectionDelete =
  (collection: RoutableCollection, extraPaths: string[] = []): CollectionAfterDeleteHook =>
  ({ doc, req: { payload, context } }) => {
    if (context.disableRevalidate) return doc
    const listing = collectionPathPrefix[collection]
    revalidateSite(payload, {
      paths: [docPath(collection, doc), ...(listing ? [listing] : []), ...extraPaths],
      tags: ['sitemap', `collection_${collection}`],
    })
    return doc
  }
