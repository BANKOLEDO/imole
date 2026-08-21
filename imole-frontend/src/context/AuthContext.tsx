import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

const PARENT_KEY = 'imole_parent_token'
const TEACHER_KEY = 'imole_teacher_token'

type AuthValue = {
  parentToken: string | null
  teacherToken: string | null
  setParentToken: (token: string | null) => void
  setTeacherToken: (token: string | null) => void
}

const AuthContext = createContext<AuthValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [parentToken, setParentState] = useState<string | null>(() =>
    localStorage.getItem(PARENT_KEY),
  )
  const [teacherToken, setTeacherState] = useState<string | null>(() =>
    localStorage.getItem(TEACHER_KEY),
  )

  const setParentToken = useCallback((token: string | null) => {
    setParentState(token)
    if (token) localStorage.setItem(PARENT_KEY, token)
    else localStorage.removeItem(PARENT_KEY)
  }, [])

  const setTeacherToken = useCallback((token: string | null) => {
    setTeacherState(token)
    if (token) localStorage.setItem(TEACHER_KEY, token)
    else localStorage.removeItem(TEACHER_KEY)
  }, [])

  const value = useMemo(
    () => ({ parentToken, teacherToken, setParentToken, setTeacherToken }),
    [parentToken, teacherToken, setParentToken, setTeacherToken],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
