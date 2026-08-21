import { useEffect, useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0

export function CursorFx() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const dotX = useSpring(cursorX, { stiffness: 400, damping: 30 })
  const dotY = useSpring(cursorY, { stiffness: 400, damping: 30 })
  const ringX = useSpring(cursorX, { stiffness: 200, damping: 20 })
  const ringY = useSpring(cursorY, { stiffness: 200, damping: 20 })
  const isHovering = useRef(false)

  const onMouseMove = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX)
    cursorY.set(e.clientY)
  }, [cursorX, cursorY])

  useEffect(() => {
    if (isTouchDevice()) return

    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [onMouseMove])

  useEffect(() => {
    if (isTouchDevice()) return

    const handleOver = () => { isHovering.current = true }
    const handleOut = () => { isHovering.current = false }

    document.querySelectorAll('a, button, [data-cursor]').forEach((el) => {
      el.addEventListener('mouseenter', handleOver)
      el.addEventListener('mouseleave', handleOut)
    })

    return () => {
      document.querySelectorAll('a, button, [data-cursor]').forEach((el) => {
        el.removeEventListener('mouseenter', handleOver)
        el.removeEventListener('mouseleave', handleOut)
      })
    }
  }, [])

  if (isTouchDevice()) return null

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[9999] size-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/30 transition-[width,height] duration-200"
        style={{ left: ringX, top: ringY }}
      />
      <motion.div
        className="pointer-events-none fixed z-[9999] size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/60"
        style={{ left: dotX, top: dotY }}
      />
    </>
  )
}
