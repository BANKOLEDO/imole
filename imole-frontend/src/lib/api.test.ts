import { afterEach, describe, expect, it, vi } from 'vitest'
import { api } from './api'

describe('api helper', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('returns parsed json on ok responses', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response(JSON.stringify({ ok: true }), { status: 200 })),
    )
    const data = await api<{ ok: boolean }>('/anything')
    expect(data.ok).toBe(true)
  })

  it('throws a friendly message for error payloads', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(
        async () =>
          new Response(JSON.stringify({ error: 'Child not found' }), { status: 404 }),
      ),
    )
    await expect(api('/nope')).rejects.toThrow()
  })
})
