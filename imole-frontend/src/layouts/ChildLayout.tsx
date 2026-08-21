import { Link, NavLink, Outlet } from 'react-router-dom'
import { Zap, Trophy, MessageCircle, UserRound } from 'lucide-react'
import { useT } from '../i18n/I18nContext'
import LangToggle from '../components/shared/LangToggle'

const NAV = [
  { to: '/app/challenge', key: 'nav.challenge', icon: Zap },
  { to: '/app/leaderboard', key: 'nav.leaderboard', icon: Trophy },
  { to: '/app/ask', key: 'nav.ask', icon: MessageCircle },
  { to: '/app/profile', key: 'nav.profile', icon: UserRound },
]

const itemClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 rounded-2xl px-4 py-3 font-heading text-sm font-bold ${
    isActive ? 'bg-accent-soft text-accent' : 'text-text-muted hover:bg-surface-hover'
  }`

export default function ChildLayout() {
  const { t } = useT()

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-60 flex-col gap-1 border-r border-border bg-bg-card p-4 md:flex">
        <div className="mb-6 flex items-center gap-2 px-2">
          <Link to="/" className="flex min-w-0 flex-1 items-center gap-2">
            <img src="/logo.svg" alt="Imole logo" className="size-9" />
            <span className="font-heading text-lg font-bold text-text-primary">Imole</span>
          </Link>
          <LangToggle />
        </div>
        {NAV.map(({ to, key, icon: Icon }) => (
          <NavLink key={to} to={to} className={itemClass}>
            <Icon className="size-5" />
            {t(key)}
          </NavLink>
        ))}
      </aside>

      <main className="flex-1 pb-20 md:pb-0">
        <div className="fixed right-3 top-3 z-30 md:hidden">
          <LangToggle />
        </div>
        <Outlet />
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-10 flex border-t border-border bg-bg-card md:hidden">
        {NAV.map(({ to, key, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px] font-bold ${
                isActive ? 'text-accent' : 'text-text-muted'
              }`
            }
          >
            <Icon className="size-5" />
            {t(key)}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
