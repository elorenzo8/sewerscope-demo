import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import InspectionFeed from '../assets/inspection-feed.png'

const initialIssues = [
  { id: 1, name: 'Possible crack', category: 'Cracks', distance: '12.4 m', confidence: 87, status: 'Confirmed', selected: true },
  { id: 2, name: 'Root intrusion', category: 'Roots', distance: '28.7 m', confidence: 78, status: 'Confirmed', selected: true },
  { id: 3, name: 'Joint offset', category: 'Other', distance: '43.1 m', confidence: 72, status: 'Needs Review', selected: false },
  { id: 4, name: 'Deposits', category: 'Other', distance: '56.3 m', confidence: 68, status: 'Needs Review', selected: false },
]

function DetectedIssues() {
  const navigate = useNavigate()
  const location = useLocation()
  const [filter, setFilter] = useState('All')
  const [issues, setIssues] = useState(initialIssues)
  const filters = ['All', 'Cracks', 'Roots', 'Other']
  const filteredIssues = issues.filter(issue => filter === 'All' || issue.category === filter)
  const reviewCount = issues.filter(issue => issue.status === 'Needs Review').length

  function toggleSelected(id) {
    setIssues(current => current.map(issue => issue.id === id ? { ...issue, selected: !issue.selected } : issue))
  }
  function openIssue(issue) {
    navigate(`/inspection/issues/${issue.id}`, { state: { ...location.state, issue } })
  }
  function reviewNext() {
    const next = issues.find(issue => issue.status === 'Needs Review') || issues[0]
    openIssue(next)
  }

  return (
    <main className="app-shell issues-page">
      <header className="issues-header">
        <button className="issues-back" onClick={() => navigate('/inspection/live', { state: location.state })} aria-label="Back">‹</button>
        <div>
          <h1>Detected Issues</h1>
          <p>{location.state?.project || 'Riverside District'} · {location.state?.pipeId || 'RD-0423'}</p>
        </div>
      </header>

      <div className="issues-scroll-area">
        <div className="issues-overview">
          <strong>{issues.length} detected</strong>
          <span className="issues-review-count"><span className="issues-review-dot" />{reviewCount} need review</span>
        </div>
        <div className="issues-filters">
          {filters.map(item => (
            <button key={item} className={`issues-filter ${filter === item ? 'active' : ''}`} onClick={() => setFilter(item)}>
              {item} ({item === 'All' ? issues.length : issues.filter(issue => issue.category === item).length})
            </button>
          ))}
        </div>
        <div className="issues-list">
          {filteredIssues.map(issue => (
            <article className="issue-row" key={issue.id}>
              <input type="checkbox" checked={issue.selected} onChange={() => toggleSelected(issue.id)} aria-label={`Select ${issue.name}`} />
              <button className="issue-open" onClick={() => openIssue(issue)}>
                <div className={`issue-thumbnail issue-thumbnail-${issue.id}`}>
                  <img src={InspectionFeed} alt="Inspection footage thumbnail" />
                </div>
                <div className="issue-info">
                  <h3>{issue.name}</h3>
                  <p><span aria-hidden="true">⌖</span> {issue.distance}</p>
                  <div className="issue-confidence-line">AI confidence <span className={`confidence-badge ${issue.confidence >= 80 ? 'high' : issue.confidence >= 75 ? 'medium' : 'low'}`}>{issue.confidence}%</span></div>
                </div>
                <div className="issue-right">
                  <span className={issue.status === 'Confirmed' ? 'confirmed-badge' : 'needs-review-badge'}>
                    {issue.status === 'Confirmed' ? '✓ ' : '● '}{issue.status}
                  </span>
                </div>
                <span className="issue-chevron">›</span>
              </button>
            </article>
          ))}
        </div>
        <div className="issues-review-footer">
          <p>ⓘ &nbsp; Review detections before adding them to your report.</p>
          <button onClick={reviewNext}>Review next issue <span>›</span></button>
        </div>
      </div>
      <BottomNav />
    </main>
  )
}

export default DetectedIssues
