import { useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'
import { useLottie } from 'lottie-react'
import { cn } from '../../lib/utils'

const REDUCED_MOTION =
  typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : null

interface LottieViewProps {
  src: string
  loop?: boolean
  autoplay?: boolean
  playInView?: boolean
  delay?: number
  className?: string
  onComplete?: () => void
}

export function LottieView({
  src,
  loop = true,
  autoplay = true,
  playInView = false,
  delay = 0,
  className,
  onComplete,
}: LottieViewProps) {
  const holderRef = useRef<HTMLDivElement>(null)
  const [data, setData] = useState<object | null>(null)
  const [play, setPlay] = useState(autoplay && !playInView)
  const inView = useInView(holderRef, { once: true, amount: 0.3 })
  const reduceMotion = REDUCED_MOTION?.matches ?? false

  useEffect(() => {
    if (playInView && inView && !reduceMotion) {
      const t = window.setTimeout(() => setPlay(true), delay)
      return () => window.clearTimeout(t)
    }
  }, [inView, playInView, reduceMotion, delay])

  const { View } = useLottie(
    {
      animationData: data ?? undefined,
      loop,
      autoplay: play && !reduceMotion,
      onComplete,
      renderer: 'svg',
    },
    { width: '100%', height: '100%' }
  )

  useEffect(() => {
    let active = true
    if (!play) return
    fetch(src)
      .then((r) => r.json())
      .then((d) => {
        if (active) setData(d)
      })
      .catch(() => {})
    return () => {
      active = false
    }
  }, [play, src])

  if (reduceMotion) return null

  return (
    <div
      ref={holderRef}
      className={cn('pointer-events-none aspect-square overflow-hidden', className)}
    >
      {data && play && View}
    </div>
  )
}