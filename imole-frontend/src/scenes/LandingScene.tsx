import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowRight, Trophy } from 'lucide-react'
import { LandingNav } from '../components/landing/LandingNav'
import { OrangeStrip } from '../components/landing/OrangeStrip'
import { GapSection } from '../components/landing/GapSection'
import { QuoteSection } from '../components/landing/QuoteSection'
import { ContextSection } from '../components/landing/ContextSection'
import { PreviewSection } from '../components/landing/PreviewSection'
import { FinalCTA } from '../components/landing/FinalCTA'
import { LandingFooter } from '../components/landing/LandingFooter'
import { ShowcaseSection } from '../components/landing/ShowcaseSection'
import { DotGrid } from '../components/landing/BackgroundPattern'
import { SparkleDots, GlowLamp } from '../components/doodles/Doodles'
import { useApp } from '../context/AppContext'
import { useT } from '../i18n/I18nContext'

export default function LandingScene() {
  const navigate = useNavigate()
  const { t } = useT()
  const { currentProfile } = useApp()

  const start = useCallback(() => {
    navigate(currentProfile ? '/app/challenge' : '/app/profile')
  }, [currentProfile, navigate])

  return (
    <main className="force-light relative min-h-dvh">
      <LandingNav />

      <section className="bg-landing-hero relative overflow-hidden">
        <DotGrid className="pointer-events-none absolute inset-0 opacity-[0.12]" />
        <SparkleDots className="pointer-events-none absolute inset-x-0 top-24 h-24 w-full opacity-60" />
        <div className="pointer-events-none absolute -right-32 -top-24 size-[28rem] rounded-full bg-cyan/15 blur-[110px]" />
        <div className="pointer-events-none absolute -bottom-40 -left-24 size-[26rem] rounded-full bg-periwinkle/20 blur-[110px]" />

        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 pb-16 pt-28 text-center md:pt-36">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-black uppercase tracking-[0.2em] text-orange"
          >
            {t('app.name')} · AI
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="display-mega mt-4 text-balance text-white"
          >
            {t('landing.hero.tagline')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.16 }}
            className="mt-5 max-w-xl text-sm leading-relaxed text-white/75 md:text-base"
          >
            {t('landing.hero.description')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22 }}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
          >
            <button onClick={start} className="cta-pill cursor-pointer bg-streak !text-navy hover:bg-peach">
              <span className="cta-pill__dot bg-navy" aria-hidden />
              {currentProfile ? t('home.todaysChallenge') : t('landing.beginJourney')}
              <ArrowRight className="size-5" />
            </button>
            <button
              onClick={() => navigate('/app/leaderboard')}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
            >
              <Trophy className="size-4" />
              {t('nav.leaderboard')}
            </button>
          </motion.div>

          <GlowLamp className="mt-10 size-28 opacity-90 md:size-36" />

          <p className="mt-6 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-white/50">
            {t('landing.showcase.swipe')}
          </p>
        </div>
      </section>

      <OrangeStrip />
      <GapSection />
      <QuoteSection />
      <ShowcaseSection />
      <ContextSection />
      <PreviewSection />
      <FinalCTA />
      <LandingFooter />
    </main>
  )
}
