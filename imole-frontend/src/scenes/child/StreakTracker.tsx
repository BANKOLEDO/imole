import { motion } from 'motion/react'
import { Flame, Snowflake } from 'lucide-react'
import { Card, CardContent } from '../../components/shared/Card'
import { useT } from '../../i18n/I18nContext'
import { localizeNumber } from '../../i18n/numbers'
import type { SessionMemory } from '../../context/AppContext'

type Props = { memory: SessionMemory | null }

export default function StreakTracker({ memory }: Props) {
  const { t, lang } = useT()
  const current = memory?.streak.current ?? 0
  const longest = memory?.streak.longest ?? 0
  const freezes = memory?.freezes ?? 1
  const nextMilestone =
    [3, 7, 14, 21, 30, 50, 100].find((m) => m >= current) ?? 100

  return (
    <Card>
      <CardContent className="flex items-center gap-4 py-4">
        <motion.div
          key={current}
          initial={{ scale: 0.6 }}
          animate={{ scale: [0.6, 1.15, 1] }}
          transition={{ duration: 0.4 }}
          className={`flex size-14 shrink-0 items-center justify-center rounded-2xl ${
            current > 0 ? 'bg-streak-soft' : 'bg-bg-surface'
          }`}
        >
          <Flame className={`size-7 ${current > 0 ? 'text-streak' : 'text-text-muted'}`} />
        </motion.div>

        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">
            {t('home.yourStreak')}
          </p>
          <p className="font-heading text-2xl font-black text-text-primary">
            {localizeNumber(current, lang)}{' '}
            <span className="text-sm font-bold text-text-secondary">{t('streak.day')}</span>
          </p>
          {current > 0 && (
            <p className="mt-0.5 truncate text-xs font-semibold text-streak">
              {t(`streak.milestone.${nextMilestone}`)}
            </p>
          )}
        </div>

        <div className="flex flex-col items-end gap-1 text-xs text-text-muted">
          <span className="flex items-center gap-1">
            <Flame className="size-3 text-streak/70" />
            {t('streak.longest')}: {localizeNumber(longest, lang)}
          </span>
          <span className="flex items-center gap-1">
            <Snowflake className="size-3 text-cyan" />
            {t('streak.freezes', { count: localizeNumber(freezes, lang) })}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
