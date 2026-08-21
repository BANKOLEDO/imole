import { Route, Routes } from 'react-router-dom'
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

export default function App() {
  return (
    <>
      <StarField />
      <div className="min-h-screen bg-bg-base">
        <Routes>
          <Route path="/" element={<LandingScene />} />
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
