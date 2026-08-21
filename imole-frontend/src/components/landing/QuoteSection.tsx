import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { useT } from '../../i18n/I18nContext'

const NAVY = '#002444'

export function QuoteSection() {
  const { t } = useT()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#fff4e6]">
      <div className="mx-auto max-w-5xl px-4 py-20 text-center md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mx-auto mb-8 flex items-center justify-center gap-4" aria-hidden>
            <span className="h-px w-16 bg-pink/60 md:w-24" />
            <span className="size-2 rotate-45 bg-pink" />
            <span className="h-px w-16 bg-pink/60 md:w-24" />
          </div>

          <blockquote
            className="font-heading font-medium leading-relaxed md:leading-snug"
            style={{
              color: NAVY,
              fontSize: 'clamp(1.5rem, 3.6vw, 2.75rem)',
            }}
          >
            {t('landing.quote.text')}
          </blockquote>

          <div className="mt-8 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-[#002444]/25" />
            <span className="text-sm font-semibold uppercase tracking-widest text-[#002444]/60">
              {t('landing.quote.author')}
            </span>
            <span className="h-px w-10 bg-[#002444]/25" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}