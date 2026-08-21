import { useRef, useCallback } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { LottieView } from '../shared/LottieView'
import { lottie } from '../../lib/animations'
import { WaveDivider } from './WaveDivider'
import { DotGrid } from './BackgroundPattern'
import { useApp } from '../../context/AppContext'
import { useT } from '../../i18n/I18nContext'

const LIME = '#ff8a00'

export function HeroSection() {
  const navigate = useNavigate()
  const { currentProfile } = useApp()
  const { t } = useT()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const bgOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const handleStart = useCallback(() => {
    if (currentProfile) navigate('/app/challenge')
    else navigate('/app/profile')
  }, [currentProfile, navigate])

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#002444]">
      <motion.div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg,#002546 0%,#021628 100%)', y: bgY }}
      />

      {/* decorative light field */}
      <div className="pointer-events-none absolute inset-0">
        <DotGrid className="opacity-[0.14]" />
        <div className="absolute -top-24 right-[-12%] size-[34rem] rounded-full bg-cyan/20 blur-[120px]" />
        <div className="absolute bottom-[-14%] left-[-10%] size-[32rem] rounded-full bg-periwinkle/20 blur-[120px]" />
        <div className="absolute top-[8%] left-[40%] size-[24rem] rounded-full bg-orange/10 blur-[140px]" />
      </div>

      <motion.div style={{ opacity: bgOpacity }} className="relative z-10 mx-auto flex max-w-6xl flex-col items-center justify-center px-4 pb-20 pt-28 text-center md:pt-32">
        <h1
          className="display-mega mt-6 text-white text-balance"
          style={{ fontSize: 'clamp(3rem, 9vw, 8rem)' }}
        >
          {t('landing.hero.tagline')}
        </h1>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
          {t('landing.hero.description')}
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <button
            onClick={handleStart}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-7 py-3.5 font-heading text-base font-semibold text-[#002444] shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#e7ebf8]"
          >
            {currentProfile ? t('home.todaysChallenge') : t('landing.beginJourney')}
            <ArrowRight className="size-5" />
          </button>
          <button
            onClick={() => document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' })}
            className="cta-pill cta-pill--ghost cursor-pointer"
          >
            {t('landing.exploreSkills')}
          </button>
        </div>
      </motion.div>

      {/* centerpiece light */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 z-0 -translate-x-1/2 w-[min(78vw,30rem)] opacity-[0.55]">
        <div className="absolute inset-0 translate-y-20 rounded-full bg-orange/10 blur-[70px]" />
        <LottieView src={lottie.lightbulb} className="w-full drop-shadow-[0_0_40px_rgba(0,206,222,0.35)]" />
      </div>

      <WaveDivider fill={LIME} />
    </section>
  )
}