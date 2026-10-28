import type { Metadata } from 'next'
import { Suspense } from 'react'

import { Hero } from '@/components/Hero'
import { VendorAuthAction } from '@/components/vendor/VendorAuthAction'
import { asLocale } from '../../_components/CmsPage'

type Props = { params: Promise<{ locale: string }> }

export default async function Page({ params }: Props) {
  const { locale } = await params
  return (
    <article>
      <Hero hero={{ type: 'page', visual: 'none', eyebrow: 'VENDOR PORTAL' }} locale={asLocale(locale)} title="Verifying your email" />
      <section className="section section--tight">
        <div className="container">
          <Suspense>
            <VendorAuthAction mode="verify" locale={asLocale(locale)} />
          </Suspense>
        </div>
      </section>
    </article>
  )
}
export const metadata: Metadata = { title: 'Verify email', robots: { index: false } }
