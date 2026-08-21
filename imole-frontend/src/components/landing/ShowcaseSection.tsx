import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { skills } from './skillIcons'
import { useT } from '../../i18n/I18nContext'

const NAVY = '#002444'

const TRACK = [
  { tab: '#7580ef', chip: 'bg-[#7580ef]/15' },
  { tab: '#ff8a00', chip: 'bg-[#ff8a00]/15' },
  { tab: '#00b16a', chip: 'bg-[#00b16a]/15' },
  { tab: '#00cede', chip: 'bg-[#00cede]/15' },
  { tab: '#ff0085', chip: 'bg-[#ff0085]/15' },
]

function SkillCard({ skill, index }: { skill: (typeof skills)[number]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const { t } = useT()
  const palette = TRACK[index % TRACK.length]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      className="flex w-[300px] shrink-0 snap-start flex-col sm:w-[320px]"
    >
      <div
        className="relative flex items-center gap-2 rounded-t-[18px] px-4 py-2"
        style={{ background: palette.tab }}
      >
        <span className="size-1.5 rounded-full bg-white/70" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">
          {t('landing.showcase.curriculum')}
        </span>
        <span className="ml-auto font-heading text-xs font-bold text-white/90">0{index + 1}</span>
      </div>

      <div
        className="flex flex-1 flex-col rounded-b-[18px] border border-t-0 bg-white p-6"
        style={{ borderWidth: 3, borderTopWidth: 0, borderColor: 'rgba(0,0,0,0.9)' }}
      >
        <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${palette.chip} rounded-full px-3 py-1`}>
          <span style={{ color: palette.tab }}>{t('landing.showcase.skill')} {String(index + 1).padStart(2, '0')}</span>
        </div>

        <div className="mt-4 flex size-14 items-center justify-center rounded-2xl" style={{ background: `${palette.tab}1f` }}>
          <skill.Icon className="size-8" style={{ color: palette.tab }} />
        </div>

        <h3 className="mt-4 font-heading text-lg font-bold" style={{ color: NAVY }}>
          {t(`skill.${skill.id}.title`)}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-text-secondary">{t(`skill.${skill.id}.desc`)}</p>

        <div className="mt-auto pt-6">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-[#002444]/50">
            <span>zero</span>
            <span>pro</span>
          </div>
          <div className="mt-1.5 flex h-2.5 items-center gap-1">
            <div className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-[#002444]/10">
              <div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ background: `linear-gradient(90deg, ${palette.tab}, #00cede)`, width: `${45 + index * 12}%` }}
              />
            </div>
            <span className="block size-2.5 rotate-45 rounded-[2px]" style={{ background: palette.tab }} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function ShowcaseSection() {
  const { t } = useT()
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-40px' })

  return (
    <section id="showcase" className="relative overflow-hidden bg-gradient-to-b from-[#fff4e6] to-[#ffffff]">
      <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between md:mb-14"
        >
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">
              {t('landing.showcase.curriculum')}
            </span>
            <h2
              className="display-mega mt-3 text-navy"
              style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)' }}
            >
              {t('landing.showcase.title1')}
              <span className="block text-accent">{t('landing.showcase.title2')}</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-text-secondary md:text-base">
            {t('landing.showcase.description')} <span className="font-medium text-text-primary">{t('landing.showcase.description2')}</span>
          </p>
        </motion.div>

        <div className="flex gap-5 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none">
          {skills.map((skill, i) => (
            <SkillCard key={skill.id} skill={skill} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mt-4 flex items-center justify-center gap-1.5 text-xs text-text-muted md:hidden"
        >
          <span>{t('landing.showcase.swipe')}</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </div>
    </section>
  )
}