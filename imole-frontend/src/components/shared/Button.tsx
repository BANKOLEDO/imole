import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'outline-light'
  | 'ghost'
  | 'orange'
  | 'danger'

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-accent text-accent-text hover:bg-navy-deep',
  secondary: 'bg-accent-soft text-accent hover:bg-accent-soft/70',
  outline: 'border border-border text-text-primary hover:border-accent/30 hover:bg-accent-soft/50',
  'outline-light': 'border border-white/45 bg-transparent text-white hover:bg-white/10',
  ghost: 'text-accent hover:bg-accent-soft',
  orange: 'bg-orange text-[#00213f] hover:bg-orange/90',
  danger: 'bg-error text-white hover:bg-error/90',
}

const SIZES = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-3 text-sm',
  lg: 'px-6 py-3.5 text-base',
}

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  size?: keyof typeof SIZES
  children: ReactNode
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: Props) {
  return (
    <button
      className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl font-heading font-bold transition disabled:cursor-not-allowed disabled:opacity-50 ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
