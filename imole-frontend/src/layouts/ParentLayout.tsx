import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { LayoutDashboard, LineChart, Settings, LogOut, Sun } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useT } from '../i18n/I18nContext'
import LangToggle from '../components/shared/LangToggle'

const TABS = [
  { to: '/parent', icon: LayoutDashboard, key: 'parent.dashboard.dashboard', end: true },
  { to: '/parent/reports', icon: LineChart, key: 'parent.dashboard.reports' },
  { to: '/parent/settings', icon: Settings, key: 'parent.dashboard.settings' },
]

export default function ParentLayout() {
  const { t } = useT()
  const { parentToken, setParentToken } = useAuth()
  const navigate = useNavigate()

  const logout = () => {
    setParentToken(null)
    navigate('/parent/login')
  }

  return (
    <div className="flex min-h-screen flex-col bg-bg-surface">
      <header className="sticky top-0 z-20 border-b border-border bg-bg-card/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center gap-4 px-4">
          <span className="flex items-center gap-2 font-heading text-lg font-black text-accent">
            <span className="flex size-8 items-center justify-center rounded-xl bg-gradient-to-br from-streak to-peach text-white">
              <Sun className="size-4" />
            </span>
            Imole
          </span>

          <nav className="ml-auto hidden items-center gap-1 lg:flex">
            {TABS.map(({ to, icon: Icon, key, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-bold transition-colors ${
                    isActive ? 'bg-accent text-accent-text' : 'text-text-secondary hover:bg-accent-soft/60'
                  }`
                }
              >
                <Icon className="size-4" />
                {t(key)}
              </NavLink>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1 lg:ml-3">
            <LangToggle />
            {parentToken && (
              <button
                onClick={logout}
                aria-label="Log out"
                className="cursor-pointer rounded-full p-2 text-text-muted transition-colors hover:bg-error/10 hover:text-error"
              >
                <LogOut className="size-4" />
              </button>
            )}
          </div>
        </div>

        <nav className="flex border-t border-border px-2 py-1 sm:hidden">
          {TABS.map(({ to, icon: Icon, key, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex flex-1 flex-col items-center gap-0.5 rounded-lg py-1.5 text-[10px] font-bold ${
                  isActive ? 'text-accent' : 'text-text-muted'
                }`
              }
            >
              <Icon className="size-4" />
              {t(key)}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}
