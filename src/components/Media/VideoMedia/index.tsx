'use client'
import React from 'react'

import type { Props as MediaProps } from '../types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

export const VideoMedia: React.FC<MediaProps> = ({ onClick, resource, videoClassName }) => {
  if (!resource || typeof resource !== 'object' || !resource.url) return null
  return (
    <video autoPlay className={videoClassName} controls={false} loop muted onClick={onClick} playsInline preload="metadata">
      <source src={getMediaUrl(resource.url)} type={resource.mimeType || undefined} />
    </video>
  )
}
