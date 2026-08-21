import { useEffect, useState } from 'react'
import { Card, CardContent } from '../../components/shared/Card'
import SectionHeader from '../../components/shared/SectionHeader'
import { Spinner } from '../../components/shared/Feedback'
import { api } from '../../lib/api'
import { useAuth } from '../../context/AuthContext'
import { useT } from '../../i18n/I18nContext'
import { localizeNumber } from '../../i18n/numbers'
import type { Child } from './ParentDashboard'

type Progress = { date: string; average: number; count: number }
type Stats = { dailyProgress: Progress[]; streak: { longest: number }; averageScore: number }

export default function ParentReports() {
  const { t, lang } = useT()
  const { parentToken } = useAuth()
  const [children, setChildren] = useState<Child[] | null>(null)
  const [statsById, setStatsById] = useState<Record<string, Stats>>({})

  useEffect(() => {
    if (!parentToken) return
    const headers = { Authorization: `Bearer ${parentToken}` }
    api<Child[]>('/parent/children', { headers })
      .then(async (list) => {
        setChildren(list)
        const entries = await Promise.all(
          list.map(async (child) => {
            try {
              const stats = await api<Stats>(`/parent/dashboard/${child.id}`, { headers })
              return [child.id, stats] as const
            } catch {
              return null
            }
          }),
        )
        setStatsById(Object.fromEntries(entries.filter(Boolean) as Array<[string, Stats]>))
      })
      .catch(() => setChildren([]))
  }, [parentToken])

  if (!children) {
    return (
      <div className="flex justify-center py-10">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <SectionHeader title={t('parent.dashboard.reports')} tone="navy" subtitle={t('parent.dashboard.last30Days')} />
      {children.length === 0 && (
        <p className="text-sm text-text-muted">{t('parent.dashboard.noProgress')}</p>
      )}
      {children.map((child) => {
        const stats = statsById[child.id]
        const days = stats?.dailyProgress ?? []
        const activeDays = days.filter((d) => d.count > 0).length
        return (
          <Card key={child.id}>
            <CardContent className="py-5">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="font-heading text-lg font-bold text-text-primary">{child.name}</h2>
                <span className="text-xs font-semibold text-text-muted">
                  🔥 {localizeNumber(stats?.streak.longest ?? child.streak, lang)} · ⭐{' '}
                  {localizeNumber(Math.round(stats?.averageScore ?? child.averageScore), lang)}
                </span>
              </div>
              {!stats ? (
                <p className="py-4 text-center text-xs text-text-muted">{t('common.loading')}</p>
              ) : (
                <>
                  <div className="flex h-20 items-end gap-[3px]">
                    {days.map((day) => (
                      <div
                        key={day.date}
                        title={`${day.date}: ${day.count || '—'}`}
                        className={`flex-1 rounded-t-sm transition-colors ${
                          day.count ? 'bg-gradient-to-t from-periwinkle to-cyan' : 'bg-bg-surface'
                        }`}
                        style={{ height: `${Math.max(5, day.count ? day.average : 4)}%` }}
                      />
                    ))}
                  </div>
                  <p className="mt-2 text-right text-xs font-semibold text-text-muted">
                    {localizeNumber(activeDays, lang)} / {localizeNumber(30, lang)} 📅
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
