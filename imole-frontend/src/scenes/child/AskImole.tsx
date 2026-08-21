import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { SendHorizonal, Plus, Trash2, Volume2, Square, MessageCircleHeart, MessagesSquare } from 'lucide-react'
import Button from '../../components/shared/Button'
import { Card, CardContent } from '../../components/shared/Card'
import { Spinner } from '../../components/shared/Feedback'
import PageHero from '../../components/shared/PageHero'
import { api, audioApi } from '../../lib/api'
import { useApp } from '../../context/AppContext'
import { useT } from '../../i18n/I18nContext'

type Msg = { role: 'user' | 'assistant'; content: string }
const suggestedKeys = ['ask.suggested.0', 'ask.suggested.1', 'ask.suggested.2', 'ask.suggested.3']

export default function AskImole() {
  const { t, lang } = useT()
  const { currentProfile } = useApp()
  const [messages, setMessages] = useState<Msg[]>([])
  const [draft, setDraft] = useState('')
  const [busy, setBusy] = useState(false)
  const [speakingId, setSpeakingId] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioUrlRef = useRef<string | null>(null)
  const speechTokenRef = useRef(0)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, busy])

  const stopSpeaking = () => {
    speechTokenRef.current += 1
    audioRef.current?.pause()
    audioRef.current = null
    if (audioUrlRef.current) URL.revokeObjectURL(audioUrlRef.current)
    audioUrlRef.current = null
    window.speechSynthesis?.cancel()
    setSpeakingId(null)
  }

  useEffect(() => () => stopSpeaking(), [])

  if (!currentProfile) {
    return (
      <div className="flex min-h-[calc(100dvh-4rem)] flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="font-heading text-xl font-bold text-text-primary">{t('challenge.noProfile')}</h1>
        <p className="max-w-xs text-sm text-text-muted">{t('challenge.noProfileDesc')}</p>
        <Link to="/app/profile">
          <Button variant="orange">{t('nav.profile')}</Button>
        </Link>
      </div>
    )
  }

  const send = async (suggested?: string) => {
    const text = (suggested ?? draft).trim()
    if (!text || busy) return
    setDraft('')
    setMessages((prev) => [...prev, { role: 'user', content: text }])
    setBusy(true)
    try {
      const res = await api<{ reply: string }>('/ask', {
        method: 'POST',
        body: JSON.stringify({
          profileId: currentProfile.id,
          message: text,
          language: lang,
        }),
      })
      setMessages((prev) => [...prev, { role: 'assistant', content: res.reply }])
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: t('ask.error') }])
    } finally {
      setBusy(false)
    }
  }

  const speak = async (id: string, text: string) => {
    if (speakingId === id) {
      stopSpeaking()
      return
    }
    stopSpeaking()
    const token = speechTokenRef.current
    setSpeakingId(id)
    try {
      const blob = await audioApi(text, lang)
      if (token !== speechTokenRef.current) return
      const url = URL.createObjectURL(blob)
      audioUrlRef.current = url
      const audio = new Audio(url)
      audioRef.current = audio
      audio.onended = stopSpeaking
      await audio.play()
    } catch {
      if (token !== speechTokenRef.current) return
      const synth = window.speechSynthesis
      if (!synth) {
        setSpeakingId(null)
        return
      }
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = lang === 'en' ? 'en-NG' : lang
      utterance.onend = () => setSpeakingId(null)
      synth.speak(utterance)
    }
  }

  return (
    <>
      <PageHero className="-mx-4 md:-mx-8" eyebrow={t('nav.ask')} title={t('ask.title')} subtitle={t('ask.input')} />

      <div className="container-main grid gap-4 pb-10 pt-8 lg:grid-cols-[220px_1fr]">
      <Card className="h-fit">
        <CardContent className="flex flex-col gap-3 p-3">
          <Button variant="orange" className="w-full justify-start" onClick={() => setMessages([])}>
            <Plus className="size-4" />
            {t('ask.newChat')}
          </Button>
          <div className="border-t border-border/60 pt-3">
            <p className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-widest text-text-muted">
              {t('ask.history')}
            </p>
            <div className="flex items-center gap-2 rounded-xl bg-accent-soft/40 px-2.5 py-2 text-xs font-semibold text-accent">
              <MessagesSquare className="size-3.5" />
              <span className="truncate">{t('ask.newChatHint')}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="flex min-h-[calc(100dvh-12rem)] flex-col">
      <CardContent className="flex flex-1 flex-col p-0">
      <div className="flex items-center gap-3 border-b border-border/60 bg-bg-surface px-5 py-3.5">
        <div className="flex size-9 items-center justify-center rounded-full bg-accent text-white">
          <MessageCircleHeart className="size-4" />
        </div>
        <div>
          <p className="font-heading text-sm font-bold text-text-primary">Imole</p>
          <p className="text-[11px] text-text-muted">{t('ask.subtitle')}</p>
        </div>
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.length === 0 && !busy && (
          <div className="flex flex-col gap-3 py-3">
            <MessageCircleHeart className="size-9 text-periwinkle" />
            <p className="text-sm font-semibold text-text-primary">{t('ask.newChatHint')}</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {suggestedKeys.map((key, i) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => void send(t(key))}
                  className="flex cursor-pointer items-center gap-3 rounded-2xl border border-border bg-bg-card px-4 py-3 text-left text-sm text-text-primary transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md"
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-xs font-bold text-accent">{i + 1}</span>
                  <span>{t(key)}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`group relative max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                msg.role === 'user'
                  ? 'rounded-br-md bg-accent text-accent-text'
                  : 'rounded-bl-md bg-bg-card text-text-primary'
              }`}
            >
              {msg.content}
              {msg.role === 'assistant' && (
                <button
                  type="button"
                  onClick={() => void speak(`${i}`, msg.content)}
                  aria-label={speakingId === `${i}` ? t('ask.stop') : t('ask.listen')}
                  className="absolute -right-1 top-1/2 hidden -translate-y-1/2 translate-x-full cursor-pointer rounded-full bg-bg-surface p-1.5 text-text-muted group-hover:block hover:text-accent"
                >
                  {speakingId === `${i}` ? <Square className="size-3.5" /> : <Volume2 className="size-3.5" />}
                </button>
              )}
            </div>
          </motion.div>
        ))}

        {busy && (
          <div className="flex items-center gap-2 pl-1 text-xs text-text-muted">
            <Spinner />
            {t('ask.thinking')}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {messages.length > 0 && (
        <button
          type="button"
          onClick={() => setMessages([])}
          className="mt-2 flex cursor-pointer items-center gap-1.5 self-start text-xs font-semibold text-text-muted transition-colors hover:text-error"
        >
          <Trash2 className="size-3.5" />
          {t('ask.newChat')}
        </button>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault()
          void send()
        }}
        className="border-t border-border/60 p-4 flex items-end gap-2"
      >
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              void send()
            }
          }}
          rows={1}
          placeholder={t('ask.placeholder')}
          className="max-h-28 min-h-11 flex-1 resize-none rounded-xl border border-border bg-bg-card px-4 py-3 text-sm outline-none placeholder:text-text-muted focus:border-accent/40"
        />
        <Button variant="orange" size="md" disabled={!draft.trim() || busy} type="submit">
          <SendHorizonal className="size-4" />
        </Button>
      </form>
      </CardContent>
      </Card>
      </div>
    </>
  )
}

export function NewChatHint() {
  const { t } = useT()
  return (
    <span className="inline-flex items-center gap-1 text-xs text-text-muted">
      <Plus className="size-3" />
      {t('ask.newChat')}
    </span>
  )
}
