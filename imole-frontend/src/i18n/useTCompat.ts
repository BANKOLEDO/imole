import { useT } from './I18nContext'

export function useTCompat() {
  const { t, lang, setLang } = useT()
  return { t, lang, setLang, language: lang }
}
