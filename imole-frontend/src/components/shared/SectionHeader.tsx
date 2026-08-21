import type { ReactNode } from 'react'

type Tone = 'navy' | 'orange' | 'cyan' | 'peach'

const DOTS: Record<Tone, string> = {
  navy: 'bg-navy',
  orange: 'bg-orange',
  cyan: 'bg-cyan',
  peach: 'bg-peach',
}

type Props = {
  tone?: Tone
  title: string
  subtitle?: string
  action?: ReactNode
}

export default function SectionHeader({ tone = 'navy', title, subtitle, action }: Props) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2.5">
        <span className={`size-2.5 rounded-full ${DOTS[tone]}`} />
        <div>
          <h2 className="font-heading text-lg font-bold text-text-primary">{title}</h2>
          {subtitle && <p className="text-xs text-text-muted">{subtitle}</p>}
        </div>
      </div>
      {action}
    </div>
  )
}
