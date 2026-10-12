import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import InspectionFeed from '../assets/inspection-feed.png'
import PauseButton from '../assets/PauseButton.svg'

function LiveInspection() {
  const navigate = useNavigate()
  const location = useLocation()
  const inspection = location.state || {
    project: 'Riverside District', pipeId: 'RD-0423',
    material: 'Concrete (RCP)', diameter: '24 in (600 mm)', direction: 'Upstream',
  }
  const [isRecording, setIsRecording] = useState(true)
  const [seconds, setSeconds] = useState(0)
  const [captured, setCaptured] = useState(false)

  useEffect(() => {
    if (!isRecording) return
    const interval = setInterval(() => setSeconds(s => s + 1), 1000)
    return () => clearInterval(interval)
  }, [isRecording])

  const formatTime = total => [Math.floor(total / 3600), Math.floor(total % 3600 / 60), total % 60]
    .map(n => String(n).padStart(2, '0')).join(':')

  function stopInspection() {
    navigate('/inspection/issues', { state: { ...inspection, duration: seconds } })
  }

  function captureFrame() {
    setCaptured(true)
    window.setTimeout(() => setCaptured(false), 1800)
  }

  return (
    <main className="app-shell live-inspection-page">
      <header className="live-header">
        <button className="live-back" onClick={() => navigate('/inspection/new')} aria-label="Back">‹</button>
        <div className="live-header-center">
          <h1>Live Inspection</h1>
          <div className="recording-status">
            <span className={`recording-dot ${isRecording ? '' : 'paused'}`} />
            <span>{isRecording ? 'Recording' : 'Paused'} · {formatTime(seconds)}</span>
          </div>
          <p className="live-project-name">{inspection.project || 'Riverside District'} · {inspection.pipeId || 'RD-0423'}</p>
        </div>
      </header>

      <section className="camera-feed">
        <img src={InspectionFeed} alt="Sewer inspection camera" className="camera-image" />
        <div className="live-feed-topline">
          <span className="live-feed-tag"><i /> LIVE</span>
          <span className="live-ai-tag">✦ AI detection on</span>
        </div>
        <div className="detection detection-crack">
          <div className="detection-box" />
          <div className="detection-label"><strong>Possible crack</strong><span>87%</span></div>
        </div>
        <div className="detection detection-root">
          <div className="detection-box" />
          <div className="detection-label"><strong>Root intrusion</strong><span>78%</span></div>
        </div>
        <div className="live-feed-bottom">
          <div className="camera-metadata">
            <div><span>PIPE</span><strong>{inspection.pipeId || 'RD-0423'}</strong></div>
            <div><span>DISTANCE</span><strong>12.4 m</strong></div>
          </div>
          <div className="inspection-radar" aria-label="Camera orientation indicator">
            <div className="radar-ring radar-ring-one" />
            <div className="radar-ring radar-ring-two" />
            <div className="radar-horizontal" />
            <div className="radar-vertical" />
            <div className="radar-center" />
            <span className="radar-north">N</span>
          </div>
        </div>
      </section>

      <div className="live-detection-summary">
        <div className="live-summary-icon">◇</div>
        <div><strong>2 issues detected</strong><span>Possible crack, Root intrusion</span></div>
        <button onClick={stopInspection}>Review <span aria-hidden="true">→</span></button>
      </div>

      <div className="recording-controls">
        <button className="live-control" onClick={() => setIsRecording(r => !r)} aria-label={isRecording ? 'Pause' : 'Resume'}>
          <span className="recording-secondary">
  {isRecording ? (
    <img
      src={PauseButton}
      alt=""
      className="custom-pause-icon"
    />
  ) : (
    '▶'
  )}
</span>
          <span>{isRecording ? 'Pause' : 'Resume'}</span>
        </button>
        <button className="live-control" onClick={stopInspection} aria-label="End inspection">
          <span className={`recording-stop ${isRecording ? 'recording-pulse' : ''}`}>
  ■
</span>
          <span>End inspection</span>
        </button>
        <button className="live-control" onClick={captureFrame} aria-label="Capture frame">
          <span className="recording-secondary capture-icon">▣</span>
          <span>{captured ? 'Captured' : 'Capture'}</span>
        </button>
      </div>
    </main>
  )
}

export default LiveInspection
