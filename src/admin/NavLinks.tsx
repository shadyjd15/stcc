'use client'
import { useAuth, useConfig } from '@payloadcms/ui'
import { usePathname } from 'next/navigation'
import React from 'react'

import './admin.css'

type U = { roles?: string[] | null; collection?: string } | null

const has = (u: U, ...roles: string[]) => Boolean(u?.roles?.includes('admin') || roles.some((r) => u?.roles?.includes(r)))

export const NavLinks: React.FC = () => {
  const { user } = useAuth()
  const {
    config: {
      routes: { admin },
      serverURL,
    },
  } = useConfig()
  const path = usePathname()
  const u = user as U

  const links = [
    has(u, 'analyst', 'editor') && { href: `${admin}/analytics`, label: 'Analytics' },
    has(u, 'hr') && { href: `${admin}/careers-pipeline`, label: 'Careers pipeline' },
    { href: serverURL || '/', label: 'View website ↗', external: true },
  ].filter(Boolean) as { href: string; label: string; external?: boolean }[]

  return (
    <nav className="stcc-nav" aria-label="Tools">
      <div className="stcc-nav__label">Tools</div>
      {links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          aria-current={path === l.href ? 'page' : undefined}
          {...(l.external ? { target: '_blank', rel: 'noopener' } : {})}
        >
          {l.label}
        </a>
      ))}
    </nav>
  )
}
