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
      <Hero hero={{ type: 'page', visual: 'none', eyebrow: 'VENDOR PORTAL' }} locale={asLocale(locale)} title="Reset your password" />
      <section className="section section--tight">
        <div className="container">
          <Suspense>
            <VendorAuthAction mode="forgot" locale={asLocale(locale)} />
          </Suspense>
        </div>
      </section>
    </article>
  )
}
export const metadata: Metadata = { title: 'Reset your password', robots: { index: false } }
