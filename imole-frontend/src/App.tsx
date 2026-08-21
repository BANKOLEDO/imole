import { Route, Routes } from 'react-router-dom'
import StarField from './components/StarField'
import LandingScene from './scenes/LandingScene'
import ComingSoon from './scenes/ComingSoon'
import ChildLayout from './layouts/ChildLayout'
import ChildDashboard from './scenes/child/ChildDashboard'

export default function App() {
  return (
    <>
      <StarField />
      <div className="min-h-screen bg-bg-base">
        <Routes>
          <Route path="/" element={<LandingScene />} />
          <Route element={<ChildLayout />}>
            <Route path="/dashboard" element={<ChildDashboard />} />
            <Route path="/challenge" element={<ComingSoon title="Today's Challenge" />} />
            <Route path="/leaderboard" element={<ComingSoon title="Leaderboard" />} />
            <Route path="/ask" element={<ComingSoon title="Ask Imole" />} />
            <Route path="/profile" element={<ComingSoon title="Profile" />} />
          </Route>
        </Routes>
      </div>
    </>
  )
}
