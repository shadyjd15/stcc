import { notFound, redirect, permanentRedirect } from 'next/navigation'

import { getCachedRedirects } from '@/utilities/getRedirects'
import { docPath } from '@/utilities/paths'

type Props = { disableNotFound?: boolean; url: string }

/** CMS-managed redirects (Website → Redirects). Runs only when no page matched the URL. */
export async function PayloadRedirects({ disableNotFound, url }: Props) {
  const redirects = await getCachedRedirects()()
  const clean = url.replace(/\/$/, '') || '/'
  const item = redirects.find((r) => (r.from || '').replace(/\/$/, '') === clean)

  if (item) {
    const to = item.to
    let target: string | null = null
    if (to?.type === 'custom' && to.url) target = to.url
    else if (to?.reference && typeof to.reference.value === 'object') {
      target = docPath(to.reference.relationTo, to.reference.value as { slug?: string; path?: string })
    }
    if (target) {
      if (item.type === '302') redirect(target)
      permanentRedirect(target)
    }
  }
  if (disableNotFound) return null
  notFound()
}
