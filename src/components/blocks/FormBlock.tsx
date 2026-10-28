import React from 'react'

import { getDictionary } from '@/i18n/dictionary'
import type { Form, FormBlock as FormBlockType } from '@/payload-types'
import { lexicalToText } from '@/utilities/lexicalToText'
import { FormRenderer, type FormField } from '../forms/FormRenderer'
import { Icon } from '../Icon'
import { RichText } from '../RichText'
import type { BlockContext } from './shared'

export function ContactAside({ ctx }: { ctx: BlockContext }) {
  const c = ctx.settings.company
  const t = getDictionary(ctx.locale)
  const emails = c?.emails || []
  const phones = c?.phones || []
  return (
    <aside className="contact-layout__aside">
      <div className="contact-card">
        {emails.map((e, i) => (
          <div className="stack" style={{ ['--gap' as string]: '6px' }} key={e.id || i}>
            <span className="mono accent">{e.label || 'Email'}</span>
            <a href={`mailto:${e.email}`} data-track="email">
              {e.email}
            </a>
          </div>
        ))}
        {phones.length > 0 && (
          <div className="stack" style={{ ['--gap' as string]: '6px' }}>
            <span className="mono accent">{phones[0].label || 'Call us'}</span>
            {phones.map((p, i) => (
              <a key={p.id || i} href={`tel:${p.number.replace(/[^+\d]/g, '')}`} data-track="call" dir="ltr">
                {p.number}
              </a>
            ))}
          </div>
        )}
        {c?.whatsapp && (
          <a href={`https://wa.me/${c.whatsapp.replace(/\D/g, '')}`} className="btn" style={{ fontFamily: 'var(--font-body)', fontSize: 15 }} target="_blank" rel="noopener" data-track="whatsapp">
            <Icon name="whatsapp" size={18} />
            WhatsApp
          </a>
        )}
      </div>
      <div className="map-card">
        <div className="map-card__map" aria-hidden="true">
          <span className="map-card__pin" />
        </div>
        <div className="map-card__body">
          <strong style={{ fontFamily: 'var(--font-display)', fontSize: 18 }}>{t.headOffice}</strong>
          <span className="muted">
            {[ctx.settings.company?.legalName, c?.street, `${c?.city || ''} ${c?.postalCode || ''}`.trim(), c?.country].filter(Boolean).join(', ')}
          </span>
          {c?.officeHours && <span className="muted">{c.officeHours}</span>}
          {c?.mapUrl && (
            <a href={c.mapUrl} target="_blank" rel="noopener" className="link-arrow" style={{ marginTop: 8 }}>
              Google Maps
            </a>
          )}
        </div>
      </div>
    </aside>
  )
}

export function FormBlock({ block, ctx }: { block: FormBlockType; ctx: BlockContext }) {
  const form = block.form as Form | null
  if (!form || typeof form !== 'object') return null
  const t = getDictionary(ctx.locale)

  const fields: FormField[] = (form.fields || []).map((f) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const anyF = f as any
    if (f.blockType === 'message') {
      return { ...anyF, messageNode: <RichText data={anyF.message} />, messageText: lexicalToText(anyF.message) }
    }
    if (f.blockType === 'country') {
      return { ...anyF, options: COUNTRIES.map((c) => ({ label: c, value: c })) }
    }
    return anyF
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const extra = form as any
  const renderer = (
    <FormRenderer
      formId={form.id}
      fields={fields}
      submitLabel={form.submitButtonLabel}
      confirmation={form.confirmationType === 'message' ? <RichText data={form.confirmationMessage} /> : null}
      redirectUrl={form.confirmationType === 'redirect' ? form.redirect?.url : null}
      turnstileSiteKey={ctx.turnstileSiteKey}
      locale={ctx.locale}
      multiStep={Boolean(extra.multiStep)}
      divisions={ctx.divisions.map((d) => ({ value: d.shortTitle || d.title, label: d.title }))}
      pagePath={ctx.pagePath}
      analyticsEvent={extra.analyticsEvent}
      strings={{
        required: t.required,
        submit: t.sendMessage,
        sending: t.sending,
        sent: t.messageSent,
        error: t.somethingWrong,
        next: t.continue,
        back: t.back,
        select: t.select,
        spamNote: t.spamNote,
        upload: ctx.locale === 'ar' ? 'اختر ملفات للرفع' : 'Choose files to upload',
      }}
    />
  )

  const card = (
    <div className="form-card">
      {block.heading && <h2 className="h3" style={{ fontSize: 28 }}>{block.heading}</h2>}
      {block.intro && <p className="muted">{block.intro}</p>}
      {renderer}
    </div>
  )

  return (
    <section id={block.anchor || undefined} className="section" style={{ paddingTop: block.overlapHero ? 0 : undefined }}>
      <div className="container">
        {block.layout === 'centered' ? (
          <div className={block.overlapHero ? 'contact-layout--overlap' : ''} style={{ maxWidth: 960, marginInline: 'auto', position: 'relative' }}>
            {card}
          </div>
        ) : (
          <div className={`contact-layout ${block.overlapHero ? 'contact-layout--overlap' : ''}`}>
            <div className="contact-layout__form">{card}</div>
            <ContactAside ctx={ctx} />
          </div>
        )}
      </div>
    </section>
  )
}

const COUNTRIES = [
  'Saudi Arabia', 'United Arab Emirates', 'Kuwait', 'Qatar', 'Bahrain', 'Oman', 'Egypt', 'Jordan',
  'India', 'Pakistan', 'Philippines', 'United Kingdom', 'United States', 'Germany', 'China', 'Other',
]
