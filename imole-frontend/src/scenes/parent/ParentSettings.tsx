import { useState, type ReactNode } from 'react'
import { BellRing, Moon, Volume2 } from 'lucide-react'
import Button from '../../components/shared/Button'
import { Card, CardContent } from '../../components/shared/Card'
import SectionHeader from '../../components/shared/SectionHeader'
import { api } from '../../lib/api'
import { useAuth } from '../../context/AuthContext'
import { useT } from '../../i18n/I18nContext'

type Settings = {
  weeklyEmail: boolean
  quietHours: boolean
  soundOnComplete: boolean
}

const DEFAULTS: Settings = { weeklyEmail: true, quietHours: false, soundOnComplete: true }

export default function ParentSettings() {
  const { t } = useT()
  const { parentToken } = useAuth()
  const [settings, setSettings] = useState<Settings>(DEFAULTS)
  const [saved, setSaved] = useState(false)

  const toggle = (key: keyof Settings) =>
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }))

  const save = async () => {
    await api('/parent/settings', {
      method: 'PUT',
      headers: { Authorization: `Bearer ${parentToken}` },
      body: JSON.stringify(settings),
    }).catch(() => {})
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
  }

  return (
    <div className="max-w-xl space-y-4">
      <SectionHeader title={t('parent.dashboard.settings')} tone="navy" />
      <Card>
        <CardContent className="divide-y divide-border/60 py-2">
          <Row
            icon={<BellRing className="size-4 text-streak" />}
            label="Weekly progress email"
            on={settings.weeklyEmail}
            onToggle={() => toggle('weeklyEmail')}
          />
          <Row
            icon={<Moon className="size-4 text-periwinkle" />}
            label="Quiet hours (8pm – 7am)"
            on={settings.quietHours}
            onToggle={() => toggle('quietHours')}
          />
          <Row
            icon={<Volume2 className="size-4 text-cyan" />}
            label="Sound when challenge completes"
            on={settings.soundOnComplete}
            onToggle={() => toggle('soundOnComplete')}
          />
        </CardContent>
      </Card>
      <Button variant="orange" onClick={save}>
        {saved ? t('common.copied') : t('common.save')}
      </Button>
    </div>
  )
}

function Row({
  icon,
  label,
  on,
  onToggle,
}: {
  icon: ReactNode
  label: string
  on: boolean
  onToggle: () => void
}) {
  return (
    <div className="flex items-center gap-3 py-3.5">
      <span className="flex size-9 items-center justify-center rounded-xl bg-bg-surface">{icon}</span>
      <span className="flex-1 text-sm font-semibold text-text-primary">{label}</span>
      <button
        onClick={onToggle}
        role="switch"
        aria-checked={on}
        aria-label={label}
        className={`relative h-6 w-11 cursor-pointer rounded-pill transition-colors ${on ? 'bg-success' : 'bg-border'}`}
      >
        <span
          className={`absolute top-0.5 size-5 rounded-full bg-white shadow transition-all ${on ? 'left-[22px]' : 'left-0.5'}`}
        />
      </button>
    </div>
  )
}
