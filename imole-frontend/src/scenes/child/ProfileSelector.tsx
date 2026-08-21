import { useState } from 'react'
import { motion } from 'motion/react'
import { Plus, Trash2, Lock, LogIn, Fingerprint, Copy, Check, UserRound } from 'lucide-react'
import Button from '../../components/shared/Button'
import { Card, CardContent } from '../../components/shared/Card'
import { Input } from '../../components/shared/Field'
import PageHero from '../../components/shared/PageHero'
import { useT } from '../../i18n/I18nContext'
import { useApp } from '../../context/AppContext'
import { useToast } from '../../components/shared/Toast'
import Onboarding from './Onboarding'

export default function ProfileSelector() {
  const { t } = useT()
  const toast = useToast()
  const { profiles, currentProfile, verifyProfile, removeProfile, setCurrentProfile } = useApp()
  const [creating, setCreating] = useState(false)
  const [pins, setPins] = useState<Record<string, string>>({})
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  if (currentProfile) {
    return (
      <div className="container-main space-y-5 pb-10">
        <PageHero
          className="-mx-4 md:-mx-8"
          eyebrow={t('profile.title')}
          title={currentProfile.name}
          decoration={
            <div className="flex size-24 items-center justify-center rounded-3xl bg-accent-soft font-heading text-4xl font-black text-accent">
              {currentProfile.name[0].toUpperCase()}
            </div>
          }
        />

        <Card>
          <CardContent className="flex items-center gap-4 py-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent-soft">
              <Fingerprint className="size-5 text-accent" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">
                {t('profile.childCode')}
              </p>
              <p className="font-heading text-lg font-black tracking-widest text-text-primary">
                {currentProfile.childCode}
              </p>
              <p className="mt-0.5 text-xs text-text-muted">{t('profile.childCodeHint')}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={async () => {
                await navigator.clipboard.writeText(currentProfile.childCode)
                setCopied(true)
                setTimeout(() => setCopied(false), 1500)
              }}
            >
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              {copied ? t('common.copied') : t('common.copy')}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 py-4">
            <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
              <span className="text-sm font-semibold text-text-secondary">{t('profile.age')}</span>
              <span className="font-heading font-black text-text-primary">
                {currentProfile.age ?? '—'}
              </span>
            </div>
            <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-bold uppercase text-accent">
              {currentProfile.language}
            </span>
          </CardContent>
        </Card>

        <Button variant="outline" className="w-full" onClick={() => setCurrentProfile(null)}>
          <UserRound className="size-4" />
          {t('profile.switch')}
        </Button>
      </div>
    )
  }

  if (creating) {
    return (
      <div className="container-main py-6">
        <Onboarding onDone={() => setCreating(false)} onCancel={() => setCreating(false)} />
      </div>
    )
  }

  const tryLogin = async (id: string) => {
    const profile = profiles.find((p) => p.id === id)
    if (!profile) return
    const ok = await verifyProfile(profile.name, pins[id] ?? '')
    if (!ok) toast('error', t('challenge.error'))
  }

  return (
    <div className="container-main space-y-6 pb-10">
      <PageHero
        className="-mx-4 md:-mx-8"
        eyebrow={t('profile.title')}
        title={profiles.length ? t('profile.switch') : t('profile.createTitle')}
      />

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-3"
      >
        {profiles.map((profile) => (
          <Card key={profile.id} className="overflow-hidden">
            <div className="flex items-center gap-4 px-5 py-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent-soft font-heading text-lg font-black text-accent">
                {profile.name[0].toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-heading text-base font-bold text-text-primary">
                  {profile.name}
                </p>
                <p className="flex items-center gap-1.5 text-xs text-text-muted">
                  <Lock className="size-3" />
                  {t('profile.pinProtected')}
                </p>
              </div>
              <button
                onClick={() => setDeleteId(profile.id)}
                aria-label={t('profile.delete')}
                className="cursor-pointer rounded-full p-2 text-text-muted transition-colors hover:text-error"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
            <div className="flex gap-2 border-t border-border/60 bg-bg-surface px-5 py-3">
              <Input
                type="password"
                inputMode="numeric"
                maxLength={4}
                value={pins[profile.id] ?? ''}
                onChange={(e) =>
                  setPins((prev) => ({
                    ...prev,
                    [profile.id]: e.target.value.replace(/\D/g, '').slice(0, 4),
                  }))
                }
                placeholder="••••"
              />
              <Button
                variant="orange"
                disabled={(pins[profile.id]?.length ?? 0) < 4}
                onClick={() => tryLogin(profile.id)}
              >
                <LogIn className="size-4" />
              </Button>
            </div>
          </Card>
        ))}
      </motion.section>

      <Button variant="orange" className="w-full" onClick={() => setCreating(true)}>
        <Plus className="size-4" />
        {t('profile.createTitle')}
      </Button>

      {deleteId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-dark/60 p-4"
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-sm rounded-2xl bg-bg-card p-6 shadow-xl"
          >
            <h3 className="font-heading text-lg font-bold text-text-primary">
              {t('profile.delete')}
            </h3>
            <p className="mt-1 text-sm text-text-muted">{t('profile.deleteConfirm')}</p>
            <DeleteConfirm
              onCancel={() => setDeleteId(null)}
              onConfirm={async (pin) => {
                const profile = profiles.find((p) => p.id === deleteId)
                if (!profile) return
                const ok = await verifyProfile(profile.name, pin)
                if (!ok) {
                  toast('error', t('challenge.error'))
                  return
                }
                removeProfile(profile.id)
                setDeleteId(null)
              }}
            />
          </motion.div>
        </div>
      )}
    </div>
  )
}

function DeleteConfirm({
  onConfirm,
  onCancel,
}: {
  onConfirm: (pin: string) => void
  onCancel: () => void
}) {
  const [pin, setPin] = useState('')
  return (
    <div className="mt-4 flex flex-col gap-3">
      <Input
        type="password"
        inputMode="numeric"
        maxLength={4}
        value={pin}
        onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
        placeholder="••••"
        autoFocus
      />
      <div className="flex justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" size="sm" disabled={pin.length < 4} onClick={() => onConfirm(pin)}>
          Delete
        </Button>
      </div>
    </div>
  )
}
