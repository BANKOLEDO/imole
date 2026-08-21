import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { LottieView } from '../shared/LottieView'
import { lottie } from '../../lib/animations'
import { SparkleDots } from './Doodles'
import { CirclePattern } from './BackgroundPattern'
import { useT } from '../../i18n/I18nContext'

const NAVY = '#021628'

export function FinalCTA() {
  const navigate = useNavigate()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const { t } = useT()

  return (
    <section id="cta" ref={ref} className="relative overflow-hidden bg-[#fff4e6]">
      <CirclePattern className="pointer-events-none absolute -left-10 bottom-0 size-72 text-[#002444]/10" />
      <SparkleDots className="pointer-events-none absolute right-6 top-10 size-20 text-periwinkle md:size-28" />

      <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 30, rotate: -2 }}
          animate={isInView ? { opacity: 1, y: 0, rotate: -1 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[2.5rem] border border-black/10 bg-white px-6 py-14 text-center shadow-[0_50px_120px_-40px_rgba(0,33,63,0.45)] md:px-16 md:py-20"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#ff8a00]/20 to-transparent" />

          <div className="pointer-events-none absolute left-8 top-8 hidden w-40 animate-float md:block">
            <LottieView src={lottie.goal} className="opacity-90" />
          </div>
          <div className="pointer-events-none absolute bottom-6 right-8 hidden w-40 animate-float-slow md:block">
            <LottieView src={lottie.confetti} className="opacity-80" />
          </div>

          <div className="relative mx-auto max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#002444] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-orange">
              <span className="size-1.5 rounded-full bg-orange" />
              {t('app.name')}
            </span>
            <h2
              className="display-mega mt-6 text-navy"
              style={{ fontSize: 'clamp(2.6rem, 7vw, 5.5rem)' }}
            >
              {t('landing.final.ready')}
            </h2>
            <p className="mt-6 mx-auto max-w-xl text-base leading-relaxed text-text-secondary md:text-lg">
              {t('landing.final.description')}
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                onClick={() => navigate('/app/profile')}
                className="cta-pill cursor-pointer"
                style={{ background: NAVY }}
              >
                <span className="cta-pill__dot" aria-hidden />
                <span>{t('landing.final.startJourney')}</span>
                <ArrowRight className="size-5" />
              </button>
              <button
                onClick={() => navigate('/app/leaderboard')}
                className="cta-pill cta-pill--light cursor-pointer"
              >
                {t('landing.final.seeLeaderboard')}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}