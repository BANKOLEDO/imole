import { Link, NavLink, Outlet } from 'react-router-dom'
import { Zap, Trophy, MessageCircle, UserRound } from 'lucide-react'

const NAV = [
  { to: '/challenge', label: 'Challenge', icon: Zap },
  { to: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { to: '/ask', label: 'Ask Imole', icon: MessageCircle },
  { to: '/profile', label: 'Profile', icon: UserRound },
]

const itemClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 rounded-2xl px-4 py-3 font-heading text-sm font-bold ${
    isActive ? 'bg-accent-soft text-accent' : 'text-text-muted hover:bg-surface-hover'
  }`

export default function ChildLayout() {
  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-60 flex-col gap-1 border-r border-border bg-bg-card p-4 md:flex">
        <Link to="/" className="mb-6 flex items-center gap-2 px-2">
          <img src="/logo.svg" alt="Imole logo" className="size-9" />
          <span className="font-heading text-lg font-bold text-text-primary">Imole</span>
        </Link>
        {NAV.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={itemClass}>
            <Icon className="size-5" />
            {label}
          </NavLink>
        ))}
      </aside>

      <main className="flex-1 pb-20 md:pb-0">
        <Outlet />
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-10 flex border-t border-border bg-bg-card md:hidden">
        {NAV.map(({ to, label, icon: Icon }) => (
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
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
