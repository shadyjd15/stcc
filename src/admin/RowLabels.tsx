'use client'
import { useRowLabel } from '@payloadcms/ui'
import React from 'react'

type Row = Record<string, unknown> & {
  link?: { label?: string }
  title?: string
  skill?: string
  weight?: string
  mustHave?: boolean
  docType?: string
  label?: string
  status?: string
}

const useRow = () => useRowLabel<Row>()

export const NavRowLabel: React.FC = () => {
  const { data, rowNumber } = useRow()
  return <span>{data?.link?.label || `Menu item ${(rowNumber ?? 0) + 1}`}</span>
}

export const TitleRowLabel: React.FC = () => {
  const { data, rowNumber } = useRow()
  return <span>{data?.title || `Column ${(rowNumber ?? 0) + 1}`}</span>
}

const WEIGHT: Record<string, string> = { '1': 'nice to have', '2': 'useful', '3': 'important', '4': 'very important', '5': 'critical' }
export const SkillRowLabel: React.FC = () => {
  const { data, rowNumber } = useRow()
  if (!data?.skill) return <span>Skill {(rowNumber ?? 0) + 1}</span>
  return (
    <span>
      {data.skill} <span style={{ opacity: 0.6 }}>· {WEIGHT[String(data.weight || '3')]}</span>
      {data.mustHave ? <strong style={{ color: '#C0392B' }}> · must-have</strong> : null}
    </span>
  )
}

export const VendorDocRowLabel: React.FC = () => {
  const { data, rowNumber } = useRow()
  return <span>{data?.docType ? `${data.docType} · ${String(data.reviewStatus || 'pending')}` : `Document ${(rowNumber ?? 0) + 1}`}</span>
}

export const LabelRowLabel: React.FC = () => {
  const { data, rowNumber } = useRow()
  return <span>{data?.label || `Item ${(rowNumber ?? 0) + 1}`}{data?.required ? ' · required' : ''}</span>
}

export const StatusRowLabel: React.FC = () => {
  const { data, rowNumber } = useRow()
  return <span>{data?.status ? `When status becomes: ${String(data.status).replace(/_/g, ' ')}` : `Email ${(rowNumber ?? 0) + 1}`}{data?.enabled === false ? ' (off)' : ''}</span>
}
