import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sun, Mail, Lock, UserRound } from 'lucide-react'
import Button from '../../components/shared/Button'
import { Card, CardContent } from '../../components/shared/Card'
import { Input } from '../../components/shared/Field'
import AuthShell from '../../components/shared/AuthShell'
import { api } from '../../lib/api'
import { useAuth } from '../../context/AuthContext'
import { useT } from '../../i18n/I18nContext'

export default function ParentAuth() {
  const { t } = useT()
  const navigate = useNavigate()
  const { setParentToken } = useAuth()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async () => {
    setBusy(true)
    setError(null)
    try {
      const path = mode === 'login' ? '/auth/parent/login' : '/auth/parent/register'
      const body =
        mode === 'login' ? { email, password } : { name, email, password }
      const res = await api<{ token: string }>(path, {
        method: 'POST',
        body: JSON.stringify(body),
      })
      setParentToken(res.token)
      navigate('/parent')
    } catch (err) {
      setError(err instanceof Error ? err.message : t('common.error'))
    } finally {
      setBusy(false)
    }
  }

  return (
    <AuthShell title="Imole Parents" subtitle={t('app.tagline')}>
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col gap-4 py-6">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-streak to-peach">
            <Sun className="size-6 text-white" />
          </div>

          <div className="flex rounded-xl bg-bg-surface p-1">
            {(['login', 'register'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 cursor-pointer rounded-lg py-2 text-sm font-bold transition-colors ${
                  mode === m ? 'bg-bg-card text-accent shadow-sm' : 'text-text-muted'
                }`}
              >
                {m === 'login' ? t('school.login') : t('school.register')}
              </button>
            ))}
          </div>

          {mode === 'register' && (
            <label className="relative block">
              <UserRound className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('profile.createName')}
                className="pl-10"
              />
            </label>
          )}

          <label className="relative block">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="pl-10"
            />
          </label>

          <label className="relative block">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="pl-10"
            />
          </label>

          {error && (
            <p className="rounded-xl bg-error/10 px-4 py-2 text-xs font-semibold text-error">{error}</p>
          )}

          <Button
            variant="orange"
            disabled={!email || password.length < 6 || busy || (mode === 'register' && !name.trim())}
            onClick={submit}
          >
            {busy ? t('common.loading') : mode === 'login' ? t('school.login') : t('school.register')}
          </Button>

          <button
            onClick={() => navigate('/dashboard')}
            className="cursor-pointer text-xs font-semibold text-text-muted transition-colors hover:text-accent"
          >
            {t('common.back')}
          </button>
        </CardContent>
      </Card>
    </AuthShell>
  )
}
