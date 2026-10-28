import React from 'react'

import type { Division } from '@/payload-types'

/*
 * Blueprint-style line illustrations. Every stroke uses pathLength=1 so the CSS
 * "draw" animation works without measuring paths in JavaScript.
 */

const L = (props: React.SVGProps<SVGPathElement> & { d: string; i?: number }) => {
  const { i = 0, style, ...rest } = props
  return <path pathLength={1} data-draw="" style={{ ['--d' as string]: i, ...style }} {...rest} />
}

const mono = { fontFamily: 'var(--font-mono)', fontSize: 11 } as const

export function NetworkIllustration({ divisions }: { divisions: Pick<Division, 'shortTitle' | 'title' | 'isNew'>[] }) {
  const items = divisions.slice(0, 8)
  const cx = 260
  const cy = 240
  const r = 190
  const points = items.map((d, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / Math.max(items.length, 1)
    return { d, x: cx + r * Math.cos(a), y: cy + r * Math.sin(a), a }
  })
  return (
    <svg viewBox="0 0 520 480" className="draw" role="img" aria-label={`STCC at the centre of ${items.length} connected divisions`} style={{ width: '100%', maxWidth: 540, height: 'auto', overflow: 'visible' }}>
      <g fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1">
        <circle cx={cx} cy={cy} r={r} strokeDasharray="4 6" />
        <circle cx={cx} cy={cy} r={120} />
      </g>
      <g stroke="var(--accent)" strokeWidth="1.4" fill="none" opacity="0.85">
        {points.map((p, i) => (
          <L key={i} i={i} d={`M${cx} ${cy} L${p.x.toFixed(1)} ${p.y.toFixed(1)}`} />
        ))}
      </g>
      <circle cx={cx} cy={cy} r="58" fill="var(--navy)" stroke="var(--accent)" strokeWidth="2" />
      <circle className="pulse" cx={cx} cy={cy} r="58" fill="none" stroke="var(--accent)" strokeWidth="1" />
      <text x={cx} y={cy - 4} textAnchor="middle" fill="#fff" fontFamily="var(--font-display)" fontWeight="700" fontSize="22" letterSpacing="2">
        STCC
      </text>
      <text x={cx} y={cy + 18} textAnchor="middle" fill="#A9BBD3" style={{ ...mono, fontSize: 10 }}>
        CORE
      </text>
      <g style={mono} fill="#fff">
        {points.map((p, i) => {
          const label = (p.d.shortTitle || p.d.title || '').toUpperCase()
          const right = Math.cos(p.a) > 0.25
          const left = Math.cos(p.a) < -0.25
          const below = Math.sin(p.a) > 0.5
          const tx = p.x + (right ? 14 : left ? -14 : 0)
          const ty = p.y + (below ? 28 : Math.sin(p.a) < -0.5 ? -18 : -14)
          return (
            <g key={i} data-pop="" style={{ ['--d' as string]: i }}>
              <circle cx={p.x} cy={p.y} r="7" fill={p.d.isNew ? '#fff' : 'var(--accent)'} />
              <text x={tx} y={ty} textAnchor={right ? 'start' : left ? 'end' : 'middle'} fill={p.d.isNew ? 'var(--accent)' : '#fff'}>
                {label}
                {p.d.isNew ? ' · NEW' : ''}
              </text>
            </g>
          )
        })}
      </g>
    </svg>
  )
}

export function BlueprintIllustration() {
  return (
    <svg viewBox="0 0 480 380" className="draw" role="img" aria-label="Blueprint of an industrial building with structural frame, piping and electrical runs" style={{ width: '100%', maxWidth: 500, height: 'auto' }}>
      <g fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.4">
        <L i={0} d="M40 320 H440" />
        <L i={1} d="M80 320 V150 L240 70 L400 150 V320" />
        <L i={2} d="M80 150 H400" />
        <L i={3} d="M200 250 h80 v70 h-80 z" />
      </g>
      <g fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1">
        <L i={3} d="M140 320 V150 M200 320 V150 M280 320 V150 M340 320 V150" />
        <L i={4} d="M80 220 H400" />
      </g>
      <g fill="none" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round">
        <L i={5} d="M40 190 H120 Q 130 190 130 200 V280 Q 130 290 140 290 H230" />
      </g>
      <circle cx="40" cy="190" r="5" fill="var(--accent)" data-pop="" style={{ ['--d' as string]: 6 }} />
      <path d="M360 120 V180 H310 V250" fill="none" stroke="#fff" strokeWidth="1.6" strokeDasharray="6 4" />
      <path d="M352 108 l10 -14 l-4 10 h8 l-10 14 l4 -10 z" fill="#fff" />
      <g style={{ ...mono, fontSize: 10 }} fill="#A9BBD3">
        <text x="40" y="345">CIVIL · STRUCTURE</text>
        <text x="40" y="176" fill="var(--accent)">MECH · PIPING</text>
        <text x="372" y="100">E&amp;I</text>
      </g>
    </svg>
  )
}

export function MembraneIllustration() {
  return (
    <svg viewBox="0 0 480 360" className="draw" role="img" aria-label="Cross-section of a reverse osmosis membrane separating salt from water" style={{ width: '100%', maxWidth: 500, height: 'auto' }}>
      <L i={0} d="M120 120 H360 A60 60 0 0 1 360 240 H120 A60 60 0 0 1 120 120 Z" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
      <L i={1} d="M60 168 H420 V192 H60 Z" fill="none" stroke="var(--accent)" strokeWidth="2" />
      <g stroke="rgba(255,255,255,0.25)">
        <path d="M100 120 V240 M140 120 V240 M180 120 V240 M220 120 V240 M260 120 V240 M300 120 V240 M340 120 V240 M380 120 V240" />
      </g>
      <g fill="#fff">
        {[
          [90, 140],
          [120, 150],
          [160, 138],
          [200, 152],
          [110, 220],
          [170, 214],
          [230, 224],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3" data-pop="" style={{ ['--d' as string]: i + 2 }} />
        ))}
      </g>
      <L i={2} d="M20 180 H60" stroke="#fff" strokeWidth="2" />
      <L i={3} d="M420 180 H470" stroke="var(--accent)" strokeWidth="3" />
      <path d="M240 240 V300 H420" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeDasharray="5 4" />
      <g style={{ ...mono, fontSize: 10 }} fill="#A9BBD3">
        <text x="20" y="168">FEED</text>
        <text x="410" y="164" fill="var(--accent)">PERMEATE</text>
        <text x="320" y="320">BRINE / REJECT</text>
        <text x="60" y="100">MEMBRANE ELEMENT</text>
      </g>
    </svg>
  )
}

export function ReactorIllustration() {
  const carriers = [
    [140, 160],
    [190, 130],
    [260, 140],
    [320, 180],
    [300, 240],
    [220, 230],
    [160, 220],
    [360, 140],
    [120, 260],
  ]
  return (
    <svg viewBox="0 0 480 360" className="draw" role="img" aria-label="Moving bed biofilm reactor with aeration grid and circulating carriers" style={{ width: '100%', maxWidth: 500, height: 'auto' }}>
      <L i={0} d="M70 70 V300 H410 V70" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1.6" />
      <path d="M70 110 H410" stroke="rgba(255,255,255,0.25)" strokeDasharray="6 6" />
      <L i={1} d="M100 285 H380" stroke="var(--accent)" strokeWidth="2.4" />
      <L i={2} d="M240 270 C 160 250 120 180 170 140 C 220 100 300 130 310 190 C 320 250 270 270 240 270" fill="none" stroke="var(--accent)" strokeWidth="1.2" opacity="0.8" />
      <g fill="none" stroke="#fff" strokeWidth="1.3">
        {carriers.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="9" data-pop="" style={{ ['--d' as string]: i + 2 }} />
        ))}
      </g>
      <g fill="#fff" opacity="0.6">
        <circle cx="130" cy="270" r="2" />
        <circle cx="200" cy="262" r="2" />
        <circle cx="270" cy="268" r="2" />
        <circle cx="340" cy="262" r="2" />
      </g>
      <g style={{ ...mono, fontSize: 10 }} fill="#A9BBD3">
        <text x="70" y="56">AEROBIC REACTOR</text>
        <text x="300" y="322" fill="var(--accent)">AERATION GRID</text>
        <text x="372" y="102">CARRIERS</text>
      </g>
    </svg>
  )
}

export function ValveIllustration() {
  return (
    <svg viewBox="0 0 480 360" className="draw" role="img" aria-label="Technical drawing of a gate valve" style={{ width: '100%', maxWidth: 480, height: 'auto' }}>
      <g fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1.5">
        <L i={0} d="M60 220 H170 M310 220 H420" />
        <L i={1} d="M60 196 V244 M420 196 V244" />
        <L i={2} d="M170 180 H310 V260 H170 Z" />
        <L i={3} d="M200 180 V130 H280 V180" />
      </g>
      <g fill="none" stroke="var(--accent)" strokeWidth="2">
        <L i={4} d="M240 130 V50" />
        <L i={5} d="M180 44 a60 12 0 1 0 120 0 a60 12 0 1 0 -120 0" />
      </g>
      <path d="M240 150 V112" stroke="rgba(255,255,255,0.4)" strokeDasharray="3 4" />
      <g style={{ ...mono, fontSize: 10 }} fill="#A9BBD3">
        <text x="320" y="48" fill="var(--accent)">HANDWHEEL</text>
        <text x="290" y="128">BONNET</text>
        <text x="320" y="285">BODY · ASTM A216</text>
        <text x="60" y="270">FLANGE · ASME B16.5</text>
      </g>
    </svg>
  )
}

export function HvacIllustration() {
  return (
    <svg viewBox="0 0 480 360" className="draw" role="img" aria-label="Schematic of a cooling tower connected to a chiller and air handling unit" style={{ width: '100%', maxWidth: 500, height: 'auto' }}>
      <g fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1.5">
        <L i={0} d="M60 300 L80 120 H180 L200 300 Z" />
        <L i={1} d="M90 112 a40 10 0 1 0 80 0 a40 10 0 1 0 -80 0" />
        <L i={2} d="M258 220 H402 Q410 220 410 228 V292 Q410 300 402 300 H258 Q250 300 250 292 V228 Q250 220 258 220 Z" />
        <L i={3} d="M298 60 H422 Q430 60 430 68 V142 Q430 150 422 150 H298 Q290 150 290 142 V68 Q290 60 298 60 Z" />
      </g>
      <g fill="none" stroke="rgba(255,255,255,0.4)">
        <circle cx="360" cy="105" r="26" />
        <path d="M360 79 V131 M334 105 H386" />
      </g>
      <g fill="none" stroke="var(--accent)" strokeWidth="2.2">
        <L i={4} d="M200 250 H250" />
        <L i={5} d="M330 220 V150" />
      </g>
      <g fill="none" stroke="#fff" strokeWidth="1.6" strokeDasharray="5 4">
        <path d="M200 280 H250" />
        <path d="M370 220 V150" />
      </g>
      <g fill="none" stroke="rgba(255,255,255,0.35)" strokeLinecap="round">
        <path d="M110 92 q 6 -16 0 -32 M130 88 q 6 -16 0 -36 M150 92 q 6 -16 0 -32" />
      </g>
      <g style={{ ...mono, fontSize: 10 }} fill="#A9BBD3">
        <text x="60" y="326">COOLING TOWER</text>
        <text x="270" y="326">CHILLER</text>
        <text x="290" y="50">AHU</text>
        <text x="206" y="242" fill="var(--accent)">CHW</text>
      </g>
    </svg>
  )
}

export function TerminalIllustration() {
  const lines = [
    ['core-switch-01', '● online', 'ok'],
    ['fw-perimeter', '● 0 threats', 'ok'],
    ['ot-segment / scada', '● isolated', 'ok'],
    ['cctv-nvr', '● 128 cams', 'ok'],
    ['backup-job nightly', '● 02:00 ok', 'ok'],
    ['patch-window', '▲ due sat', 'accent'],
  ]
  return (
    <div className="terminal" aria-hidden="true">
      <div className="terminal__bar">
        <i />
        <i />
        <i />
        <span style={{ marginInlineStart: 8 }}>stcc-noc ~ site-health</span>
      </div>
      <div className="terminal__body" dir="ltr">
        <span style={{ color: 'var(--on-dark-2)' }}>$ stcc status --site plant-a</span>
        {lines.map(([k, v, tone], i) => (
          <div className="terminal__line" key={k} style={{ ['--i' as string]: i }}>
            <span style={{ color: '#fff' }}>{k}</span>
            <span className={tone === 'ok' ? 'ok' : 'accent'}>{v}</span>
          </div>
        ))}
        <span style={{ color: 'var(--on-dark-2)' }}>
          $ <span className="blink" style={{ display: 'inline-block', width: 9, height: 16, verticalAlign: -3, background: 'var(--accent)' }} />
        </span>
      </div>
    </div>
  )
}

export function Illustration({ name, divisions }: { name?: string | null; divisions?: Division[] }) {
  switch (name) {
    case 'network':
      return <NetworkIllustration divisions={divisions || []} />
    case 'blueprint':
      return <BlueprintIllustration />
    case 'membrane':
      return <MembraneIllustration />
    case 'reactor':
      return <ReactorIllustration />
    case 'valve':
      return <ValveIllustration />
    case 'hvac':
      return <HvacIllustration />
    case 'terminal':
      return <TerminalIllustration />
    default:
      return null
  }
}
