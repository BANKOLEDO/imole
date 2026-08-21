import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { WaveDivider } from './WaveDivider'
import { BrokenChain } from './Doodles'
import { useT } from '../../i18n/I18nContext'

const NAVY = '#002444'
const CREAM = '#fff4e6'

const itemAccents = ['#002444', '#ff8a00']

export function GapSection() {
  const { t } = useT()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const items = [
    { title: t('landing.gap.item1.title'), desc: t('landing.gap.item1.desc') },
    { title: t('landing.gap.item2.title'), desc: t('landing.gap.item2.desc') },
  ]

  return (
    <section id="gap" ref={ref} className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <span
            className="inline-flex items-center gap-2 rounded-full bg-[#ff8a00]/60 px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
            style={{ color: NAVY }}
          >
            <span className="size-1.5 rounded-full bg-[#002444]" />
            {t('landing.nav.impact')}
          </span>
          <h2
            className="display-mega mt-6 text-navy"
            style={{ fontSize: 'clamp(2.6rem, 8vw, 6.5rem)' }}
          >
            <span className="block">Imole</span>
            <span className="block">
              bridges <span className="text-stroke-navy">the</span>
            </span>
            <span className="block">gap</span>
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-2 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-block">
              <p className="display-mega text-accent" style={{ fontSize: 'clamp(6rem, 16vw, 11rem)' }}>
                {t('landing.gap.stat')}
              </p>
              <div className="mt-2 h-1.5 w-full rounded-full bg-[#ff8a00]" />
            </div>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-text-secondary md:text-lg">
              {t('landing.gap.statDesc')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            {items.map((item, i) => (
              <div
                key={item.title}
                className="group flex items-start gap-4 rounded-2xl border-2 border-black/10 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-black/25 hover:shadow-lg"
              >
                <div
                  className="mt-1 flex size-12 shrink-0 items-center justify-center rounded-xl font-heading text-sm font-bold text-white"
                  style={{ background: itemAccents[i % itemAccents.length] }}
                >
                  0{i + 1}
                </div>
                <div>
                  <p className="font-heading text-base font-semibold text-text-primary md:text-lg">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-text-secondary">{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <BrokenChain className="pointer-events-none absolute -right-6 bottom-8 size-24 text-black/10 md:size-32" />
      <WaveDivider fill={CREAM} />
    </section>
  )
}
