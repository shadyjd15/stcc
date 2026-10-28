'use client'
import React from 'react'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import '../admin.css'

export type Point = { t: string; visitors: number; pageviews: number; conversions?: number }

const fmtTick = (bucket: string) => (t: string) => {
  const d = new Date(t)
  return bucket === 'hour'
    ? d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
    : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

const tooltipStyle = {
  background: 'var(--theme-bg)',
  border: '1px solid var(--theme-elevation-150)',
  borderRadius: 8,
  fontSize: 12,
}

export const TrafficChart: React.FC<{ data: Point[]; bucket: string; height?: number }> = ({ data, bucket, height = 260 }) => {
  if (!data.length) return <div className="stcc-empty">No traffic recorded in this period yet.</div>
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id="stccPv" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#F07A2B" stopOpacity={0.28} />
              <stop offset="100%" stopColor="#F07A2B" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="var(--theme-elevation-100)" vertical={false} />
          <XAxis dataKey="t" tickFormatter={fmtTick(bucket)} tick={{ fontSize: 11, fill: 'var(--theme-elevation-600)' }} axisLine={false} tickLine={false} minTickGap={24} />
          <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: 'var(--theme-elevation-600)' }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tooltipStyle} labelFormatter={(l) => new Date(String(l)).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: bucket === 'hour' ? 'short' : undefined })} />
          <Area type="monotone" dataKey="pageviews" name="Page views" stroke="#F07A2B" strokeWidth={2} fill="url(#stccPv)" />
          <Area type="monotone" dataKey="visitors" name="Visitors" stroke="#3A7BD5" strokeWidth={2} fill="transparent" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export const DailyBars: React.FC<{ data: { date: string; requests: number; cachedRequests: number }[] }> = ({ data }) => (
  <div style={{ width: '100%', height: 220 }}>
    <ResponsiveContainer>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
        <CartesianGrid stroke="var(--theme-elevation-100)" vertical={false} />
        <XAxis dataKey="date" tickFormatter={(d) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} tick={{ fontSize: 11, fill: 'var(--theme-elevation-600)' }} axisLine={false} tickLine={false} minTickGap={20} />
        <YAxis tick={{ fontSize: 11, fill: 'var(--theme-elevation-600)' }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={tooltipStyle} />
        <Bar dataKey="cachedRequests" name="Served from cache" stackId="a" fill="#1F9D6B" />
        <Bar dataKey="requests" name="All requests" fill="#3A7BD5" opacity={0.35} />
      </BarChart>
    </ResponsiveContainer>
  </div>
)

export type Row = { key: string; visitors?: number; hits: number; [k: string]: unknown }

export const BarList: React.FC<{
  rows: Row[]
  metric?: 'visitors' | 'hits'
  empty?: string
  onPick?: (key: string) => void
  format?: (key: string) => string
  extra?: (r: Row) => React.ReactNode
}> = ({ rows, metric = 'visitors', empty = 'No data yet', onPick, format, extra }) => {
  if (!rows?.length) return <div className="stcc-muted" style={{ padding: '8px 0' }}>{empty}</div>
  const max = Math.max(...rows.map((r) => Number(r[metric] ?? r.hits) || 0), 1)
  return (
    <ul className="stcc-bars">
      {rows.map((r) => {
        const v = Number(r[metric] ?? r.hits) || 0
        const label = format ? format(r.key) : r.key
        return (
          <li key={r.key} style={{ ['--w' as string]: `${(v / max) * 100}%` }}>
            <span title={label}>{onPick ? <button type="button" onClick={() => onPick(r.key)}>{label}</button> : label}</span>
            <span>
              {extra ? extra(r) : null}
              {v.toLocaleString()}
            </span>
          </li>
        )
      })}
    </ul>
  )
}
