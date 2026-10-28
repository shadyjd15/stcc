import type { Metadata } from 'next'

import { asLocale, CmsPage, cmsPageMetadata } from '../_components/CmsPage'

type Props = { params: Promise<{ locale: string }> }

export default async function Page({ params }: Props) {
  const { locale } = await params
  return <CmsPage path="/divisions" locale={asLocale(locale)} />
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return cmsPageMetadata('/divisions', asLocale(locale))
}
