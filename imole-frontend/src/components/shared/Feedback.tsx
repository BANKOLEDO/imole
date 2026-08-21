export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded-xl bg-surface-hover ${className}`} />
}

export function Spinner({ className = '' }: { className?: string }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={`inline-block size-6 animate-spin rounded-full border-[3px] border-accent-soft border-t-accent ${className}`}
    />
  )
}
