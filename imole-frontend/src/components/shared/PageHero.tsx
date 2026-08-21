import type { ReactNode } from 'react'

type Props = {
  eyebrow?: ReactNode
  title: ReactNode
  subtitle?: ReactNode
  actions?: ReactNode
  decoration?: ReactNode
  wave?: string
  className?: string
}

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  actions,
  decoration,
  wave,
  className = '',
}: Props) {
  return (
    <section className={`bg-landing-hero relative overflow-hidden text-white ${className}`}>
      {decoration && (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {decoration}
        </div>
      )}
      <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-3 px-6 pt-10 pb-16 text-center">
        {eyebrow && (
          <p className="text-xs font-bold uppercase tracking-widest text-orange">{eyebrow}</p>
        )}
        <h1 className="font-heading text-3xl font-bold sm:text-4xl">{title}</h1>
        {subtitle && (
          <p className="max-w-md text-balance text-sm text-white/70">{subtitle}</p>
        )}
        {actions && <div className="mt-2 flex flex-wrap justify-center gap-3">{actions}</div>}
      </div>
      {wave && (
        <svg
          aria-hidden
          viewBox="0 0 1440 64"
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-0 h-6 w-full"
        >
          <path
            d="M0 32C240 0 480 0 720 32s480 32 720 0v32H0V32Z"
            fill={wave}
          />
        </svg>
      )}
    </section>
  )
}
