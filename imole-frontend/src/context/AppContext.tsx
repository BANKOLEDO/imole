import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { api } from '../lib/api'

export type Profile = {
  id: string
  name: string
  age: number | null
  language: string
  childCode: string
  pin?: string
}

export type ChallengeAnswer = { id: string; text: string }

export type DailyChallenge = {
  id: string
  skill: string
  title: string
  description: string
  question: string
  answers: ChallengeAnswer[] | null
  difficulty: number
  resource?: { title?: string; url?: string }
  completed: boolean
}

export type SubmitResult = {
  score: number
  feedback: string
  correct?: boolean
  correctAnswerId?: string
  streak: { current: number; longest: number; lastActive: number | null }
  freezes: number
}

export type SessionMemory = {
  challenges: Array<{ id: string; skill: string; title: string; score: number; feedback: string; completedAt: number }>
  skillScores: Record<string, number[]>
  streak: { current: number; longest: number; lastActive: number | null }
  freezes: number
}

const K_PROFILES = 'imole_profiles'
const K_CURRENT = 'imole_current_profile'
const K_DAILY = 'imole_daily_challenge'

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function save(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage full or unavailable */
  }
}

type AppValue = {
  profiles: Profile[]
  currentProfileId: string | null
  currentProfile: Profile | null
  dailyChallenge: DailyChallenge | null
  memory: SessionMemory | null
  loadingChallenge: boolean
  submitting: boolean
  offline: boolean
  createProfile: (input: { name: string; age: number | null; language: string }) => Promise<Profile>
  verifyProfile: (name: string, pin: string) => Promise<Profile | null>
  removeProfile: (id: string) => void
  setCurrentProfile: (id: string | null) => void
  loadDailyChallenge: (lang?: string) => Promise<DailyChallenge | null>
  submitAnswer: (payload: { answer?: string; selectedAnswerId?: string }) => Promise<SubmitResult | null>
  clearSession: () => void
}

const AppContext = createContext<AppValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [profiles, setProfiles] = useState<Profile[]>(() => load<Profile[]>(K_PROFILES, []))
  const [currentProfileId, setCurrentProfileId] = useState<string | null>(() => localStorage.getItem(K_CURRENT))
  const [dailyChallenge, setDailyChallenge] = useState<DailyChallenge | null>(() => load<DailyChallenge | null>(K_DAILY, null))
  const [memory, setMemory] = useState<SessionMemory | null>(null)
  const [loadingChallenge, setLoadingChallenge] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [offline, setOffline] = useState(!navigator.onLine)

  useEffect(() => {
    const online = () => setOffline(false)
    const gone = () => setOffline(true)
    window.addEventListener('online', online)
    window.addEventListener('offline', gone)
    return () => {
      window.removeEventListener('online', online)
      window.removeEventListener('offline', gone)
    }
  }, [])

  const persistProfiles = useCallback((next: Profile[]) => {
    setProfiles(next)
    save(K_PROFILES, next)
  }, [])

  const currentProfile = useMemo(
    () => profiles.find((p) => p.id === currentProfileId) ?? null,
    [profiles, currentProfileId],
  )

  const createProfile = useCallback(
    async (input: { name: string; age: number | null; language: string }) => {
      const created = await api<Profile>('/profile', { method: 'POST', body: JSON.stringify(input) })
      const next = [...load<Profile[]>(K_PROFILES, []), created]
      persistProfiles(next)
      setCurrentProfileId(created.id)
      localStorage.setItem(K_CURRENT, created.id)
      return created
    },
    [persistProfiles],
  )

  const verifyProfile = useCallback(
    async (name: string, pin: string) => {
      try {
        const found = await api<Profile>('/profile/verify', {
          method: 'POST',
          body: JSON.stringify({ name, pin }),
        })
        if (!found) return null
        const existing = load<Profile[]>(K_PROFILES, [])
        if (!existing.some((p) => p.id === found.id)) persistProfiles([...existing, found])
        setCurrentProfileId(found.id)
        localStorage.setItem(K_CURRENT, found.id)
        setOffline(false)
        return found
      } catch {
        setOffline(true)
        return null
      }
    },
    [persistProfiles],
  )

  const removeProfile = useCallback(
    (id: string) => {
      persistProfiles(load<Profile[]>(K_PROFILES, []).filter((p) => p.id !== id))
      if (currentProfileId === id) {
        setCurrentProfileId(null)
        localStorage.removeItem(K_CURRENT)
      }
    },
    [currentProfileId, persistProfiles],
  )

  const setCurrentProfile = useCallback((id: string | null) => {
    setCurrentProfileId(id)
    if (id) localStorage.setItem(K_CURRENT, id)
    else localStorage.removeItem(K_CURRENT)
  }, [])

  const loadDailyChallenge = useCallback(
    async (lang?: string) => {
      if (!currentProfile) return null
      const query = `profileId=${currentProfile.id}&lang=${lang ?? currentProfile.language}`
      setLoadingChallenge(true)
      try {
        const data = await api<DailyChallenge>(`/challenge/daily?${query}`)
        setDailyChallenge(data)
        save(K_DAILY, data)
        setOffline(false)
        try {
          setMemory(await api<SessionMemory>(`/memory/${currentProfile.id}`))
        } catch {
          /* keep previous memory while offline */
        }
        return data
      } catch {
        setOffline(true)
        return load<DailyChallenge | null>(K_DAILY, null)
      } finally {
        setLoadingChallenge(false)
      }
    },
    [currentProfile],
  )

  const submitAnswer = useCallback(
    async (payload: { answer?: string; selectedAnswerId?: string }) => {
      if (!dailyChallenge || !currentProfile) return null
      setSubmitting(true)
      try {
        const result = await api<SubmitResult>(`/challenge/${dailyChallenge.id}/submit`, {
          method: 'POST',
          body: JSON.stringify({ profileId: currentProfile.id, ...payload }),
        })
        setDailyChallenge((prev) => (prev ? { ...prev, completed: true } : prev))
        save(K_DAILY, { ...dailyChallenge, completed: true })
        setMemory((prev) =>
          prev
            ? {
                ...prev,
                streak: result.streak,
                freezes: result.freezes,
                challenges: [
                  ...prev.challenges.filter((c) => c.id !== dailyChallenge.id),
                  {
                    id: dailyChallenge.id,
                    skill: dailyChallenge.skill,
                    title: dailyChallenge.title,
                    score: result.score,
                    feedback: result.feedback,
                    completedAt: Date.now(),
                  },
                ],
              }
            : prev,
        )
        return result
      } catch {
        setOffline(true)
        return null
      } finally {
        setSubmitting(false)
      }
    },
    [dailyChallenge, currentProfile],
  )

  const clearSession = useCallback(() => {
    setDailyChallenge(null)
    setMemory(null)
    localStorage.removeItem(K_DAILY)
  }, [])

  const value = useMemo(
    () => ({
      profiles,
      currentProfileId,
      currentProfile,
      dailyChallenge,
      memory,
      loadingChallenge,
      submitting,
      offline,
      createProfile,
      verifyProfile,
      removeProfile,
      setCurrentProfile,
      loadDailyChallenge,
      submitAnswer,
      clearSession,
    }),
    [profiles, currentProfileId, currentProfile, dailyChallenge, memory, loadingChallenge, submitting, offline, createProfile, verifyProfile, removeProfile, setCurrentProfile, loadDailyChallenge, submitAnswer, clearSession],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
