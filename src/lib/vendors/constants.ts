export const VENDOR_STATUSES = [
  { label: 'Draft (not submitted)', value: 'draft' },
  { label: 'Submitted', value: 'submitted' },
  { label: 'Document check', value: 'document_review' },
  { label: 'Clarification required', value: 'clarification' },
  { label: 'Technical review', value: 'technical_review' },
  { label: 'Compliance & HSE review', value: 'compliance_review' },
  { label: 'Approved', value: 'approved' },
  { label: 'Rejected', value: 'rejected' },
  { label: 'Suspended', value: 'suspended' },
] as const

export type VendorStatus = (typeof VENDOR_STATUSES)[number]['value']

export const statusLabel = (s?: string | null) =>
  VENDOR_STATUSES.find((x) => x.value === s)?.label || 'Draft (not submitted)'

/** Allowed moves in the review workflow */
export const TRANSITIONS: Record<VendorStatus, VendorStatus[]> = {
  draft: ['submitted'],
  submitted: ['document_review', 'clarification', 'rejected'],
  document_review: ['technical_review', 'clarification', 'rejected'],
  clarification: ['document_review', 'rejected'],
  technical_review: ['compliance_review', 'clarification', 'rejected'],
  compliance_review: ['approved', 'clarification', 'rejected'],
  approved: ['suspended', 'clarification'],
  rejected: ['document_review'],
  suspended: ['approved', 'rejected'],
}

/** The public-facing timeline shown to vendors (portal + emails) */
export const VENDOR_TIMELINE: { status: VendorStatus; label: string }[] = [
  { status: 'submitted', label: 'Submitted' },
  { status: 'document_review', label: 'Document check' },
  { status: 'technical_review', label: 'Technical review' },
  { status: 'compliance_review', label: 'Compliance & HSE' },
  { status: 'approved', label: 'Approved' },
]

export const timelineSteps = (status: string) => {
  const order = VENDOR_TIMELINE.map((t) => t.status as string)
  const effective = status === 'clarification' ? 'document_review' : status
  const idx = order.indexOf(effective)
  return VENDOR_TIMELINE.map((t, i) => ({
    label: status === 'clarification' && t.status === 'document_review' ? 'Clarification required' : t.label,
    state: (status === 'approved' || i < idx ? 'done' : i === idx ? 'current' : 'todo') as 'done' | 'current' | 'todo',
  }))
}

export const VENDOR_TYPES = [
  { label: 'Manufacturer', value: 'manufacturer' },
  { label: 'Distributor / trader', value: 'distributor' },
  { label: 'Subcontractor', value: 'subcontractor' },
  { label: 'Service provider', value: 'service' },
  { label: 'Consultant', value: 'consultant' },
]

export const EDITABLE_BY_VENDOR: VendorStatus[] = ['draft', 'clarification']

export const REGIONS = [
  { label: 'Eastern Province', value: 'eastern' },
  { label: 'Central (Riyadh)', value: 'central' },
  { label: 'Western (Makkah / Madinah)', value: 'western' },
  { label: 'Northern', value: 'northern' },
  { label: 'Southern', value: 'southern' },
  { label: 'Other GCC', value: 'gcc' },
  { label: 'International', value: 'international' },
]
