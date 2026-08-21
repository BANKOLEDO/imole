import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { WaveDivider } from './WaveDivider'
import { CirclePattern } from './BackgroundPattern'
import { useT } from '../../i18n/I18nContext'

const NAVY = '#021628'

export function ContextSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const { t } = useT()

  const tags = [
    t('landing.context.tag1'),
    t('landing.context.tag2'),
    t('landing.context.tag3'),
  ]

  const images = [
    'https://images.unsplash.com/photo-1588072432836-e10032774350?w=600&q=80&auto=format&fit',
    'https://images.unsplash.com/photo-1628198661856-102874fb9d82?w=600&auto=format&fit',
    'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&q=80&auto=format&fit',
    'https://images.unsplash.com/photo-1543300055-4a87568503c8?q=80&w=1170&auto=format&fit',
  ]

  return (
    <section id="context" ref={ref} className="relative overflow-hidden" style={{ background: NAVY }}>
      <WaveDivider fill="#ffffff" flip />

      <CirclePattern className="pointer-events-none absolute -right-10 top-40 size-60 text-white/10" />

      <div className="mx-auto max-w-6xl px-4 py-24 md:py-32">
        <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-orange">
              {t('landing.nav.about')}
            </span>
            <h2
              className="display-mega mt-6 text-white"
              style={{ fontSize: 'clamp(2.4rem, 6.5vw, 5rem)' }}
            >
              {t('landing.context.title1')}
              <span className="block text-orange">{t('landing.context.title2')}</span>
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/70 md:text-lg">
              {t('landing.context.description')}
            </p>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/85"
                >
                  <span className="size-1.5 rounded-full bg-orange" />
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {images.map((src, i) => (
                <div
                  key={src}
                  className="overflow-hidden rounded-3xl border border-white/15 shadow-2xl"
                  style={{
                    transform: i % 2 === 0 ? 'rotate(-2deg)' : 'rotate(2deg)',
                    marginTop: i % 2 === 1 ? '2.5rem' : 0,
                  }}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute -bottom-6 -left-6 -z-10 size-40 rounded-full bg-periwinkle/30 blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}