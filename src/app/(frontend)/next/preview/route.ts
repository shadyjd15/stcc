import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'

import { isStaffUser } from '@/access'

/** Enables Next.js draft mode for signed-in editors so live preview shows unpublished changes */
export async function GET(req: Request): Promise<Response> {
  const payload = await getPayload({ config: configPromise })
  const { searchParams } = new URL(req.url)
  const path = searchParams.get('path')
  const previewSecret = searchParams.get('previewSecret')

  if (!process.env.PREVIEW_SECRET || previewSecret !== process.env.PREVIEW_SECRET) {
    return new Response('You are not allowed to preview this page', { status: 403 })
  }
  if (!path || !path.startsWith('/')) return new Response('Invalid path', { status: 400 })

  const { user } = await payload.auth({ headers: req.headers })
  if (!isStaffUser(user)) {
    const draft = await draftMode()
    draft.disable()
    return new Response('You must be signed in to preview this page', { status: 403 })
  }
  const draft = await draftMode()
  draft.enable()
  redirect(path)
}
