import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  Zap,
  MessageCircleHeart,
  Trophy,
  Play,
  ArrowRight,
  Award,
  Users,
  Brain,
  MessageSquare,
  PiggyBank,
  Lightbulb,
  Heart,
} from 'lucide-react'
import Button from '../../components/shared/Button'
import SectionHeader from '../../components/shared/SectionHeader'
import StatCard from '../../components/shared/StatCard'
import { Card, CardContent } from '../../components/shared/Card'
import { Spinner } from '../../components/shared/Feedback'
import PageHero from '../../components/shared/PageHero'
import { useApp } from '../../context/AppContext'
import { useT } from '../../i18n/I18nContext'
import StreakTracker from './StreakTracker'
import { SparkleDots } from '../../components/doodles/Doodles'

const SKILL_ICONS = {
  'mental-math': Brain,
  'persuasive-speaking': MessageSquare,
  'financial-literacy': PiggyBank,
  'creative-problem-solving': Lightbulb,
  'emotional-intelligence': Heart,
} as const

const SKILL_ICONS_FALLBACK = Brain

const SKILL_BARS: Record<string, string> = {
  'mental-math': 'from-accent to-periwinkle',
  'persuasive-speaking': 'from-streak to-peach',
  'financial-literacy': 'from-success to-cyan',
  'creative-problem-solving': 'from-periwinkle to-cyan',
  'emotional-intelligence': 'from-streak to-cyan',
}

export default function ChildDashboard() {
  const { t } = useT()
  const navigate = useNavigate()
  const { currentProfile, memory, dailyChallenge, loadingChallenge, loadDailyChallenge } = useApp()

  useEffect(() => {
    if (currentProfile && !dailyChallenge) void loadDailyChallenge()
  }, [currentProfile, dailyChallenge, loadDailyChallenge])

  if (!currentProfile) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="font-heading text-2xl font-bold text-text-primary">
          {t('home.noProfile')}
        </h1>
        <Button variant="orange" onClick={() => navigate('/app/profile')}>
          <Play className="size-4" />
          {t('nav.profile')}
        </Button>
      </div>
    )
  }

  const streak = memory?.streak ?? { current: 0, longest: 0 }
  const done = memory?.challenges.length ?? 0
  const scores = memory?.challenges.map((c) => c.score) ?? []
  const avg = scores.length
    ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    : null
  const today = new Date().getDay()
  const weeklyActive =
    memory?.challenges.filter((c) => new Date(c.completedAt).getDay() === today).length ?? 0

  const motivation = t('home.motivation')
  const quote = Array.isArray(motivation)
    ? motivation[currentProfile.name.length % motivation.length]
    : String(motivation)

  const skillEntries = Object.entries(memory?.skillScores ?? {}) as Array<
    [string, number[] | number]
  >

  return (
    <div className="relative flex flex-col gap-8 px-4 pb-10 md:px-8">
      <PageHero
        className="-mx-4 md:-mx-8"
        eyebrow={t('home.welcome')}
        title={`${currentProfile.name}`}
        subtitle={quote}
        actions={
          <Button variant="orange" size="lg" onClick={() => navigate('/app/challenge')}>
            <Zap className="size-5" />
            {t('home.todaysChallenge')}
            <ArrowRight className="size-4" />
          </Button>
        }
        decoration={
          <>
            <SparkleDots className="absolute inset-x-0 bottom-0 h-14 w-full opacity-70" />
            <div className="relative flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur">
              <span className="text-2xl">🔥</span>
              <div className="text-left">
                <p className="font-heading text-2xl font-black leading-none text-white">
                  {streak.current}
                </p>
                <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-widest text-white/55">
                  {t('streak.day')}
                </p>
              </div>
            </div>
          </>
        }
      />

      {loadingChallenge && !dailyChallenge ? (
        <div className="flex justify-center py-8">
          <Spinner />
        </div>
      ) : (
        dailyChallenge &&
        !dailyChallenge.completed && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <SectionHeader title={t('home.todaysChallenge')} tone="navy" />
            <div className="mt-3 rounded-2xl bg-gradient-to-br from-accent to-cyan p-[2px] shadow-sm">
              <div className="flex flex-col gap-4 rounded-2xl bg-bg-card p-5 md:flex-row md:items-center md:justify-between md:p-6">
                <div className="md:max-w-lg">
                  <div className="flex items-center gap-2">
                    <Zap className="size-4 text-accent" />
                    <h2 className="truncate font-heading text-lg font-bold text-text-primary">
                      {dailyChallenge.title}
                    </h2>
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm text-text-secondary">
                    {t(`skill.${dailyChallenge.skill}.title`)}
                  </p>
                </div>
                <Link to="/app/challenge" className="shrink-0">
                  <Button variant="primary" size="md">
                    {t('challenge.submit')}
                    <ArrowRight className="size-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.section>
        )
      )}

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.05 }}
        className="space-y-4"
      >
        <SectionHeader title={t('home.yourStats')} tone="navy" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <StatCard icon={<Trophy className="size-4" />} value={done} label={t('home.challengesDone')} tone="orange" soft />
          <StatCard icon={<Award className="size-4" />} value={avg ?? '—'} label={t('home.avgScore')} tone="cyan" soft />
          <StatCard icon={<Users className="size-4" />} value={weeklyActive} label={t('home.weeklyActive')} tone="peach" soft />
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
      >
        <StreakTracker memory={memory} />
      </motion.section>

      {skillEntries.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.15 }}
          className="space-y-4"
        >
          <SectionHeader title={t('home.skillProgress')} tone="cyan" />
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {skillEntries.map(([skill, val]) => {
              const Icon =
                SKILL_ICONS[skill as keyof typeof SKILL_ICONS] ?? SKILL_ICONS_FALLBACK
              const arr = Array.isArray(val) ? val : [val]
              const score = arr.length
                ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length)
                : 0
              return (
                <Card key={skill} className="transition-colors hover:border-accent/30">
                  <CardContent className="flex items-center gap-4 py-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                      <Icon className="size-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate text-sm font-semibold text-text-primary">
                          {t(`skill.${skill}.title`)}
                        </span>
                        <span className="font-heading text-sm font-black text-text-primary">
                          {arr.length ? `${score}/10` : '—'}
                        </span>
                      </div>
                      <div className="mt-2 h-2 w-full overflow-hidden rounded-pill bg-bg-surface">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(100, score * 10)}%` }}
                          transition={{ duration: 0.7 }}
                          className={`h-full rounded-pill bg-gradient-to-r ${
                            SKILL_BARS[skill] ?? 'from-accent to-cyan'
                          }`}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </motion.section>
      )}

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.2 }}
        className="space-y-4"
      >
        <SectionHeader title={t('home.quickActions')} tone="peach" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Link
            to="/app/challenge"
            className="flex cursor-pointer flex-col items-start gap-3 rounded-2xl bg-accent p-5 text-left text-white shadow-sm transition-transform duration-200 hover:-translate-y-1 active:scale-[0.99]"
          >
            <span className="flex size-10 items-center justify-center rounded-xl bg-white/20">
              <Zap className="size-5" />
            </span>
            <span className="font-heading text-base font-bold">{t('home.startChallenge')}</span>
          </Link>
          <Link
            to="/app/ask"
            className="flex cursor-pointer flex-col items-start gap-3 rounded-2xl bg-streak p-5 text-left text-white shadow-sm transition-transform duration-200 hover:-translate-y-1 active:scale-[0.99]"
          >
            <span className="flex size-10 items-center justify-center rounded-xl bg-white/20">
              <MessageCircleHeart className="size-5" />
            </span>
            <span className="font-heading text-base font-bold">{t('home.askQuestion')}</span>
          </Link>
          <Link
            to="/app/leaderboard"
            className="flex cursor-pointer flex-col items-start gap-3 rounded-2xl bg-navy p-5 text-left text-white shadow-sm transition-transform duration-200 hover:-translate-y-1 active:scale-[0.99]"
          >
            <span className="flex size-10 items-center justify-center rounded-xl bg-white/15">
              <Award className="size-5" />
            </span>
            <span className="font-heading text-base font-bold">{t('home.viewLeaderboard')}</span>
          </Link>
        </div>
      </motion.section>
    </div>
  )
}
