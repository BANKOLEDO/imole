import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function RequireParentAuth({ children }: { children: ReactNode }) {
  const { parentToken } = useAuth()
  if (!parentToken) return <Navigate to="/parent/login" replace />
  return <>{children}</>
}

export function RequireTeacherAuth({ children }: { children: ReactNode }) {
  const { teacherToken } = useAuth()
  if (!teacherToken) return <Navigate to="/school/login" replace />
  return <>{children}</>
}
