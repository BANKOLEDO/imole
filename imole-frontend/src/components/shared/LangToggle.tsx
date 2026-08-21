import { useEffect, useRef, useState } from 'react'
import { Check, Globe } from 'lucide-react'
import { LANGUAGES, useT, type LanguageCode } from '../../i18n/I18nContext'

export default function LangToggle() {
  const { lang, setLang } = useT()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const current = LANGUAGES.find((l) => l.code === lang)

  useEffect(() => {
    if (!open) return
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex cursor-pointer items-center gap-1.5 rounded-full border border-border bg-bg-surface px-3 py-1.5 text-xs font-black text-text-secondary transition-colors hover:border-accent/40 hover:text-text-primary"
      >
        <Globe className="size-4" />
        {current?.code.toUpperCase() ?? 'EN'}
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-border bg-bg-card py-1 shadow-xl">
          {LANGUAGES.map((option) => (
            <button
              key={option.code}
              onClick={() => {
                setLang(option.code as LanguageCode)
                setOpen(false)
              }}
              className={`flex w-full cursor-pointer items-center justify-between px-4 py-2 text-sm font-semibold transition-colors ${
                option.code === lang
                  ? 'bg-accent-soft text-accent'
                  : 'text-text-secondary hover:bg-bg-surface'
              }`}
            >
              {option.label}
              {option.code === lang && <Check className="size-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
