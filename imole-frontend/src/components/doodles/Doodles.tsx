import type { ReactNode } from 'react'

export function GlowLamp({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden>
      <defs>
        <radialGradient id="glow" cx="50%" cy="45%" r="50%">
          <stop offset="0%" stopColor="#ffd9ab" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#ff8a00" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#ff8a00" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="54" r="52" fill="url(#glow)" />
      <path
        d="M60 30c-9 0-16 6.5-16 15 0 6 3.5 9.5 6.5 12.5 2 2 3 4 3 6.5h13c0-2.5 1-4.5 3-6.5 3-3 6.5-6.5 6.5-12.5 0-8.5-7-15-16-15Z"
        stroke="#002444"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path d="M55 68v6a5 5 0 0 0 10 0v-6" stroke="#002444" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M56 78h8M57 83h6" stroke="#002444" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

const DOT_POSITIONS = [
  [8, 18], [22, 6], [38, 14], [55, 4], [72, 12], [88, 7],
  [12, 42], [30, 34], [50, 28], [68, 36], [86, 30], [94, 46],
  [6, 64], [24, 58], [44, 52], [63, 60], [82, 55], [95, 66],
]

export function SparkleDots({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 74" className={className} aria-hidden preserveAspectRatio="none">
      {DOT_POSITIONS.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={i % 3 === 0 ? 1.1 : 0.7}
          fill="#7580ef"
          opacity={i % 2 ? 0.35 : 0.18}
        />
      ))}
    </svg>
  )
}

export function WaveDivider({ className = '', color = '#fff4e6' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className={className} aria-hidden>
      <path
        d="M0 24C120 4 240 4 360 20s240 22 360 10 240-26 360-16 240 22 360 14v20H0V24Z"
        fill={color}
      />
    </svg>
  )
}

export function SkillBadge({ icon, tone, label }: { icon: ReactNode; tone: string; label: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${tone}`}>
      {icon}
      {label}
    </span>
  )
}
