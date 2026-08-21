import { Mic, Keyboard, Square } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { useT } from '../../../i18n/I18nContext'

type Props = {
  value: string
  onChange: (text: string) => void
  disabled?: boolean
}

function useSpeech(lang: string) {
  const [listening, setListening] = useState(false)
  const start = (onText: (text: string) => void) => {
    type SpeechCtor = new () => {
      lang: string
      interimResults: boolean
      onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null
      onend: (() => void) | null
      start: () => void
      stop: () => void
    }
    const w = window as unknown as { SpeechRecognition?: SpeechCtor; webkitSpeechRecognition?: SpeechCtor }
    const Ctor = w.SpeechRecognition ?? w.webkitSpeechRecognition
    if (!Ctor) return false
    const rec = new Ctor()
    rec.lang = lang
    rec.interimResults = false
    rec.onresult = (e) => {
      const text = e.results[0]?.[0]?.transcript ?? ''
      if (text) onText(text)
    }
    rec.onend = () => setListening(false)
    rec.start()
    setListening(true)
    setTimeout(() => rec.stop(), 8000)
    return true
  }
  return { listening, start, stop: () => setListening(false) }
}

export default function AnswerInput({ value, onChange, disabled }: Props) {
  const { t, lang } = useT()
  const [mode, setMode] = useState<'text' | 'voice'>('text')
  const { listening, start } = useSpeech(lang)

  return (
    <div className="space-y-3">
      <div className="flex gap-1.5">
        <ModeTab active={mode === 'text'} onClick={() => setMode('text')} icon={<Keyboard className="size-3.5" />} label={t('challenge.textInput')} />
        <ModeTab active={mode === 'voice'} onClick={() => setMode('voice')} icon={listening ? <Square className="size-3.5" /> : <Mic className="size-3.5" />} label={listening ? t('challenge.recording') : t('challenge.voiceInput')} />
      </div>

      {mode === 'text' ? (
        <textarea
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t('challenge.placeholder')}
          rows={4}
          className="w-full resize-none rounded-xl border border-border bg-bg-input px-4 py-3 text-sm text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-accent/40"
        />
      ) : (
        <button
          type="button"
          disabled={disabled}
          onClick={() => {
            if (!listening) start((text) => onChange(value ? `${value} ${text}` : text))
          }}
          className={`flex w-full cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed px-4 py-8 transition-colors ${
            listening
              ? 'animate-pulse-x border-streak bg-streak-soft'
              : 'border-border bg-bg-input hover:border-accent/40'
          }`}
        >
          <Mic className={`size-7 ${listening ? 'text-streak' : 'text-text-muted'}`} />
          <span className="text-sm font-semibold text-text-secondary">
            {listening ? t('challenge.recording') : t('challenge.tapToRecord')}
          </span>
        </button>
      )}
    </div>
  )
}

function ModeTab({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean
  onClick: () => void
  icon: ReactNode
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
        active ? 'bg-accent text-accent-text' : 'bg-accent-soft/60 text-text-secondary hover:bg-accent-soft'
      }`}
    >
      {icon}
      {label}
    </button>
  )
}
