import { useState } from 'react'
import { motion } from 'motion/react'
import { Sparkles, Check, ArrowRight, ArrowLeft } from 'lucide-react'
import Button from '../../components/shared/Button'
import { Card, CardContent } from '../../components/shared/Card'
import { Input } from '../../components/shared/Field'
import { LANGUAGES, useT, type LanguageCode } from '../../i18n/I18nContext'
import { useApp, type Profile } from '../../context/AppContext'
import { useToast } from '../../components/shared/Toast'

const AVATAR_COLORS = ['#cdd7f5', '#a6ebf0', '#d8f37e', '#c9cdfc', '#ffd9ab', '#ffe4db']

type Props = { onDone?: (profile: Profile) => void; onCancel?: () => void }

export default function Onboarding({ onDone, onCancel }: Props) {
  const { t } = useT()
  const toast = useToast()
  const { createProfile } = useApp()
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [language, setLanguage] = useState<LanguageCode>('en')
  const [avatar, setAvatar] = useState(AVATAR_COLORS[0])
  const [pin, setPin] = useState('')
  const [busy, setBusy] = useState(false)

  const canNext =
    (step === 0 && name.trim().length >= 2) ||
    (step === 1 && Number(age) >= 5 && Number(age) <= 18) ||
    step === 2 ||
    (step === 3 && pin.length === 4)

  const finish = async () => {
    setBusy(true)
    try {
      const profile = await createProfile({
        name: name.trim(),
        age: age ? Number(age) : null,
        language,
      })
      toast('success', `${profile.name} ✓`)
      onDone?.(profile)
    } catch {
      toast('error', t('common.error'))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6 pb-10">
      <div className="flex items-center gap-2">
        {onCancel && (
          <button
            onClick={onCancel}
            className="cursor-pointer rounded-full p-2 text-text-muted transition-colors hover:text-text-primary"
            aria-label={t('common.back')}
          >
            <ArrowLeft className="size-5" />
          </button>
        )}
        <div className="flex flex-1 gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-pill transition-colors ${i <= step ? 'bg-periwinkle' : 'bg-border'}`}
            />
          ))}
        </div>
      </div>

      <Card>
        <CardContent className="flex flex-col gap-5 py-6">
          {step === 0 && (
            <>
              <h2 className="font-heading text-xl font-bold text-text-primary">
                {t('profile.createName')}
              </h2>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ada"
                maxLength={24}
                autoFocus
              />
            </>
          )}

          {step === 1 && (
            <>
              <h2 className="font-heading text-xl font-bold text-text-primary">
                {t('profile.createAge')}
              </h2>
              <Input
                type="number"
                min={5}
                max={18}
                value={age}
                onChange={(e) => setAge(e.target.value.replace(/\D/g, '').slice(0, 2))}
                placeholder="10"
                autoFocus
              />
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="font-heading text-xl font-bold text-text-primary">
                {t('profile.createLanguage')}
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {LANGUAGES.map((option) => (
                  <button
                    key={option.code}
                    onClick={() => setLanguage(option.code)}
                    className={`relative cursor-pointer rounded-xl border px-3 py-3 text-sm font-semibold transition-all ${
                      language === option.code
                        ? 'border-accent bg-accent-soft text-accent'
                        : 'border-border text-text-secondary hover:border-accent/40'
                    }`}
                  >
                    {option.label}
                    {language === option.code && (
                      <Check className="absolute right-2 top-2 size-3.5" />
                    )}
                  </button>
                ))}
              </div>
              <p className="-mt-2 mb-1 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                {t('profile.chooseAvatar')}
              </p>
              <div className="flex gap-2.5">
                {AVATAR_COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => setAvatar(color)}
                    aria-label={color}
                    className={`size-9 cursor-pointer rounded-full transition-transform ${
                      avatar === color
                        ? 'scale-110 ring-2 ring-accent ring-offset-2'
                        : 'hover:scale-105'
                    }`}
                    style={{ background: color }}
                  />
                ))}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="font-heading text-xl font-bold text-text-primary">
                {t('profile.pin')}
              </h2>
              <Input
                type="password"
                inputMode="numeric"
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="••••"
                autoFocus
              />
              <p className="text-xs text-text-muted">{t('profile.pinHint')}</p>
            </>
          )}

          <Button
            variant="orange"
            disabled={!canNext || busy}
            onClick={() => (step < 3 ? setStep(step + 1) : finish())}
          >
            {step < 3 ? (
              <>
                {t('common.confirm')}
                <ArrowRight className="size-4" />
              </>
            ) : (
              <>
                <Sparkles className="size-4" />
                {busy ? t('common.loading') : t('profile.createTitle')}
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <motion.p
        key={step}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-xs text-text-muted"
      >
        {step + 1} / 4
      </motion.p>
    </div>
  )
}
