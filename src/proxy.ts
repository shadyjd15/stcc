import { NextResponse, type NextRequest } from 'next/server'

/**
 * Locale routing: English lives at the root (/about), Arabic under /ar (/ar/about).
 * Internally every page is rendered under app/(frontend)/[locale], so root URLs are
 * rewritten to /en/... (visitors asking for /en/... are redirected to the root in redirects.ts).
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // already-internal paths (/en/... is redirected to the root by next.config redirects)
  if (pathname === '/en' || pathname.startsWith('/en/')) return NextResponse.next()
  if (pathname === '/ar' || pathname.startsWith('/ar/')) return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = `/en${pathname === '/' ? '' : pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  // everything except the CMS, APIs, Next internals and files with an extension
  matcher: ['/((?!admin|api|_next|next/|.*\\..*).*)'],
}
