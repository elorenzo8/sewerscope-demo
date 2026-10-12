import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

import Login from './pages/Login'
import Home from './pages/Home'
import NewInspection from './pages/NewInspection'
import LiveInspection from './pages/LiveInspection'
import DetectedIssues from './pages/DetectedIssues'
import IssueDetails from './pages/IssueDetails'
import InspectionReport from './pages/InspectionReport'
import MapView from './pages/MapView'
import DemoLayout from './components/DemoLayout'

function App() {
  return (
    <BrowserRouter>
      <DemoLayout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/inspection/new" element={<NewInspection />} />
          <Route path="/inspection/live" element={<LiveInspection />} />
          <Route path="/inspection/issues" element={<DetectedIssues />} />
          <Route path="/inspection/issues/:id" element={<IssueDetails />} />
          <Route path="/inspection/report" element={<InspectionReport />} />
          <Route path="/inspection/map" element={<MapView />} />
        </Routes>
      </DemoLayout>
    </BrowserRouter>
  )
}

export default App