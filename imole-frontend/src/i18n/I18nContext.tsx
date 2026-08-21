import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import en from './en.json'
import yo from './yo.json'
import ha from './ha.json'
import ig from './ig.json'
import fr from './fr.json'
import pcm from './pcm.json'

export const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'yo', label: 'Yorùbá' },
  { code: 'ha', label: 'Hausa' },
  { code: 'ig', label: 'Igbo' },
  { code: 'fr', label: 'Français' },
  { code: 'pcm', label: 'Naija Pidgin' },
] as const

export type LanguageCode = (typeof LANGUAGES)[number]['code']

type Dictionary = Record<string, unknown>

const dictionaries: Partial<Record<LanguageCode, Dictionary>> = {
  en,
  yo,
  ha,
  ig,
  fr,
  pcm,
}

function lookup(dict: Dictionary | undefined, key: string): unknown {
  return key
    .split('.')
    .reduce<unknown>(
      (node, part) =>
        node && typeof node === 'object'
          ? (node as Dictionary)[part]
          : undefined,
      dict,
    )
}

function interpolate(template: string, vars?: Record<string, string | number>) {
  if (!vars) return template
  return template.replace(/\{\{(\w+)\}\}/g, (_, name) =>
    vars[name] !== undefined ? String(vars[name]) : '',
  )
}

type I18nValue = {
  lang: LanguageCode
  setLang: (lang: LanguageCode) => void
  t: (key: string, vars?: Record<string, string | number>) => string
}

const I18nContext = createContext<I18nValue | null>(null)

const STORAGE_KEY = 'imole_language'

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as LanguageCode | null
    return saved && LANGUAGES.some((l) => l.code === saved) ? saved : 'en'
  })

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((next: LanguageCode) => {
    setLangState(next)
    localStorage.setItem(STORAGE_KEY, next)
  }, [])

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      const value =
        lookup(dictionaries[lang], key) ?? lookup(dictionaries.en, key)
      if (typeof value === 'string') return interpolate(value, vars)
      if (Array.isArray(value)) return interpolate(String(value[0] ?? ''), vars)
      return key
    },
    [lang],
  )

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useT() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useT must be used inside I18nProvider')
  return ctx
}
