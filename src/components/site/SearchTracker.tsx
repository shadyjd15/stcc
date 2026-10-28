'use client'

import { useEffect } from 'react'

import { track } from './analyticsClient'

export function SearchTracker({ q, count }: { q: string; count: number }) {
  useEffect(() => {
    const id = setTimeout(() => track('search', { q, results: count }), 600)
    return () => clearTimeout(id)
  }, [q, count])
  return null
}
