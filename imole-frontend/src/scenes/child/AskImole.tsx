import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { SendHorizonal, Plus, Trash2, Volume2, Square, MessageCircleHeart } from 'lucide-react'
import Button from '../../components/shared/Button'
import { Spinner } from '../../components/shared/Feedback'
import PageHero from '../../components/shared/PageHero'
import { api } from '../../lib/api'
import { useApp } from '../../context/AppContext'
import { useT } from '../../i18n/I18nContext'

type Msg = { role: 'user' | 'assistant'; content: string }

export default function AskImole() {
  const { t, lang } = useT()
  const { currentProfile } = useApp()
  const [messages, setMessages] = useState<Msg[]>([])
  const [draft, setDraft] = useState('')
  const [busy, setBusy] = useState(false)
  const [speakingId, setSpeakingId] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, busy])

  useEffect(() => () => window.speechSynthesis?.cancel(), [])

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

  const send = async () => {
    const text = draft.trim()
    if (!text || busy) return
    setDraft('')
    setMessages((prev) => [...prev, { role: 'user', content: text }])
    setBusy(true)
    try {
      const res = await api<{ reply: string }>('/app/ask', {
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

  const speak = (id: string, text: string) => {
    const synth = window.speechSynthesis
    if (!synth) return
    if (speakingId === id) {
      synth.cancel()
      setSpeakingId(null)
      return
    }
    synth.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang === 'en' ? 'en-NG' : lang
    utterance.onend = () => setSpeakingId(null)
    setSpeakingId(id)
    synth.speak(utterance)
  }

  return (
    <>
      <PageHero className="mb-4" eyebrow={t('nav.ask')} title={currentProfile.name} subtitle={t('ask.subtitle')} />

      <div className="container-main flex h-[calc(100dvh-4rem)] flex-col pb-4">
      <div className="flex-1 space-y-3 overflow-y-auto pr-1">
        {messages.length === 0 && !busy && (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border px-6 py-10 text-center">
            <MessageCircleHeart className="size-9 text-periwinkle" />
            <p className="max-w-xs text-sm text-text-muted">{t('ask.subtitle')}</p>
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
                  onClick={() => speak(`${i}`, msg.content)}
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
        className="mt-2 flex items-end gap-2"
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
