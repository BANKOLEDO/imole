import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { WaveDivider } from './WaveDivider'
import { LottieView } from '../shared/LottieView'
import { lottie } from '../../lib/animations'
import { BrainWave } from './Doodles'
import { useT } from '../../i18n/I18nContext'
import { useApp } from '../../context/AppContext'

const NAVY = '#021628'

export function PreviewSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const navigate = useNavigate()
  const { t } = useT()
  const { currentProfile } = useApp()

  return (
    <section id="preview" ref={ref} className="relative overflow-hidden" style={{ background: NAVY }}>
      <BrainWave className="pointer-events-none absolute -left-6 top-1/3 size-24 text-white/10 md:size-32" />

      <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-orange">
              {t('landing.nav.preview')}
            </span>
            <h2
              className="display-mega mt-6 text-white"
              style={{ fontSize: 'clamp(2.2rem, 6vw, 4.5rem)' }}
            >
              {t('landing.preview.title1')}
              <span className="block text-orange">{t('landing.preview.title2')}</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/70 md:text-lg">
              {t('landing.preview.description')}
            </p>
            <button
              onClick={() => navigate(currentProfile ? '/app/challenge' : '/app/profile')}
              className="cta-pill mt-8 cursor-pointer"
              style={{ background: '#fff', color: '#002546' }}
            >
              <span className="cta-pill__dot dot-navy" aria-hidden />
              <span>{t('landing.preview.tryChallenge')}</span>
              <ArrowRight className="size-5" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24, rotate: 2 }}
            animate={isInView ? { opacity: 1, x: 0, rotate: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="rounded-[2rem] border border-black/10 bg-white p-7 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.7)] md:p-8">
              <div className="mb-4 flex items-center gap-2 text-xs text-text-muted">
                <span className="size-2 rounded-full bg-success" />
                <span>{t('landing.preview.challengeLabel')}</span>
              </div>

              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
                  {t('landing.preview.skillLabel')}
                </span>
                <span className="rounded-full border border-border px-3 py-1 text-xs text-text-muted">
                  {t('landing.preview.levelLabel')}
                </span>
              </div>

              <p className="text-base font-medium leading-relaxed text-text-primary">
                {t('landing.preview.challengeExample')}
              </p>

              <div className="mt-6 flex gap-2">
                <div className="flex h-12 flex-1 items-center rounded-xl border border-border bg-bg-surface px-4 text-sm text-text-muted">
                  {t('landing.preview.placeholder')}
                </div>
                <div className="flex size-12 items-center justify-center rounded-xl bg-accent text-accent-text">
                  <ArrowRight className="size-5" />
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute -right-4 -bottom-4 size-full -z-10 rounded-[2rem] border border-lime/30" />
          </motion.div>
        </div>
      </div>

      <div className="pointer-events-none absolute right-[5%] top-[12%] hidden w-28 animate-float-slow lg:block">
        <LottieView src={lottie.goal} className="drop-shadow-xl opacity-80" />
      </div>

      <WaveDivider fill="#fff4e6" />
    </section>
  )
}