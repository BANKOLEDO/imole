import type { ReactNode } from 'react'

type Tone = 'orange' | 'cyan' | 'peach' | 'navy'

const TONES: Record<Tone, string> = {
  orange: 'border-transparent bg-orange text-[#00213f]',
  cyan: 'border-transparent bg-cyan text-navy-dark',
  peach: 'border-transparent bg-peach text-text-primary',
  navy: 'border-transparent bg-navy text-white',
}

type Props = {
  icon: ReactNode
  value: ReactNode
  label: string
  tone?: Tone
  soft?: boolean
}

export default function StatCard({ icon, value, label, tone = 'orange', soft = false }: Props) {
  if (soft) {
    return (
      <div className="rounded-2xl border border-border bg-bg-card p-5 shadow-sm">
        <div className="flex items-center gap-2 text-text-muted">
          {icon}
          <p className="text-xs font-medium">{label}</p>
        </div>
        <p className="mt-1 font-heading text-3xl font-black text-text-primary">{value}</p>
      </div>
    )
  }

  return (
    <div className={`rounded-2xl border p-5 shadow-sm ${TONES[tone]}`}>
      <div className="flex items-center gap-2 opacity-80">
        {icon}
        <p className="text-xs font-medium">{label}</p>
      </div>
      <p className="mt-1 font-heading text-3xl font-black">{value}</p>
    </div>
  )
}
