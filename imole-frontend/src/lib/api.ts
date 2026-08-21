const BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001'
const audioCache = new Map<string, Blob>()

export async function api<T = unknown>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error((body as { error?: string }).error || `Request failed (${res.status})`)
  }
  return (await res.json()) as T
}

export async function audioApi(text: string, lang: string): Promise<Blob> {
  const key = `${lang}:${text}`
  const cached = audioCache.get(key)
  if (cached) return cached

  const res = await fetch(`${BASE}/audio/tts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, lang }),
  })
  if (!res.ok) throw new Error(`TTS request failed (${res.status})`)

  const audio = await res.blob()
  audioCache.set(key, audio)
  return audio
}

export function authApi<T = unknown>(
  path: string,
  token: string,
  options: RequestInit = {},
): Promise<T> {
  return api<T>(path, {
    ...options,
    headers: { ...(options.headers as Record<string, string>), Authorization: `Bearer ${token}` },
  })
}
