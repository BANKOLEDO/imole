import type { HTMLAttributes } from 'react'

const COLORS = [
  'bg-periwinkle',
  'bg-cyan',
  'bg-orange',
  'bg-success',
  'bg-bodyblue',
  'bg-pink',
]

type Size = 8 | 9 | 10 | 12 | 14

export default function Avatar({
  name,
  size = 10,
  className = '',
  ...props
}: HTMLAttributes<HTMLDivElement> & { name: string; size?: Size }) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const colorIndex =
    name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) % COLORS.length

  return (
    <div
      role="img"
      aria-label={name}
      className={`flex shrink-0 items-center justify-center rounded-2xl font-heading font-bold text-white ${COLORS[colorIndex]} size-${size} ${className}`}
      {...props}
    >
      {initials || '?'}
    </div>
  )
}
