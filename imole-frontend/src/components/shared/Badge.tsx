import type { HTMLAttributes } from 'react'

type Tone = 'accent' | 'orange' | 'streak' | 'success'

const TONES: Record<Tone, string> = {
  accent: 'bg-accent-soft text-accent',
  orange: 'bg-orange/15 text-orange',
  streak: 'bg-streak-soft text-streak',
  success: 'bg-success/15 text-success',
}

export default function Badge({
  tone = 'accent',
  className = '',
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ${TONES[tone]} ${className}`}
      {...props}
    />
  )
}
