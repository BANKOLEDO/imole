import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Rocket, Star } from 'lucide-react'
import { WaveDivider } from './WaveDivider'
import { useT } from '../../i18n/I18nContext'
import { useApp } from '../../context/AppContext'

const NAVY = '#002444'

export function OrangeStrip() {
  const navigate = useNavigate()
  const { t } = useT()
  const { currentProfile } = useApp()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#ff8a00]">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-14 text-center md:flex-row md:justify-between md:py-16 md:text-left">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl font-heading text-2xl font-bold leading-snug md:text-4xl"
          style={{ color: NAVY }}
        >
          {t('landing.gap.item3.desc')}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex shrink-0 items-center gap-3 md:mr-28"
        >
          <button
            onClick={() => navigate(currentProfile ? '/app/challenge' : '/app/profile')}
            className="cta-pill cursor-pointer"
            style={{ background: NAVY }}
          >
            <span className="cta-pill__dot" aria-hidden />
            <span className="cta-pill__label">{t('landing.preview.tryChallenge')}</span>
            <ArrowRight className="size-5" />
          </button>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute right-[5%] top-6 z-10 hidden md:block">
        <div className="relative animate-float-slow">
          <span className="absolute -inset-4 rounded-full border-2 border-dashed border-[#002444]/25" />
          <div className="relative flex size-24 items-center justify-center rounded-full bg-white shadow-[0_24px_50px_-20px_rgba(0,33,63,0.55)]">
            <div className="flex size-16 items-center justify-center rounded-full bg-[#002444]">
              <Rocket className="size-8 text-orange" />
            </div>
          </div>
          <Star className="absolute -top-1 -left-2 size-6 fill-[#002444] text-[#002444]" />
          <Star className="absolute -right-3 top-1/2 size-4 fill-[#002444]/70 text-[#002444]/70" />
        </div>
      </div>

      <WaveDivider fill="#ffffff" />
    </section>
  )
}
