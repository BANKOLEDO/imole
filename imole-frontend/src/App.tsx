import { useEffect, useState } from 'react'
import { Download, X } from 'lucide-react'
import { Navigate, Route, Routes } from 'react-router-dom'
import StarField from './components/StarField'
import LandingScene from './scenes/LandingScene'
import ChildLayout from './layouts/ChildLayout'
import ParentLayout from './layouts/ParentLayout'
import RequireParentAuth from './components/shared/guards/RequireParentAuth'
import ChildDashboard from './scenes/child/ChildDashboard'
import ProfileSelector from './scenes/child/ProfileSelector'
import TodayChallenge from './scenes/child/challenge/TodayChallenge'
import AskImole from './scenes/child/AskImole'
import AnonymousBoard from './scenes/child/AnonymousBoard'
import ParentAuth from './scenes/parent/ParentAuth'
import ParentDashboard from './scenes/parent/ParentDashboard'
import ParentReports from './scenes/parent/ParentReports'
import ParentSettings from './scenes/parent/ParentSettings'
import { useApp } from './context/AppContext'

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

function InstallPrompt() {
  const [promptEvent, setPromptEvent] = useState<InstallPromptEvent | null>(null)

  useEffect(() => {
    const handlePrompt = (event: Event) => {
      event.preventDefault()
      setPromptEvent(event as InstallPromptEvent)
    }
    const handleInstalled = () => setPromptEvent(null)
    window.addEventListener('beforeinstallprompt', handlePrompt)
    window.addEventListener('appinstalled', handleInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', handlePrompt)
      window.removeEventListener('appinstalled', handleInstalled)
    }
  }, [])

  if (!promptEvent) return null

  const install = async () => {
    await promptEvent.prompt()
    const choice = await promptEvent.userChoice
    if (choice.outcome === 'accepted') setPromptEvent(null)
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 flex items-center justify-between gap-3 rounded-2xl bg-navy px-4 py-3 text-white shadow-xl sm:left-auto sm:max-w-sm">
      <span className="text-sm font-bold">Install Imole</span>
      <div className="flex items-center gap-1">
        <button type="button" onClick={() => void install()} className="inline-flex items-center gap-2 rounded-xl bg-orange px-3 py-2 text-xs font-bold text-navy-dark">
          <Download className="size-4" />
          Install
        </button>
        <button type="button" onClick={() => setPromptEvent(null)} aria-label="Dismiss install prompt" className="rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white">
          <X className="size-4" />
        </button>
      </div>
    </div>
  )
}

function RootRoute() {
  const { currentProfile } = useApp()
  return currentProfile ? <Navigate to="/app" replace /> : <LandingScene />
}

export default function App() {
  return (
    <>
      <InstallPrompt />
      <StarField />
      <div className="min-h-screen bg-bg-base">
        <Routes>
          <Route path="/" element={<RootRoute />} />
          <Route element={<ChildLayout />}>
            <Route path="/app" element={<ChildDashboard />} />
            <Route path="/app/challenge" element={<TodayChallenge />} />
            <Route path="/app/leaderboard" element={<AnonymousBoard />} />
            <Route path="/app/ask" element={<AskImole />} />
            <Route path="/app/profile" element={<ProfileSelector />} />
          </Route>

          <Route path="/parent/login" element={<ParentAuth />} />
          <Route
            element={
              <RequireParentAuth>
                <ParentLayout />
              </RequireParentAuth>
            }
          >
            <Route path="/parent" element={<ParentDashboard />} />
            <Route path="/parent/reports" element={<ParentReports />} />
            <Route path="/parent/settings" element={<ParentSettings />} />
          </Route>
        </Routes>
      </div>
    </>
  )
}
