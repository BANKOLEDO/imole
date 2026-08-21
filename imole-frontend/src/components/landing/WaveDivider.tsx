interface WaveDividerProps {
  fill?: string
  flip?: boolean
  className?: string
}

export function WaveDivider({ fill = '#ffffff', flip = false, className }: WaveDividerProps) {
  return (
    <div
      className={`pointer-events-none absolute left-0 right-0 z-10 ${flip ? 'top-0 rotate-180' : 'bottom-0'} ${className ?? ''}`}
      aria-hidden
    >
      <svg
        className="block h-[clamp(36px,7vw,96px)] w-full"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill={fill}
          d="M0,45 C150,95 330,10 540,38 C750,66 930,22 1125,40 C1260,52 1360,30 1440,44 L1440,100 L0,100 Z"
        />
      </svg>
    </div>
  )
}
