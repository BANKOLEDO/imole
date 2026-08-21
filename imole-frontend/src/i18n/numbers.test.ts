import { describe, expect, it } from 'vitest'
import { localizeNumber } from './numbers'

describe('localizeNumber', () => {
  it('formats plain digits for english', () => {
    expect(localizeNumber(1234, 'en')).toMatch(/1[,.]?234/)
  })

  it('returns a string for every supported language', () => {
    for (const lang of ['en', 'yo', 'ha', 'ig', 'fr', 'pcm'] as const) {
      expect(typeof localizeNumber(42, lang)).toBe('string')
    }
  })

  it('handles zero and negatives without crashing', () => {
    expect(localizeNumber(0, 'en')).toBe('0')
    expect(localizeNumber(-7, 'fr')).toContain('7')
  })
})
