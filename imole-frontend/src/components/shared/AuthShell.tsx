import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export default function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <div className="bg-landing-hero relative hidden w-[42%] flex-col justify-between p-10 text-white lg:flex">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="Imole logo" className="size-10" />
          <span className="font-heading text-xl font-bold">Imole</span>
        </Link>
        <div>
          <h2 className="display-mega text-4xl">
            Be the <span className="text-stroke-cream">Light</span>
          </h2>
          <p className="mt-3 max-w-xs text-sm text-white/70">
            Daily life-skills challenges for Nigerian children — in their language,
            at their pace.
          </p>
        </div>
        <p className="text-xs text-white/50">TiT 6.0 · EdTech</p>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <Link to="/" className="mb-8 flex items-center gap-2 lg:hidden">
            <img src="/logo.svg" alt="Imole logo" className="size-9" />
            <span className="font-heading text-lg font-bold text-text-primary">Imole</span>
          </Link>
          <h1 className="font-heading text-2xl font-bold text-text-primary">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-text-muted">{subtitle}</p>}
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </div>
  )
}
