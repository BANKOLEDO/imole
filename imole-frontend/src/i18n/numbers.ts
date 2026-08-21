import type { LanguageCode } from './I18nContext'

const WORDS: Partial<Record<LanguageCode, Record<number, string>>> = {
  yo: {
    0: 'òdo',
    1: 'ọ̀kan',
    2: 'èjì',
    3: 'ẹ̀ta',
    4: 'ẹ̀rin',
    5: 'àrún',
    6: 'ẹ̀fà',
    7: 'èje',
    8: 'ẹ̀jọ',
    9: 'ẹ̀sán',
    10: 'ẹ̀wá',
    20: 'ogójì',
    30: 'ọgbọ̀n',
    40: 'ogoje',
    50: 'àádọ́ta',
    100: 'ọgọ́rùn-ún',
    200: 'igba',
    300: 'ọ̀ọ́dẹ́rún',
    400: 'irinwó',
    500: 'ọgọ́rùn-ún àádọ́ta',
    1000: 'ẹgbẹ̀rún',
  },
  ha: {
    0: 'sifili',
    1: 'ɗaya',
    2: 'biyu',
    3: 'uku',
    4: 'huɗu',
    5: 'biyar',
    6: 'shida',
    7: 'bakwai',
    8: 'takwas',
    9: 'tara',
    10: 'goma',
    20: 'ashirin',
    50: 'hamsin',
    100: 'ɗari',
    500: 'ɗari biyar',
    1000: 'dubu',
  },
  ig: {
    0: 'efu',
    1: 'otu',
    2: 'abụọ',
    3: 'atọ',
    4: 'anọ',
    5: 'ise',
    6: 'isii',
    7: 'asaa',
    8: 'asatọ',
    9: 'itoolu',
    10: 'iri',
    50: 'iri ise',
    100: 'narị',
    500: 'narị ise',
    1000: 'puku',
  },
}

const LOCALES: Record<LanguageCode, string> = {
  en: 'en-NG',
  fr: 'fr-FR',
  yo: 'yo-NG',
  ha: 'ha-NG',
  ig: 'ig-NG',
  pcm: 'en-NG',
}

export function localizeNumber(n: number, lang: LanguageCode): string {
  const word = WORDS[lang]?.[n]
  if (word) return word
  return new Intl.NumberFormat(LOCALES[lang]).format(n)
}
