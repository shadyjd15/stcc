'use client'
import { useConfig } from '@payloadcms/ui'
import React, { useEffect, useState } from 'react'

import { BarList, DailyBars, TrafficChart, type Point, type Row } from './Charts'
import { bytes, country, delta, duration, language, num } from './format'

import '../admin.css'

type Overview = {
  visitors: number
  pageviews: number
  sessions: number
  bounceRate: number
  avgDurationSec: number
  pagesPerSession: number
  conversions: number
  conversionRate: number
}
type Report = {
  range: { from: string; to: string; bucket: string }
  current: Overview
  previous: Overview | null
  series: Point[]
  pages: (Row & { avgSec: number; scroll: number })[]
  entries: Row[]
  exits: Row[]
  sources: Row[]
  campaigns: Row[]
  countries: Row[]
  cities: Row[]
  devices: Row[]
  browsers: Row[]
  oses: Row[]
  languages: Row[]
  locales: Row[]
  events: (Row & { conversion: boolean })[]
  notFound: (Row & { referrer?: string })[]
  searches: Row[]
  realtime: { visitors: number; paths: string[] }
  funnels: Record<'careers' | 'vendors' | 'enquiries', { label: string; value: number }[]>
}
type CF = {
  configured: boolean
  error?: string
  totals?: { requests: number; cachedRequests: number; bytes: number; cachedBytes: number; threats: number; pageViews: number; uniques: number }
  daily?: { date: string; requests: number; cachedRequests: number; threats: number; uniques: number }[]
  countries?: { country: string; requests: number }[]
  statusCodes?: { status: number; requests: number }[]
}

const RANGES = [
  ['today', 'Today'],
  ['7d', '7 days'],
  ['30d', '30 days'],
  ['90d', '90 days'],
  ['12m', '12 months'],
] as const

const FILTER_LABEL: Record<string, string> = { path: 'Page', source: 'Source', country: 'Country', device: 'Device' }

const EVENT_LABEL: Record<string, string> = {
  form_submit: 'Contact form sent',
  quote_request: 'Quote request',
  job_application: 'Job application',
  vendor_signup: 'Vendor account created',
  vendor_submitted: 'Vendor submitted for review',
  search: 'Site search',
  outbound: 'Outbound link click',
  download: 'File download',
  phone_click: 'Phone click',
  email_click: 'Email click',
  whatsapp_click: 'WhatsApp click',
  cta_click: 'Call-to-action click',
}

function Kpi({ label, value, d }: { label: string; value: string; d?: { text: string; good: boolean } | null }) {
  return (
    <div className="stcc-card stcc-kpi">
      <div className="stcc-kpi__label">{label}</div>
      <div className="stcc-kpi__value">{value}</div>
      {d ? (
        <div className={`stcc-kpi__delta ${d.good ? 'stcc-up' : 'stcc-down'}`}>
          {d.text} <span className="stcc-muted">vs previous</span>
        </div>
      ) : null}
    </div>
  )
}

function Panel({ title, children, action }: { title: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="stcc-card">
      <div className="stcc-card__head">
        <h3>{title}</h3>
        {action}
      </div>
      {children}
    </div>
  )
}

function Tabs<T extends string>({ tabs, value, onChange }: { tabs: [T, string][]; value: T; onChange: (v: T) => void }) {
  return (
    <div className="stcc-seg" role="tablist">
      {tabs.map(([v, l]) => (
        <button key={v} type="button" role="tab" aria-pressed={value === v} aria-selected={value === v} onClick={() => onChange(v)} style={{ padding: '3px 9px', fontSize: 12 }}>
          {l}
        </button>
      ))}
    </div>
  )
}

function Funnel({ steps }: { steps: { label: string; value: number }[] }) {
  const top = Math.max(steps[0]?.value || 0, 1)
  return (
    <div className="stcc-funnel">
      {steps.map((s, i) => (
        <div key={s.label} className="stcc-funnel__row">
          <span>{s.label}</span>
          <span className="stcc-num">
            {num(s.value)}
            {i > 0 && steps[i - 1].value ? <span className="stcc-muted"> · {Math.round((s.value / steps[i - 1].value) * 100)}%</span> : null}
          </span>
          <span className="stcc-funnel__bar">
            <i style={{ width: `${(s.value / top) * 100}%` }} />
          </span>
        </div>
      ))}
    </div>
  )
}

export const AnalyticsDashboard: React.FC = () => {
  const {
    config: {
      routes: { api },
    },
  } = useConfig()
  const [range, setRange] = useState<string>('30d')
  const [filters, setFilters] = useState<Record<string, string>>({})
  const [data, setData] = useState<Report | null>(null)
  const [cf, setCf] = useState<CF | null>(null)
  const [error, setError] = useState<string | null>(null)
  // the request key whose result is on screen; anything else means a load is in flight
  const [loadedKey, setLoadedKey] = useState<string | null>(null)
  const [tick, setTick] = useState(0)
  const [srcTab, setSrcTab] = useState<'sources' | 'campaigns'>('sources')
  const [pageTab, setPageTab] = useState<'pages' | 'entries' | 'exits'>('pages')
  const [geoTab, setGeoTab] = useState<'countries' | 'cities' | 'languages'>('countries')
  const [techTab, setTechTab] = useState<'devices' | 'browsers' | 'oses'>('devices')

  const query = new URLSearchParams({ range, ...filters }).toString()
  const loading = loadedKey !== query

  useEffect(() => {
    let live = true
    fetch(`${api}/analytics/report?${query}`, { credentials: 'include' })
      .then(async (res) => {
        if (!res.ok) throw new Error(res.status === 403 ? 'You need the Analyst or Editor role.' : 'Could not load analytics')
        return (await res.json()) as Report
      })
      .then((report) => {
        if (!live) return
        setData(report)
        setError(null)
      })
      .catch((e) => live && setError(e instanceof Error ? e.message : String(e)))
      .finally(() => live && setLoadedKey(query))
    return () => {
      live = false
    }
  }, [api, query, tick])

  // refresh (incl. the realtime counter) every 30s
  useEffect(() => {
    const t = setInterval(() => setTick((n) => n + 1), 30_000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const days = range === 'today' ? 1 : range === '7d' ? 7 : range === '90d' ? 90 : range === '12m' ? 365 : 30
    fetch(`${api}/analytics/cloudflare?days=${Math.min(days, 30)}`, { credentials: 'include' })
      .then((r) => r.json())
      .then((x: CF) => setCf(x))
      .catch(() => setCf({ configured: false }))
  }, [api, range])

  const pick = (k: string) => (v: string) => setFilters((f) => ({ ...f, [k]: v }))
  const c = data?.current
  const p = data?.previous

  return (
    <div>
      <div className="stcc-toolbar">
        <div className="stcc-seg" role="group" aria-label="Date range">
          {RANGES.map(([v, l]) => (
            <button key={v} type="button" aria-pressed={range === v} onClick={() => setRange(v)}>
              {l}
            </button>
          ))}
        </div>
        {Object.entries(filters).map(([k, v]) => (
          <button key={k} type="button" className="stcc-chip-filter" onClick={() => setFilters(({ [k]: _drop, ...rest }) => rest)}>
            {FILTER_LABEL[k]}: {k === 'country' ? country(v) : v} ✕
          </button>
        ))}
        <span className="stcc-realtime" style={{ marginInlineStart: 'auto' }} title={data?.realtime.paths.join('\n')}>
          <i /> {num(data?.realtime.visitors)} on site now
        </span>
        <a className="stcc-btn" href={`${api}/analytics/export?range=${range}`}>
          Export CSV
        </a>
      </div>

      {error ? <div className="stcc-card" style={{ color: 'var(--stcc-bad)' }}>{error}</div> : null}
      {!data && loading ? <div className="stcc-empty">Loading analytics…</div> : null}

      {data && c ? (
        <div style={{ opacity: loading ? 0.6 : 1, transition: 'opacity .2s' }}>
          <section className="stcc-section">
            <div className="stcc-grid stcc-grid--kpi">
              <Kpi label="Visitors" value={num(c.visitors)} d={delta(c.visitors, p?.visitors)} />
              <Kpi label="Page views" value={num(c.pageviews)} d={delta(c.pageviews, p?.pageviews)} />
              <Kpi label="Visits" value={num(c.sessions)} d={delta(c.sessions, p?.sessions)} />
              <Kpi label="Pages per visit" value={String(c.pagesPerSession)} d={delta(c.pagesPerSession, p?.pagesPerSession)} />
              <Kpi label="Avg. engaged time" value={duration(c.avgDurationSec)} d={delta(c.avgDurationSec, p?.avgDurationSec)} />
              <Kpi label="Bounce rate" value={`${c.bounceRate}%`} d={delta(c.bounceRate, p?.bounceRate, true)} />
              <Kpi label="Leads & applications" value={num(c.conversions)} d={delta(c.conversions, p?.conversions)} />
              <Kpi label="Conversion rate" value={`${c.conversionRate}%`} d={delta(c.conversionRate, p?.conversionRate)} />
            </div>
          </section>

          <section className="stcc-section">
            <Panel title="Traffic over time">
              <TrafficChart data={data.series} bucket={data.range.bucket} />
            </Panel>
          </section>

          <section className="stcc-section stcc-grid stcc-grid--2">
            <Panel
              title="Pages"
              action={<Tabs tabs={[['pages', 'Top'], ['entries', 'Landing'], ['exits', 'Exit']]} value={pageTab} onChange={setPageTab} />}
            >
              <BarList
                rows={data[pageTab]}
                onPick={pick('path')}
                extra={
                  pageTab === 'pages'
                    ? (r) => (
                        <span className="stcc-muted" style={{ marginInlineEnd: 12 }}>
                          {duration(Number(r.avgSec))} · {String(r.scroll)}% scrolled ·{' '}
                        </span>
                      )
                    : undefined
                }
              />
            </Panel>
            <Panel title="Where visitors come from" action={<Tabs tabs={[['sources', 'Sources'], ['campaigns', 'Campaigns']]} value={srcTab} onChange={setSrcTab} />}>
              <BarList rows={data[srcTab]} onPick={srcTab === 'sources' ? pick('source') : undefined} empty={srcTab === 'campaigns' ? 'No UTM campaigns in this period' : undefined} />
            </Panel>
            <Panel title="Location" action={<Tabs tabs={[['countries', 'Countries'], ['cities', 'Cities'], ['languages', 'Languages']]} value={geoTab} onChange={setGeoTab} />}>
              <BarList
                rows={data[geoTab]}
                onPick={geoTab === 'countries' ? pick('country') : undefined}
                format={geoTab === 'countries' ? country : geoTab === 'languages' ? language : undefined}
              />
            </Panel>
            <Panel title="Technology" action={<Tabs tabs={[['devices', 'Devices'], ['browsers', 'Browsers'], ['oses', 'OS']]} value={techTab} onChange={setTechTab} />}>
              <BarList rows={data[techTab]} onPick={techTab === 'devices' ? pick('device') : undefined} />
              <div className="stcc-section__title" style={{ marginTop: 16 }}>
                Site language
              </div>
              <BarList rows={data.locales} format={(k) => (k === 'ar' ? 'Arabic' : 'English')} />
            </Panel>
          </section>

          <section className="stcc-section">
            <h2 className="stcc-section__title">Goals & funnels</h2>
            <div className="stcc-grid stcc-grid--3">
              <Panel title="Careers">
                <Funnel steps={data.funnels.careers} />
              </Panel>
              <Panel title="Vendor registration">
                <Funnel steps={data.funnels.vendors} />
              </Panel>
              <Panel title="Enquiries">
                <Funnel steps={data.funnels.enquiries} />
              </Panel>
            </div>
          </section>

          <section className="stcc-section stcc-grid stcc-grid--3">
            <Panel title="Events">
              <BarList
                rows={data.events}
                metric="hits"
                format={(k) => EVENT_LABEL[k] || k}
                extra={(r) => (r.conversion ? <span className="stcc-band stcc-band--strong" style={{ marginInlineEnd: 8 }}>goal</span> : null)}
              />
            </Panel>
            <Panel title="Site searches">
              <BarList rows={data.searches} metric="hits" empty="No searches yet" />
            </Panel>
            <Panel title="Broken links (404)">
              <BarList rows={data.notFound} metric="hits" empty="No missing pages hit – great." extra={(r) => (r.referrer ? <span className="stcc-muted" style={{ marginInlineEnd: 8 }}>from {String(r.referrer)}</span> : null)} />
              {data.notFound.length ? (
                <p className="stcc-muted" style={{ marginBottom: 0 }}>
                  Fix these with a redirect under Settings → Redirects.
                </p>
              ) : null}
            </Panel>
          </section>
        </div>
      ) : null}

      <section className="stcc-section">
        <h2 className="stcc-section__title">Cloudflare edge</h2>
        {!cf ? (
          <div className="stcc-empty">Loading…</div>
        ) : !cf.configured ? (
          <div className="stcc-card">
            <p style={{ margin: 0 }}>
              Connect Cloudflare under <b>Settings → Integrations</b> (zone ID + API token with <i>Analytics: Read</i> and <i>Cache Purge</i>) to see edge traffic,
              cache hit ratio and blocked threats here.
            </p>
          </div>
        ) : cf.error ? (
          <div className="stcc-card" style={{ color: 'var(--stcc-bad)' }}>
            Cloudflare said: {cf.error}
          </div>
        ) : cf.totals ? (
          <div className="stcc-grid">
            <div className="stcc-grid stcc-grid--kpi">
              <Kpi label="Requests at the edge" value={num(cf.totals.requests)} />
              <Kpi label="Cache hit ratio" value={`${cf.totals.requests ? Math.round((cf.totals.cachedRequests / cf.totals.requests) * 100) : 0}%`} />
              <Kpi label="Bandwidth" value={bytes(cf.totals.bytes)} />
              <Kpi label="Bandwidth saved" value={bytes(cf.totals.cachedBytes)} />
              <Kpi label="Threats blocked" value={num(cf.totals.threats)} />
              <Kpi label="Unique IPs" value={num(cf.totals.uniques)} />
            </div>
            <div className="stcc-grid stcc-grid--2">
              <Panel title="Requests per day">
                <DailyBars data={cf.daily || []} />
              </Panel>
              <Panel title="Edge traffic by country">
                <BarList rows={(cf.countries || []).map((x) => ({ key: x.country, hits: x.requests }))} metric="hits" format={country} />
              </Panel>
            </div>
          </div>
        ) : null}
      </section>
    </div>
  )
}
