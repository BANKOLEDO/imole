import { LANGUAGES, useT } from '../../i18n/I18nContext'

export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { lang, setLang } = useT()

  return (
    <select
      aria-label="Language"
      value={lang}
      onChange={(e) => setLang(e.target.value as typeof lang)}
      className={`cursor-pointer rounded-xl border border-border bg-bg-input px-3 py-2 text-sm font-bold text-text-primary focus:border-accent/40 focus:outline-none focus:ring-2 focus:ring-ring/30 ${className}`}
    >
      {LANGUAGES.map(({ code, label }) => (
        <option key={code} value={code}>
          {label}
        </option>
      ))}
    </select>
  )
}
