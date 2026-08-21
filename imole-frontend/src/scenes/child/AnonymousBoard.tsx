import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { Crown, Medal, Award } from 'lucide-react'
import Button from '../../components/shared/Button'
import { Spinner } from '../../components/shared/Feedback'
import PageHero from '../../components/shared/PageHero'
import { api } from '../../lib/api'
import { useApp } from '../../context/AppContext'
import { useT } from '../../i18n/I18nContext'
import { localizeNumber } from '../../i18n/numbers'

type Entry = {
  profileId: string
  name: string
  points: number
  rank?: number
}

export default function AnonymousBoard() {
  const { t, lang } = useT()
  const { currentProfile } = useApp()
  const [entries, setEntries] = useState<Entry[] | null>(null)

  useEffect(() => {
    api<Entry[]>('/leaderboard')
      .then(setEntries)
      .catch(() => setEntries([]))
  }, [])

  const myRank = entries?.find((e) => e.profileId === currentProfile?.id)?.rank

  return (
    <div className="container-main space-y-6 pb-10">
      <PageHero
        className="-mx-4 md:-mx-8"
        eyebrow={t('leaderboard.title')}
        title={t('leaderboard.subtitle')}
        actions={
          myRank ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-bold">
              <Award className="size-3.5" />
              {t('leaderboard.yourRank')}: #{localizeNumber(myRank, lang)}
            </span>
          ) : undefined
        }
      />

      {!entries ? (
        <div className="flex justify-center py-12">
          <Spinner />
        </div>
      ) : entries.length === 0 ? (
        <div className="space-y-4 py-10 text-center">
          <p className="text-sm text-text-muted">{t('leaderboard.empty')}</p>
          <Link to="/challenge">
            <Button variant="orange">{t('leaderboard.emptyCta')}</Button>
          </Link>
        </div>
      ) : (
        <ol className="space-y-2.5">
          {entries.map((entry, i) => (
            <motion.li
              key={entry.profileId}
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`flex items-center gap-3 rounded-2xl border px-4 py-3 shadow-sm ${
                entry.profileId === currentProfile?.id
                  ? 'border-accent/40 bg-accent-soft'
                  : 'border-border bg-bg-card'
              }`}
            >
              <span className="w-8 shrink-0 text-center">
                {i === 0 ? (
                  <Crown className="mx-auto size-5 text-streak" />
                ) : i === 1 ? (
                  <Medal className="mx-auto size-5 text-text-muted" />
                ) : i === 2 ? (
                  <Medal className="mx-auto size-5 text-orange" />
                ) : (
                  <span className="font-heading font-black text-text-muted">{localizeNumber(i + 1, lang)}</span>
                )}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-text-primary">{entry.name}</p>
              </div>
              <span className="rounded-full bg-streak-soft px-2.5 py-1 text-xs font-black text-streak">
                {localizeNumber(entry.points, lang)} {t('leaderboard.points')}
              </span>
            </motion.li>
          ))}
        </ol>
      )}
    </div>
  )
}
