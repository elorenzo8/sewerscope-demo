
import { useNavigate, useLocation } from 'react-router-dom'

function BottomNav({ variant = 'dark' }) {
  const navigate = useNavigate()
  const location = useLocation()
  const path = location.pathname

  const isMap = path === '/inspection/map'
  const isReport = path === '/inspection/report'
  const isNewInspection = path === '/inspection/new'
  const isHome = path === '/home'

  return (
    <nav className={`bottom-nav shared-bottom-nav ${variant}`}>
      <button
        className={`nav-item ${isNewInspection ? 'active' : ''}`}
        onClick={() => navigate('/inspection/new')}
      >
        <span>▣</span>
        <p>New<br />Inspection</p>
      </button>

      <button
        className={`nav-item ${isMap ? 'active' : ''}`}
        onClick={() => navigate('/inspection/map')}
      >
        <span className="map-nav-icon">⌖</span>
        <p>Map<br />View</p>
      </button>

      <button
        className={`nav-main-button ${isHome ? 'active' : ''}`}
        onClick={() => navigate('/home')}
        aria-label="Home"
      >
        ⌂
      </button>

      <button
        className={`nav-item ${isReport ? 'active' : ''}`}
        onClick={() => navigate('/inspection/report')}
      >
        <span>▥</span>
        <p>Reports</p>
      </button>

      <button
        className="nav-item"
        disabled
        title="Settings coming soon"
      >
        <span>⚙</span>
        <p>Settings</p>
      </button>
    </nav>
  )
}

export default BottomNav
