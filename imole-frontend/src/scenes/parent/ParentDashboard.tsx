import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  Link2,
  Flame,
  Sparkles,
  Activity,
  Brain,
  MessageSquare,
  PiggyBank,
  Lightbulb,
  Heart,
  CalendarDays,
  ArrowRight,
  FileText,
  Settings,
  Plus,
  Trash2,
  AlertTriangle,
  Zap,
} from 'lucide-react'
import Button from '../../components/shared/Button'
import { Input } from '../../components/shared/Field'
import PageHero from '../../components/shared/PageHero'
import SectionHeader from '../../components/shared/SectionHeader'
import StatCard from '../../components/shared/StatCard'
import { Spinner, Skeleton } from '../../components/shared/Feedback'
import { api } from '../../lib/api'
import { useAuth } from '../../context/AuthContext'
import { useT } from '../../i18n/I18nContext'
import { useToast } from '../../components/shared/Toast'

export type Child = {
  id: string
  name: string
  age: number | null
  language: string
  childCode: string
  totalChallenges: number
  averageScore: number
  streak: number
}

type ChildStats = {
  totalChallenges: number
  averageScore: number
  skillBreakdown: Record<string, number>
  streak: { current: number; longest: number }
  weeklyActive: number
  weeklyActivity?: Record<string, number>
  trend?: Array<{ week: string; averageScore: number }>
  recentSessions?: Array<{ title: string; skill: string; score: number; date: string }>
  dailyProgress: Array<{ date: string; average: number; count: number }>
}

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

const WEEK_KEYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

export default function ParentDashboard() {
  const { t, lang } = useT()
  const navigate = useNavigate()
  const toast = useToast()
  const { parentToken } = useAuth()
  const [children, setChildren] = useState<Child[] | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [stats, setStats] = useState<ChildStats | null>(null)
  const [statsFor, setStatsFor] = useState<string | null>(null)
  const [showAdd, setShowAdd] = useState(false)
  const [code, setCode] = useState('')
  const [linking, setLinking] = useState(false)
  const [unlinkTarget, setUnlinkTarget] = useState<Child | null>(null)

  const loadChildren = useCallback(async () => {
    if (!parentToken) return
    const list = await api<Child[]>('/parent/children', {
      headers: { Authorization: `Bearer ${parentToken}` },
    })
    setChildren(list)
    setSelectedId((prev) => prev ?? list[0]?.id ?? null)
  }, [parentToken])

  useEffect(() => {
    loadChildren().catch(() => setChildren([]))
  }, [loadChildren])

  useEffect(() => {
    if (!selectedId || !parentToken) return
    setStats(null)
    api<ChildStats>(`/parent/dashboard/${selectedId}`, {
      headers: { Authorization: `Bearer ${parentToken}` },
    })
      .then((data) => {
        setStats(data)
        setStatsFor(selectedId)
      })
      .catch(() => {})
  }, [selectedId, parentToken])

  const linkChild = async () => {
    const trimmed = code.trim().toUpperCase()
    if (!childCodeValid(trimmed) || !parentToken || linking) return
    setLinking(true)
    try {
      await api('/parent/link', {
        method: 'POST',
        headers: { Authorization: `Bearer ${parentToken}` },
        body: JSON.stringify({ childCode: trimmed }),
      })
      toast('success', t('parent.dashboard.childLinked'))
      setShowAdd(false)
      setCode('')
      await loadChildren()
    } catch {
      toast('error', t('parent.dashboard.childNotFound'))
    } finally {
      setLinking(false)
    }
  }

  const unlink = async () => {
    if (!unlinkTarget || !parentToken) return
    try {
      await api(`/parent/children/${unlinkTarget.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${parentToken}` },
      })
      toast('success', t('parent.dashboard.unlinked'))
      setUnlinkTarget(null)
      setSelectedId(null)
      await loadChildren()
    } catch {
      toast('error', t('challenge.error'))
    }
  }

  const selected = children?.find((c) => c.id === selectedId) ?? null
  const pendingStats = selectedId !== null && (stats === null || statsFor !== selectedId)
  const initialLoading = children === null

  const locale = lang === 'pcm' ? 'en' : lang
  const dayLetters = WEEK_KEYS.map((_, i) =>
    new Intl.DateTimeFormat(locale, { weekday: 'narrow' }).format(new Date(2024, 0, 7 + i)),
  )

  const activityValues =
    stats?.weeklyActivity ? WEEK_KEYS.map((d) => stats.weeklyActivity?.[d] ?? 0) : []
  const maxActivity = activityValues.length ? Math.max(...activityValues, 1) : 1
  const weekTotal = activityValues.reduce((a, b) => a + b, 0)

  const trendMax =
    stats?.trend && stats.trend.length
      ? Math.max(...stats.trend.map((p) => p.averageScore), 1)
      : 1

  const skillEntries = Object.entries(stats?.skillBreakdown ?? {})

  return (
    <div className="flex flex-col gap-8 px-4 pb-10 md:px-8">
      <PageHero
        className="-mx-4 md:-mx-8"
        eyebrow={selected?.name ?? t('parent.layout.parent')}
        title={t('parent.dashboard.title')}
        subtitle={t('parent.dashboard.description')}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => navigate('/parent/reports')} className="cta-pill cursor-pointer">
              <FileText className="size-4" />
              {t('parent.nav.reports')}
              <ArrowRight className="size-4" />
            </button>
            <button onClick={() => setShowAdd(true)} className="cta-pill cursor-pointer">
              <Plus className="size-4" />
              {t('parent.dashboard.addChild')}
            </button>
          </div>
        }
        decoration={
          children && children.length > 0 ? (
            <div className="relative flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur">
              <span className="flex size-10 items-center justify-center rounded-xl bg-orange">
                <Zap className="size-5 text-white" />
              </span>
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-white/55">
                  {t('parent.dashboard.selectChild')}
                </label>
                <select
                  value={selectedId ?? ''}
                  onChange={(e) => setSelectedId(e.target.value)}
                  className="cursor-pointer bg-transparent font-heading text-lg font-black leading-none text-white outline-none [&>option]:text-text-primary"
                >
                  {children.map((child) => (
                    <option key={child.id} value={child.id}>
                      {child.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => setUnlinkTarget(selected)}
                title={t('parent.dashboard.unlink')}
                className="cursor-pointer rounded-full p-2 text-white/60 transition-colors hover:bg-white/15 hover:text-white"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          ) : null
        }
      />

      {initialLoading ? (
        <div className="flex justify-center py-10">
          <Spinner />
        </div>
      ) : children!.length === 0 ? (
        <EmptyState onAdd={() => setShowAdd(true)} />
      ) : !stats || pendingStats || !selected ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="grid gap-3 sm:grid-cols-3">
            <Skeleton className="h-32 rounded-3xl" />
            <Skeleton className="h-32 rounded-3xl" />
            <Skeleton className="h-32 rounded-3xl" />
          </div>
          <Skeleton className="h-48 rounded-3xl" />
          <Skeleton className="h-64 rounded-3xl" />
        </motion.div>
      ) : (
        <div className="space-y-8">
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="space-y-4"
          >
            <SectionHeader title={`${selected.name} · ${t('home.yourStats')}`} tone="navy" />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <StatCard icon={<Flame className="size-4" />} value={stats.streak.current} label={t('home.yourStreak')} tone="orange" soft />
              <StatCard icon={<Sparkles className="size-4" />} value={stats.streak.longest} label={t('home.avgScore')} tone="cyan" soft />
              <StatCard icon={<Activity className="size-4" />} value={weekTotal || stats.weeklyActive} label={t('home.weeklyActive')} tone="peach" soft />
            </div>
          </motion.section>

          {skillEntries.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              className="space-y-4"
            >
              <SectionHeader title={t('home.skillProgress')} tone="cyan" />
              <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                {skillEntries.map(([skill, value]) => {
                  const Icon =
                    SKILL_ICONS[skill as keyof typeof SKILL_ICONS] ?? SKILL_ICONS_FALLBACK
                  return (
                    <div
                      key={skill}
                      className="flex items-center gap-4 rounded-2xl border border-border bg-bg-card p-4 shadow-sm transition-colors hover:border-accent/30"
                    >
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                        <Icon className="size-5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="truncate text-sm font-semibold text-text-primary">
                            {t(`skill.${skill}.title`)}
                          </span>
                          <span className="font-heading text-sm font-bold text-text-primary">
                            {value}
                          </span>
                        </div>
                        <div className="mt-2 h-2 w-full overflow-hidden rounded-pill bg-bg-surface">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(value * 10, 100)}%` }}
                            transition={{ duration: 0.7 }}
                            className={`h-full rounded-pill bg-gradient-to-r ${
                              SKILL_BARS[skill] ?? 'from-accent to-cyan'
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.section>
          )}

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.15 }}
              className="space-y-4"
            >
              <SectionHeader title={t('parent.dashboard.dailyProgress')} tone="peach" />
              <div className="rounded-2xl border border-border bg-bg-card p-5 shadow-sm">
                {weekTotal > 0 ? (
                  <>
                    <div className="mb-5 flex items-baseline gap-2">
                      <span className="font-heading text-3xl font-black text-text-primary">
                        {weekTotal}
                      </span>
                      <span className="text-xs font-medium text-text-muted">
                        {t('parent.dashboard.last30Days')}
                      </span>
                    </div>
                    <div className="flex items-end justify-between gap-2">
                      {activityValues.map((value, i) => (
                        <div key={WEEK_KEYS[i]} className="flex flex-1 flex-col items-center gap-1.5">
                          <span className="text-[10px] font-semibold tabular-nums text-text-muted">
                            {value || ''}
                          </span>
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${Math.max((value / maxActivity) * 100, 4)}%` }}
                            transition={{ duration: 0.5, delay: 0.2 + i * 0.04 }}
                            className="w-full rounded-t-lg bg-gradient-to-t from-streak to-peach"
                            style={{ minHeight: 6 }}
                          />
                          <span className="text-[10px] font-semibold uppercase text-text-muted">
                            {dayLetters[i]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-text-muted">{t('parent.dashboard.noProgress')}</p>
                )}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.2 }}
              className="space-y-4"
            >
              <SectionHeader title={t('parent.dashboard.trend')} tone="navy" />
              <div className="rounded-2xl border border-border bg-bg-card p-5 shadow-sm">
                {stats.trend && stats.trend.some((p) => p.averageScore > 0) ? (
                  <>
                    <p className="mb-5 text-xs font-medium text-text-muted">
                      {t('parent.dashboard.avgScoreTrend')}
                    </p>
                    <div className="flex items-end justify-between gap-3">
                      {stats.trend.map((point) => (
                        <div key={point.week} className="flex flex-1 flex-col items-center gap-1.5">
                          <span className="text-[10px] font-semibold tabular-nums text-text-muted">
                            {point.averageScore > 0 ? point.averageScore : '—'}
                          </span>
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{
                              height: `${Math.max((point.averageScore / trendMax) * 100, 4)}%`,
                            }}
                            transition={{ duration: 0.5 }}
                            className="w-full rounded-t-lg bg-gradient-to-t from-periwinkle to-cyan"
                            style={{ minHeight: 6 }}
                          />
                          <span className="text-[10px] font-semibold text-text-muted">
                            {new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric' }).format(
                              new Date(point.week),
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-text-muted">{t('parent.dashboard.noProgress')}</p>
                )}
              </div>
            </motion.section>
          </div>

          {(stats.recentSessions?.length ?? 0) > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.25 }}
              className="space-y-4"
            >
              <SectionHeader title={t('parent.dashboard.recentSessions')} tone="cyan" />
              <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                {stats.recentSessions!.map((item) => {
                  const Icon =
                    SKILL_ICONS[item.skill as keyof typeof SKILL_ICONS] ?? SKILL_ICONS_FALLBACK
                  return (
                    <div
                      key={`${item.date}-${item.title}`}
                      className="flex items-center gap-4 rounded-2xl border border-border bg-bg-card p-4 shadow-sm"
                    >
                      <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                        <Icon className="size-5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-text-primary">
                          {item.title}
                        </p>
                        <p className="mt-0.5 text-xs text-text-muted">
                          {t(`skill.${item.skill}.title`)}
                        </p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="font-heading text-lg font-black text-text-primary">
                          {item.score}/10
                        </p>
                        <p className="text-[11px] text-text-muted">
                          {new Intl.DateTimeFormat(locale, {
                            day: 'numeric',
                            month: 'short',
                          }).format(new Date(item.date))}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.section>
          )}

          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.3 }}
            className="space-y-4"
          >
            <SectionHeader title={t('home.quickActions')} tone="peach" />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                onClick={() => navigate('/parent/reports')}
                className="flex cursor-pointer flex-col items-start gap-3 rounded-2xl bg-accent p-5 text-left text-white shadow-sm transition-transform duration-200 hover:-translate-y-1 active:scale-[0.99]"
              >
                <span className="flex size-10 items-center justify-center rounded-xl bg-white/20">
                  <FileText className="size-5" />
                </span>
                <span className="font-heading text-base font-bold">{t('parent.nav.reports')}</span>
                <span className="flex items-center gap-1 text-xs text-white/80">
                  {t('parent.dashboard.title')}
                  <ArrowRight className="size-3.5" />
                </span>
              </button>
              <button
                onClick={() => navigate('/parent/settings')}
                className="flex cursor-pointer flex-col items-start gap-3 rounded-2xl bg-navy p-5 text-left text-white shadow-sm transition-transform duration-200 hover:-translate-y-1 active:scale-[0.99]"
              >
                <span className="flex size-10 items-center justify-center rounded-xl bg-white/15">
                  <Settings className="size-5" />
                </span>
                <span className="font-heading text-base font-bold">{t('parent.nav.settings')}</span>
                <span className="flex items-center gap-1 text-xs text-white/80">
                  {t('settings.title')}
                  <ArrowRight className="size-3.5" />
                </span>
              </button>
            </div>
          </motion.section>
        </div>
      )}

      {showAdd && (
        <Modal onClose={() => setShowAdd(false)}>
          <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-accent-soft sm:mx-0">
            <Plus className="size-6 text-accent" />
          </div>
          <h3 className="font-heading text-lg font-bold text-text-primary">
            {t('parent.dashboard.addChild')}
          </h3>
          <p className="mt-1 text-sm text-text-secondary">{t('profile.childCodeHint')}</p>
          <Input
            autoFocus
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase().slice(0, 12))}
            onKeyDown={(e) => e.key === 'Enter' && void linkChild()}
            placeholder="IMOL-XXXX"
            className="mt-4 uppercase"
          />
          <div className="mt-4 flex gap-2">
            <Button variant="outline" className="flex-1" onClick={() => setShowAdd(false)}>
              {t('common.cancel')}
            </Button>
            <Button variant="orange" className="flex-1" disabled={!childCodeValid(code) || linking} onClick={linkChild}>
              <Link2 className="size-4" />
              {linking ? t('common.loading') : t('parent.dashboard.linkChild')}
            </Button>
          </div>
        </Modal>
      )}

      {unlinkTarget && (
        <Modal onClose={() => setUnlinkTarget(null)}>
          <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-error/10 sm:mx-0">
            <AlertTriangle className="size-6 text-error" />
          </div>
          <h3 className="font-heading text-lg font-bold text-text-primary">
            {t('parent.dashboard.unlink')}?
          </h3>
          <p className="mt-1 text-sm text-text-secondary">{unlinkTarget.name}</p>
          <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button variant="outline" className="flex-1 sm:flex-initial" onClick={() => setUnlinkTarget(null)}>
              {t('common.cancel')}
            </Button>
            <Button variant="danger" className="flex-1 sm:flex-initial" onClick={unlink}>
              {t('parent.dashboard.unlink')}
            </Button>
          </div>
        </Modal>
      )}
    </div>
  )
}

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy-dark/60 p-4"
      role="dialog"
      aria-modal="true"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md rounded-2xl bg-bg-card p-6 shadow-xl"
      >
        {children}
      </motion.div>
    </div>
  )
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  const { t } = useT()
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col items-center rounded-3xl border border-dashed border-border bg-bg-card px-6 py-16 text-center"
    >
      <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-accent-soft">
        <CalendarDays className="size-7 text-accent" />
      </div>
      <h2 className="font-heading text-xl font-semibold text-text-primary">
        {t('parent.dashboard.noProgress')}
      </h2>
      <Button variant="orange" className="mt-5" onClick={onAdd}>
        <Plus className="size-4" />
        {t('parent.dashboard.addChild')}
      </Button>
    </motion.div>
  )
}

function childCodeValid(code: string) {
  return /^IMOL-[A-Z0-9]{4}$/.test(code.trim())
}
