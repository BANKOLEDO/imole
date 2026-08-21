import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'

export default function RequireParentAuth({ children }: { children: ReactNode }) {
  const { parentToken } = useAuth()
  const location = useLocation()
  if (!parentToken) {
    return <Navigate to="/parent/login" replace state={{ from: location.pathname }} />
  }
  return <>{children}</>
}
