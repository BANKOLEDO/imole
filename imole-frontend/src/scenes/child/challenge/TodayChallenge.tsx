import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'motion/react'
import { Zap, RotateCcw, WifiOff, PartyPopper } from 'lucide-react'
import Button from '../../../components/shared/Button'
import Badge from '../../../components/shared/Badge'
import PageHero from '../../../components/shared/PageHero'
import { Spinner } from '../../../components/shared/Feedback'
import QuizOptions from './QuizOptions'
import AnswerInput from './AnswerInput'
import VideoModal from './VideoModal'
import { useApp, type SubmitResult } from '../../../context/AppContext'
import { useT } from '../../../i18n/I18nContext'
import { localizeNumber } from '../../../i18n/numbers'

function difficultyKey(level: number) {
  if (level <= 1) return 'easy'
  if (level === 2) return 'medium'
  if (level === 3) return 'hard'
  return 'expert'
}

export default function TodayChallenge() {
  const { t, lang } = useT()
  const [params] = useSearchParams()
  const {
    currentProfile,
    dailyChallenge,
    loadingChallenge,
    submitting,
    offline,
    loadDailyChallenge,
    submitAnswer,
  } = useApp()

  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [written, setWritten] = useState('')
  const [result, setResult] = useState<SubmitResult | null>(null)

  useEffect(() => {
    if (currentProfile && !dailyChallenge) void loadDailyChallenge(params.get('lang') ?? undefined)
  }, [currentProfile, dailyChallenge, loadDailyChallenge, params])

  useEffect(() => {
    setSelectedId(null)
    setWritten('')
    setResult(null)
  }, [dailyChallenge?.id])

  if (!currentProfile) {
    return (
      <div className="flex min-h-[calc(100dvh-4rem)] flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="font-heading text-2xl font-bold text-text-primary">{t('challenge.noProfile')}</h1>
        <p className="max-w-xs text-sm text-text-muted">{t('challenge.noProfileDesc')}</p>
        <Link to="/app/profile">
          <Button variant="orange">{t('nav.profile')}</Button>
        </Link>
      </div>
    )
  }

  const challenge = dailyChallenge

  if (!challenge || loadingChallenge) {
    return (
      <div className="container-main flex flex-col items-center gap-3 py-16">
        <Spinner />
        <p className="text-sm text-text-muted">{t('challenge.loading')}</p>
      </div>
    )
  }

  const handleSubmit = async () => {
    const payload = challenge.answers
      ? { selectedAnswerId: selectedId ?? '' }
      : { answer: written.trim() }
    if (!payload.selectedAnswerId && !payload.answer) return
    const res = await submitAnswer(payload)
    if (res) setResult(res)
  }

  const answered = Boolean(result)

  return (
    <>
      <PageHero
        eyebrow={t('challenge.title')}
        title={t(`skill.${challenge.skill}.title`)}
        subtitle={challenge.description}
        actions={
          <Badge tone="streak">
            <Zap className="mr-1 size-3" />
            {localizeNumber(challenge.difficulty, lang)} · {t(`challenge.difficulty.${difficultyKey(challenge.difficulty)}`)}
          </Badge>
        }
      />

      <div className="container-main space-y-5 pb-10">
      {offline && (
        <p className="flex items-center justify-center gap-2 rounded-xl bg-streak-soft px-4 py-2 text-xs font-semibold text-streak">
          <WifiOff className="size-3.5" />
          {t('challenge.offline')}
        </p>
      )}

      {answered && result ? (
        <motion.div initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-5">
          <div className="rounded-2xl bg-gradient-to-br from-success/15 to-cyan/10 p-6 text-center">
            <PartyPopper className="mx-auto size-10 text-streak" />
            <h2 className="mt-2 font-heading text-2xl font-black text-text-primary">
              {t('challenge.greatWork')}
            </h2>
            <p className="mx-auto mt-1 max-w-sm text-sm text-text-secondary">{result.feedback}</p>
            <p className="mt-3 inline-block rounded-full bg-bg-card px-4 py-1.5 font-heading text-lg font-black text-accent shadow-sm">
              {t('challenge.scoreLabel')}: {localizeNumber(result.score, lang)}
            </p>
          </div>
          <StreakMini current={result.streak.current} />
          {challenge.resource?.url && (
            <VideoModal title={challenge.resource.title} url={challenge.resource.url} />
          )}
        </motion.div>
      ) : (
        <>
          <Card question={challenge.question} />

          {challenge.answers ? (
            <section className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-text-muted">
                {t('challenge.chooseAnswer')}
              </h2>
              <QuizOptions
                answers={challenge.answers}
                selected={selectedId}
                onSelect={setSelectedId}
                correctAnswerId={answered ? result?.correctAnswerId : undefined}
                disabled={submitting}
              />
            </section>
          ) : (
            <section className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-text-muted">
                {t('challenge.yourAnswer')}
              </h2>
              <AnswerInput value={written} onChange={setWritten} disabled={submitting} />
            </section>
          )}

          <Button
            variant="orange"
            className="w-full"
            disabled={
              submitting ||
              (challenge.answers ? !selectedId : written.trim().length < 2)
            }
            onClick={handleSubmit}
          >
            {submitting ? t('common.loading') : t('challenge.submit')}
          </Button>

          {challenge.completed && !submitting && (
            <Button variant="ghost" className="w-full" onClick={() => void loadDailyChallenge()}>
              <RotateCcw className="size-4" />
              {t('challenge.revise')}
            </Button>
          )}
        </>
      )}
      </div>
    </>
  )
}

function Card({ question }: { question: string }) {
  return (
    <motion.div
      key={question}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-border bg-bg-card p-5 shadow-sm"
    >
      <p className="text-base font-semibold leading-relaxed text-text-primary">{question}</p>
    </motion.div>
  )
}

function StreakMini({ current }: { current: number }) {
  const { t, lang } = useT()
  return (
    <div className="flex items-center justify-center gap-2 rounded-xl bg-streak-soft px-4 py-3 text-sm font-bold text-streak">
      🔥 {t('home.yourStreak')}: {localizeNumber(current, lang)} {t('streak.day')}
    </div>
  )
}
