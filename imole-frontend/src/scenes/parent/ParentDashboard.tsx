import { useCallback, useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Link2, Flame, Target, CalendarCheck, Trash2, Plus } from 'lucide-react'
import Button from '../../components/shared/Button'
import { Card, CardContent } from '../../components/shared/Card'
import { Input } from '../../components/shared/Field'
import SectionHeader from '../../components/shared/SectionHeader'
import StatCard from '../../components/shared/StatCard'
import { Spinner } from '../../components/shared/Feedback'
import { api } from '../../lib/api'
import { useAuth } from '../../context/AuthContext'
import { useT } from '../../i18n/I18nContext'
import { localizeNumber } from '../../i18n/numbers'

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
  dailyProgress: Array<{ date: string; average: number; count: number }>
}

export default function ParentDashboard() {
  const { t, lang } = useT()
  const { parentToken } = useAuth()
  const [children, setChildren] = useState<Child[] | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [stats, setStats] = useState<ChildStats | null>(null)
  const [code, setCode] = useState('')
  const [linkMsg, setLinkMsg] = useState<string | null>(null)

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
      .then(setStats)
      .catch(() => {})
  }, [selectedId, parentToken])

  const linkChild = async () => {
    if (!childCodeValid(code) || !parentToken) return
    try {
      await api('/parent/link', {
        method: 'POST',
        headers: { Authorization: `Bearer ${parentToken}` },
        body: JSON.stringify({ childCode: code.trim() }),
      })
      setLinkMsg(t('parent.dashboard.childLinked'))
      setCode('')
      await loadChildren()
    } catch {
      setLinkMsg(t('parent.dashboard.childNotFound'))
    }
  }

  const unlink = async (id: string) => {
    if (!parentToken) return
    await api(`/parent/children/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${parentToken}` },
    })
    setSelectedId(null)
    await loadChildren()
  }

  const selected = children?.find((c) => c.id === selectedId) ?? null

  return (
    <div className="space-y-6">
      <section className="rounded-2xl bg-gradient-to-br from-accent to-navy-deep p-5 text-white shadow-sm">
        <h1 className="font-heading text-xl font-black">{t('app.name')} · Parents</h1>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <Input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase().slice(0, 12))}
            placeholder="IMOL-XXXX"
            className="sm:max-w-52"
          />
          <Button variant="orange" size="md" disabled={!childCodeValid(code)} onClick={linkChild}>
            <Link2 className="size-4" />
            {t('parent.dashboard.linkChild')}
          </Button>
        </div>
        {linkMsg && <p className="mt-2 text-xs font-semibold text-peach">{linkMsg}</p>}
      </section>

      {!children ? (
        <div className="flex justify-center py-10">
          <Spinner />
        </div>
      ) : children.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <section className="flex gap-3 overflow-x-auto pb-1">
            {children.map((child) => (
              <button
                key={child.id}
                onClick={() => setSelectedId(child.id)}
                className={`group relative min-w-40 shrink-0 cursor-pointer rounded-2xl border p-4 text-left transition-all ${
                  child.id === selectedId
                    ? 'border-accent/50 bg-accent-soft shadow-sm'
                    : 'border-border bg-bg-card hover:-translate-y-0.5'
                }`}
              >
                <span className="font-heading text-base font-bold text-text-primary">
                  {child.name}
                </span>
                <p className="mt-0.5 text-xs text-text-muted">
                  🔥 {localizeNumber(child.streak, lang)} · ⭐ {localizeNumber(Math.round(child.averageScore), lang)}
                </p>
                <span
                  role="button"
                  tabIndex={0}
                  aria-label={t('parent.dashboard.unlink')}
                  onClick={(e) => {
                    e.stopPropagation()
                    void unlink(child.id)
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && void unlink(child.id)}
                  className="absolute right-2 top-2 hidden cursor-pointer rounded-full p-1 text-text-muted group-hover:block hover:text-error"
                >
                  <Trash2 className="size-3.5" />
                </span>
              </button>
            ))}
          </section>

          {!stats ? (
            <div className="flex justify-center py-8">
              <Spinner />
            </div>
          ) : selected ? (
            <>
              <section className="space-y-3">
                <SectionHeader title={`${selected.name} · ${t('home.yourStats')}`} tone="navy" />
                <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                  <StatCard icon={<Target className="size-4" />} value={stats.totalChallenges} label={t('home.challengesDone')} tone="orange" soft />
                  <StatCard icon={<Flame className="size-4" />} value={stats.streak.current} label={t('home.yourStreak')} tone="peach" soft />
                  <StatCard icon="⭐" value={Math.round(stats.averageScore)} label={t('home.avgScore')} tone="cyan" soft />
                  <StatCard icon={<CalendarCheck className="size-4" />} value={stats.weeklyActive} label={t('home.weeklyActive')} tone="navy" soft />
                </div>
              </section>

              <SkillBars breakdown={stats.skillBreakdown} />

              <WeeklyStrip days={stats.dailyProgress.slice(-7)} />
            </>
          ) : null}
        </>
      )}
    </div>
  )
}

function childCodeValid(code: string) {
  return /^IMOL-[A-Z0-9]{4}$/.test(code.trim())
}

function EmptyState() {
  const { t } = useT()
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-3 py-14 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-accent-soft">
        <Plus className="size-6 text-accent" />
      </span>
      <p className="max-w-xs text-sm text-text-muted">{t('parent.dashboard.noProgress')}</p>
    </motion.div>
  )
}

const SKILL_LABELS: Record<string, string> = {
  'mental-math': '🧮 Number Ninja',
  'persuasive-speaking': '🗣 Confident Voice',
  'financial-literacy': '💰 Money Smart',
  'creative-problem-solving': '💡 Bright Ideas',
  'emotional-intelligence': '❤️ Kind Heart',
}

function SkillBars({ breakdown }: { breakdown: Record<string, number> }) {
  const { t } = useT()
  if (!Object.keys(breakdown).length) return null
  return (
    <Card>
      <CardContent className="space-y-3 py-5">
        <SectionHeader title={t('home.skillProgress')} tone="navy" />
        {Object.entries(breakdown).map(([skill, score]) => (
          <div key={skill}>
            <div className="mb-1 flex justify-between text-xs font-semibold">
              <span className="text-text-secondary">{SKILL_LABELS[skill] ?? skill}</span>
              <span className="text-text-primary">{score}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-pill bg-bg-surface">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, score)}%` }}
                transition={{ duration: 0.6 }}
                className="h-full rounded-pill bg-gradient-to-r from-periwinkle to-cyan"
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function WeeklyStrip({ days }: { days: Array<{ date: string; average: number; count: number }> }) {
  const { t } = useT()
  return (
    <Card>
      <CardContent className="py-5">
        <SectionHeader title={t('parent.dashboard.dailyProgress')} tone="navy" subtitle={t('parent.dashboard.last30Days')} />
        <div className="mt-2 flex h-24 items-end gap-1.5">
          {days.map((day) => (
            <div key={day.date} className="group relative flex-1">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${Math.max(6, day.count ? day.average : 3)}%` }}
                transition={{ duration: 0.5 }}
                className={`w-full rounded-t-md ${day.count ? 'bg-gradient-to-t from-streak to-peach' : 'bg-border'}`}
              />
              <span className="pointer-events-none absolute -top-7 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-navy-dark px-2 py-0.5 text-[10px] font-bold text-white group-hover:block">
                {day.date.slice(5)} · {day.count || '—'}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

