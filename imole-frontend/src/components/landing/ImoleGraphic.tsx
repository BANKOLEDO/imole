import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'

const RAY_COUNT = 12
const RAYS = Array.from({ length: RAY_COUNT }, (_, i) => {
  const angle = (i / RAY_COUNT) * Math.PI * 2 - Math.PI / 2
  const len = 145 + (i % 3) * 12
  return { angle, len, r: 2 + (i % 2) * 0.5 }
})

const PEER_COUNT = 8
const PEERS = Array.from({ length: PEER_COUNT }, (_, i) => {
  const angle = (i / PEER_COUNT) * Math.PI * 2
  const radius = 120 + (i % 3) * 15
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
    type: ['triangle', 'diamond', 'circle', 'hexagon'][i % 4],
    phase: (i / PEER_COUNT) * Math.PI * 2,
    size: 5 + (i % 3) * 2,
  }
})

function PeerShape({
  x, y, type, size, phase,
}: {
  x: number; y: number; type: string; size: number
  phase: number
}) {
  const cx = 250
  const cy = 250
  const shape = (() => {
    switch (type) {
      case 'triangle':
        return <polygon points={`${cx + x},${cy + y - size * 1.3} ${cx + x - size * 1.15},${cy + y + size * 0.85} ${cx + x + size * 1.15},${cy + y + size * 0.85}`} fill="rgb(var(--accent) / 0.5)" />
      case 'diamond':
        return <rect x={cx + x - size * 0.85} y={cy + y - size * 0.85} width={size * 1.7} height={size * 1.7} rx={1.5} transform={`rotate(45 ${cx + x} ${cy + y})`} fill="rgb(var(--accent) / 0.4)" />
      case 'circle':
        return <circle cx={cx + x} cy={cy + y} r={size} fill="rgb(var(--accent) / 0.35)" />
      case 'hexagon':
        return (
          <polygon
            points={Array.from({ length: 6 }, (_, i) => {
              const a = (i / 6) * Math.PI * 2 - Math.PI / 2
              return `${cx + x + Math.cos(a) * size * 1.1},${cy + y + Math.sin(a) * size * 1.1}`
            }).join(' ')}
            fill="rgb(var(--accent) / 0.45)"
          />
        )
      default:
        return null
    }
  })()

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.5 + phase * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    >
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20 - phase, ease: 'linear' }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      >
        {shape}
      </motion.g>
    </motion.g>
  )
}

export function ImoleGraphic({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 })

  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6])

  const handleMouse = (e: React.PointerEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMouse}
      onPointerLeave={handleLeave}
      className={`relative cursor-pointer select-none ${className ?? ''}`}
      style={{ perspective: 800 }}
    >
      <motion.svg
        viewBox="0 0 500 500"
        className="h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ rotateX, rotateY }}
      >
        <circle cx={250} cy={250} r={190} stroke="rgb(var(--accent) / 0.08)" strokeWidth="1" />
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 60, ease: 'linear' }}
          style={{ transformOrigin: '250px 250px' }}
        >
          <circle cx={250} cy={250} r={150} stroke="rgb(var(--accent) / 0.1)" strokeWidth="0.5" strokeDasharray="4 6" />
        </motion.g>
        <motion.g
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 45, ease: 'linear' }}
          style={{ transformOrigin: '250px 250px' }}
        >
          <circle cx={250} cy={250} r={100} stroke="rgb(var(--accent) / 0.12)" strokeWidth="0.5" strokeDasharray="2 5" />
        </motion.g>

        <motion.g
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
          style={{ transformOrigin: '250px 250px' }}
        >
          {RAYS.map((ray, i) => {
            const cx = 250
            const cy = 250
            const x2 = Math.cos(ray.angle) * ray.len
            const y2 = Math.sin(ray.angle) * ray.len
            return (
              <motion.g
                key={`ray-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: i * 0.1 }}
              >
                <line
                  x1={cx} y1={cy}
                  x2={cx + x2} y2={cy + y2}
                  stroke="rgb(var(--accent) / 0.25)"
                  strokeWidth={0.8 + (i % 3) * 0.4}
                />
                <circle
                  cx={cx + x2} cy={cy + y2}
                  r={ray.r}
                  fill="rgb(var(--accent) / 0.4)"
                />
              </motion.g>
            )
          })}
        </motion.g>

        <motion.g
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.circle
            cx={250} cy={250} r={46}
            fill="rgb(var(--accent) / 0.12)"
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle
            cx={250} cy={250} r={36}
            fill="rgb(var(--accent) / 0.18)"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          />
          <motion.circle
            cx={250} cy={250} r={26}
            fill="rgb(var(--accent) / 0.35)"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
          />
          <motion.circle
            cx={250} cy={250} r={18}
            fill="rgb(var(--accent))"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
          />
          <motion.circle
            cx={250} cy={250} r={7}
            fill="rgb(var(--accent-text))"
            opacity="0.7"
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.g>

        {PEERS.map((peer, i) => (
          <PeerShape key={`peer-${i}`} x={peer.x} y={peer.y} type={peer.type} size={peer.size} phase={peer.phase} />
        ))}

        <motion.path
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 1, pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
          d="M 100 440 Q 250 380 400 440"
          stroke="rgb(var(--accent) / 0.2)"
          strokeWidth="1"
          fill="none"
        />
        <motion.path
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 1, pathLength: 1 }}
          transition={{ duration: 1.2, delay: 1, ease: 'easeOut' }}
          d="M 125 460 Q 250 415 375 460"
          stroke="rgb(var(--accent) / 0.15)"
          strokeWidth="0.5"
          fill="none"
        />
      </motion.svg>
    </div>
  )
}
