export function DotGrid({ className }: { className?: string }) {
  return (
    <svg className={className} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <defs>
        <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.8" className="fill-current text-border/40" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots)" />
    </svg>
  )
}

export function ZigzagLine({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 1200 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0 20 L30 0 L60 20 L90 0 L120 20 L150 0 L180 20 L210 0 L240 20 L270 0 L300 20 L330 0 L360 20 L390 0 L420 20 L450 0 L480 20 L510 0 L540 20 L570 0 L600 20 L630 0 L660 20 L690 0 L720 20 L750 0 L780 20 L810 0 L840 20 L870 0 L900 20 L930 0 L960 20 L990 0 L1020 20 L1050 0 L1080 20 L1110 0 L1140 20 L1170 0 L1200 20"
        className="stroke-border/30"
        fill="none"
        strokeWidth="1"
      />
    </svg>
  )
}

export function CirclePattern({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="80" className="stroke-accent/8" fill="none" strokeWidth="1" />
      <circle cx="100" cy="100" r="60" className="stroke-accent/6" fill="none" strokeWidth="1" />
      <circle cx="100" cy="100" r="40" className="stroke-accent/5" fill="none" strokeWidth="1" />
      <circle cx="100" cy="100" r="20" className="stroke-accent/4" fill="none" strokeWidth="1" />
    </svg>
  )
}

export function AngleBrackets({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 20 L10 50 L30 80" className="stroke-accent/10" fill="none" strokeWidth="2" strokeLinecap="round" />
      <path d="M70 20 L90 50 L70 80" className="stroke-accent/10" fill="none" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

const STARS = Array.from({ length: 60 }, () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  r: 0.5 + Math.random() * 1.5,
  delay: Math.random() * 5,
  duration: 2 + Math.random() * 3,
}))

export function StarField({ className }: { className?: string }) {
  return (
    <div className={`pointer-events-none fixed inset-0 overflow-hidden ${className ?? ''}`} aria-hidden>
      <svg width="100%" height="100%" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="star-glow">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {STARS.map((star, i) => (
          <circle
            key={i}
            cx={`${star.x}%`}
            cy={`${star.y}%`}
            r={star.r}
            className="text-text-muted"
            fill="currentColor"
            opacity="0.2"
            filter="url(#star-glow)"
          >
            <animate
              attributeName="opacity"
              values="0.1;0.35;0.1"
              dur={`${star.duration}s`}
              begin={`${star.delay}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="r"
              values={`${star.r};${star.r * 1.4};${star.r}`}
              dur={`${star.duration}s`}
              begin={`${star.delay}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>
    </div>
  )
}
