import React from 'react'

import { ICONS, type IconName } from '@/fields/icons'

type Props = {
  name: IconName | string | null | undefined
  size?: number
  className?: string
  strokeWidth?: number
  title?: string
}

/** Stroke icon from the shared icon set. Decorative unless a title is given. */
export function Icon({ name, size, className, strokeWidth = 1.6, title }: Props) {
  const d = name && name in ICONS ? ICONS[name as IconName] : null
  if (!d) return null
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={['icon', name === 'arrowRight' ? 'icon--arrow' : '', className].filter(Boolean).join(' ')}
      style={size ? ({ '--size': `${size}px` } as React.CSSProperties) : undefined}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <path d={d} />
    </svg>
  )
}

export const Arrow = ({ size = 16 }: { size?: number }) => <Icon name="arrowRight" size={size} strokeWidth={2} />
