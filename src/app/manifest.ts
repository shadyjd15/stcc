import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'STCC – Sahara Technical Contracting Co.',
    short_name: 'STCC',
    description: 'Integrated engineering, water treatment, HVAC, IT, supply and manpower across the Kingdom of Saudi Arabia.',
    start_url: '/',
    display: 'standalone',
    background_color: '#071A33',
    theme_color: '#0B2545',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  }
}
