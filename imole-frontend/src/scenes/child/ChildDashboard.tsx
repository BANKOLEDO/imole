import { useEffect, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { Zap, MessageCircleHeart, Trophy, Play } from 'lucide-react'
import Button from '../../components/shared/Button'
import SectionHeader from '../../components/shared/SectionHeader'
import StatCard from '../../components/shared/StatCard'
import { Spinner } from '../../components/shared/Feedback'
import PageHero from '../../components/shared/PageHero'
import { useApp } from '../../context/AppContext'
import { useT } from '../../i18n/I18nContext'
import { localizeNumber } from '../../i18n/numbers'
import StreakTracker from './StreakTracker'

const SKILL_ICONS: Record<string, string> = {
  'mental-math': '#7580ef',
  'persuasive-speaking': '#ff8a00',
  'financial-literacy': '#00b16a',
  'creative-problem-solving': '#00cede',
  'emotional-intelligence': '#e24141',
}

export default function ChildDashboard() {
  const { t, lang } = useT()
  const { currentProfile, memory, dailyChallenge, loadingChallenge, loadDailyChallenge } = useApp()

  useEffect(() => {
    if (currentProfile && !dailyChallenge) void loadDailyChallenge()
  }, [currentProfile, dailyChallenge, loadDailyChallenge])

  if (!currentProfile) {
    return (
      <div className="container-main space-y-4 py-10 text-center">
        <h1 className="font-heading text-2xl font-bold text-text-primary">
          {t('home.noProfile')}
        </h1>
        <Button variant="orange" onClick={() => window.location.assign('/profile')}>
          <Play className="size-4" />
          {t('nav.profile')}
        </Button>
      </div>
    )
  }

  const done = memory?.challenges.length ?? 0
  const scores = memory?.challenges.map((c) => c.score) ?? []
  const avg = scores.length
    ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    : null
  const motivation = t('home.motivation')
  const quote = Array.isArray(motivation)
    ? motivation[currentProfile.name.length % motivation.length]
    : String(motivation)

  return (
    <div className="container-main space-y-6 pb-10">
      <PageHero
        className="-mx-4 md:-mx-8"
        eyebrow={t('home.welcome')}
        title={currentProfile.name}
        subtitle={quote}
        decoration={
          <div className="flex size-20 items-center justify-center rounded-full bg-white/15 font-heading text-3xl font-black">
            {currentProfile.name[0].toUpperCase()}
          </div>
        }
      />

      {loadingChallenge && !dailyChallenge ? (
        <div className="flex justify-center py-8">
          <Spinner />
        </div>
      ) : (
        dailyChallenge &&
        !dailyChallenge.completed && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-gradient-to-br from-periwinkle to-cyan p-[2px]"
          >
            <div className="rounded-2xl bg-bg-card p-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                {t('home.todaysChallenge')}
              </p>
              <div className="mt-1 flex items-center gap-2">
                <span
                  className="size-2.5 rounded-full"
                  style={{ background: SKILL_ICONS[dailyChallenge.skill] ?? '#7580ef' }}
                />
                <h2 className="truncate font-heading text-lg font-bold text-text-primary">
                  {t(`skill.${dailyChallenge.skill}.title`)}
                </h2>
              </div>
              <p className="mt-1 line-clamp-2 text-sm text-text-secondary">
                {dailyChallenge.title}
              </p>
              <Link to="/challenge">
                <Button variant="primary" size="sm" className="mt-4">
                  <Zap className="size-4" />
                  {dailyChallenge.completed ? t('home.startChallenge') : t('challenge.submit')}
                </Button>
              </Link>
            </div>
          </motion.div>
        )
      )}

      <StreakTracker memory={memory} />

      <section className="space-y-3">
        <SectionHeader title={t('home.yourStats')} tone="navy" />
        <div className="grid grid-cols-3 gap-3">
          <StatCard icon={<Trophy className="size-4" />} value={done} label={t('home.challengesDone')} tone="orange" soft />
          <StatCard icon={<Zap className="size-4" />} value={avg ?? '—'} label={t('home.avgScore')} tone="navy" soft />
          <StatCard icon={<MessageCircleHeart className="size-4" />} value={localizeNumber(memory?.freezes ?? 1, lang)} label={t('streak.freezes', { count: '' }).trim()} tone="cyan" soft />
        </div>
      </section>

      <section className="space-y-3">
        <SectionHeader title={t('home.quickActions')} tone="navy" />
        <div className="grid gap-3 sm:grid-cols-3">
          <ActionTile to="/challenge" icon={<Zap className="size-5" />} label={t('home.startChallenge')} className="from-streak to-peach" />
          <ActionTile to="/ask" icon={<MessageCircleHeart className="size-5" />} label={t('home.askQuestion')} className="from-periwinkle to-accent" />
          <ActionTile to="/leaderboard" icon={<Trophy className="size-5" />} label={t('home.viewLeaderboard')} className="from-success to-cyan" />
        </div>
      </section>
    </div>
  )
}

function ActionTile({
  to,
  icon,
  label,
  className,
}: {
  to: string
  icon: ReactNode
  label: string
  className: string
}) {
  return (
    <Link
      to={to}
      className={`group flex items-center gap-3 rounded-2xl bg-gradient-to-br ${className} p-4 text-white shadow-sm transition-transform hover:-translate-y-0.5`}
    >
      <span className="flex size-9 items-center justify-center rounded-xl bg-white/20">
        {icon}
      </span>
      <span className="text-sm font-bold leading-tight">{label}</span>
    </Link>
  )
}
