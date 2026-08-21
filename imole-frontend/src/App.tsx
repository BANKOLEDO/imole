import { Route, Routes } from 'react-router-dom'
import StarField from './components/StarField'
import LandingScene from './scenes/LandingScene'
import ChildLayout from './layouts/ChildLayout'
import ChildDashboard from './scenes/child/ChildDashboard'
import ProfileSelector from './scenes/child/ProfileSelector'
import TodayChallenge from './scenes/child/challenge/TodayChallenge'
import AskImole from './scenes/child/AskImole'
import AnonymousBoard from './scenes/child/AnonymousBoard'

export default function App() {
  return (
    <>
      <StarField />
      <div className="min-h-screen bg-bg-base">
        <Routes>
          <Route path="/" element={<LandingScene />} />
          <Route element={<ChildLayout />}>
            <Route path="/dashboard" element={<ChildDashboard />} />
            <Route path="/challenge" element={<TodayChallenge />} />
            <Route path="/leaderboard" element={<AnonymousBoard />} />
            <Route path="/ask" element={<AskImole />} />
            <Route path="/profile" element={<ProfileSelector />} />
          </Route>
        </Routes>
      </div>
    </>
  )
}
