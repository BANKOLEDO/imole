import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowRight, X, GraduationCap, Users } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { useT } from '../../i18n/I18nContext'

export const GET_STARTED_EVENT = 'imole:get-started'

export function openGetStarted() {
  window.dispatchEvent(new CustomEvent(GET_STARTED_EVENT))
}

export function GetStartedModal() {
  const navigate = useNavigate()
  const { t } = useT()
  const { currentProfile, profiles } = useApp()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener(GET_STARTED_EVENT, handler)
    return () => window.removeEventListener(GET_STARTED_EVENT, handler)
  }, [])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-navy-dark/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={(e) => e.target === e.currentTarget && setOpen(false)}
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 12 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="relative w-full max-w-md rounded-3xl bg-bg-card p-6 shadow-2xl sm:p-8"
      >
        <button
          onClick={() => setOpen(false)}
          aria-label={t('common.cancel')}
          className="absolute right-4 top-4 cursor-pointer rounded-full p-1.5 text-text-muted transition-colors hover:bg-bg-surface hover:text-text-primary"
        >
          <X className="size-5" />
        </button>
        <div className="text-center">
          <h2 className="font-heading text-xl font-black text-text-primary">
            {profiles.length ? 'Do you have a profile?' : t('landing.beginJourney')}
          </h2>
          <p className="mt-1.5 text-sm text-text-secondary">{t('app.tagline')}</p>
        </div>
        <div className="mt-6 grid gap-3">
          {profiles.length > 0 && !currentProfile && (
            <button
              onClick={() => navigate('/app/profile')}
              className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-border bg-bg-surface p-4 text-left transition-all hover:-translate-y-0.5 hover:border-accent/40"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-white">
                <GraduationCap className="size-6" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-heading text-base font-bold text-text-primary">{t('profile.login')}</span>
                <span className="block text-xs text-text-muted">{t('profile.choose')}</span>
              </span>
              <ArrowRight className="size-5 shrink-0 text-text-muted" />
            </button>
          )}
          {profiles.length > 0 && !currentProfile && (
            <button
              onClick={() => navigate('/app/profile?create=1')}
              className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-border bg-bg-surface p-4 text-left transition-all hover:-translate-y-0.5 hover:border-orange/50"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-orange text-white">
                <GraduationCap className="size-6" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-heading text-base font-bold text-text-primary">{t('profile.newProfile')}</span>
                <span className="block text-xs text-text-muted">{t('profile.createTitle')}</span>
              </span>
              <ArrowRight className="size-5 shrink-0 text-text-muted" />
            </button>
          )}
          {(profiles.length === 0 || currentProfile) && <button
            onClick={() => navigate(currentProfile ? '/app' : '/app/profile?create=1')}
            className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-border bg-bg-surface p-4 text-left transition-all hover:-translate-y-0.5 hover:border-accent/40"
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-white">
              <GraduationCap className="size-6" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-heading text-base font-bold text-text-primary">
                {currentProfile ? t('home.welcome') : profiles.length ? t('profile.login') : "I'm a Child"}
              </span>
              <span className="block text-xs text-text-muted">Learn skills · Earn streaks</span>
            </span>
            <ArrowRight className="size-5 shrink-0 text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
          </button>}
          <button
            onClick={() => navigate('/parent/login')}
            className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-border bg-bg-surface p-4 text-left transition-all hover:-translate-y-0.5 hover:border-orange/50"
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-orange text-white">
              <Users className="size-6" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-heading text-base font-bold text-text-primary">
                I'm a Parent
              </span>
              <span className="block text-xs text-text-muted">Track progress · Reports</span>
            </span>
            <ArrowRight className="size-5 shrink-0 text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-orange" />
          </button>
        </div>
      </motion.div>
    </div>
  )
}
