
import { useState } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import InspectionFeed from '../assets/inspection-feed.png'
import BottomNav from '../components/BottomNav'

const sampleIssues = [
  { id: 1, name: 'Possible crack', category: 'Cracks', distance: '12.4 m', confidence: 87, status: 'Needs Review', severity: 'Moderate' },
  { id: 2, name: 'Root intrusion', category: 'Roots', distance: '28.7 m', confidence: 78, status: 'Needs Review', severity: 'High' },
  { id: 3, name: 'Joint offset', category: 'Other', distance: '43.1 m', confidence: 72, status: 'Needs Review', severity: 'Moderate' },
  { id: 4, name: 'Deposits', category: 'Other', distance: '56.3 m', confidence: 68, status: 'Needs Review', severity: 'Low' },
]

function IssueDetails() {
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()

  const selectedIssue =
    location.state?.issue ||
    sampleIssues.find(issue => issue.id === Number(id)) ||
    sampleIssues[0]

  const [issue, setIssue] = useState(selectedIssue)
  const [editing, setEditing] = useState(false)
  const [notes, setNotes] = useState('')
  const [status, setStatus] = useState(selectedIssue.status)

  const descriptions = {
    Cracks: 'A possible structural crack has been identified along the interior pipe wall. Inspector verification is recommended.',
    Roots: 'Potential root intrusion detected inside the pipe. This may restrict flow or indicate an opening at a joint.',
    Other: 'An irregularity has been identified in the pipe interior. Further inspection is recommended.',
  }

  function goBack() {
    navigate('/inspection/issues')
  }

  function confirmIssue() {
    setStatus('Confirmed')
  }

  function dismissIssue() {
    setStatus('Dismissed')
  }

  return (
    <main className="app-shell issue-details-page">

      <header className="issue-details-header">
        <button onClick={goBack} aria-label="Back">
          ‹
        </button>
        <h1>Issue Details</h1>
      </header>

      <div className="issue-details-scroll">

        <div className="issue-details-image">
          <img src={InspectionFeed} alt="Inspection finding" />
          <span className="issue-image-label">
            AI Detection · {issue.confidence}% confidence
          </span>
        </div>

        <section className="issue-details-summary">
          <div className="issue-title-row">
            <div>
              <h2>{issue.name}</h2>
              <p>Pipe RD-0423 · {issue.distance}</p>
            </div>
            <span className={`issue-detail-status ${status.toLowerCase().replace(' ', '-')}`}>
              {status}
            </span>
          </div>

          <div className="issue-detail-grid">
            <div>
              <span>Detection Type</span>
              <strong>{issue.category}</strong>
            </div>
            <div>
              <span>Severity</span>
              <strong>{issue.severity || 'Moderate'}</strong>
            </div>
            <div>
              <span>Confidence</span>
              <strong>{issue.confidence}%</strong>
            </div>
            <div>
              <span>Distance</span>
              <strong>{issue.distance}</strong>
            </div>
          </div>
        </section>

        <section className="issue-detail-section">
          <h3>Detection Summary</h3>
          <p>{descriptions[issue.category]}</p>
        </section>

        
<section className="issue-detail-section">
  <h3>Location</h3>
  <p>
    Pipe RD-0423 · {issue.distance}
  </p>

  <button
    className="issue-map-button"
    onClick={() =>
      navigate('/inspection/map', {
        state: {
          ...location.state,
          pipeId: 'RD-0423',
          selectedIssueId: issue.id,
        },
      })
    }
  >
    View on Map →
  </button>
</section>


        <section className="issue-detail-section">
          <h3>Inspector Notes</h3>

          {editing ? (
            <>
              <label className="issue-edit-label">
                Finding name
                <input
                  value={issue.name}
                  onChange={e =>
                    setIssue({ ...issue, name: e.target.value })
                  }
                />
              </label>

              <label className="issue-edit-label">
                Severity
                <select
                  value={issue.severity || 'Moderate'}
                  onChange={e =>
                    setIssue({ ...issue, severity: e.target.value })
                  }
                >
                  <option>Low</option>
                  <option>Moderate</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>
              </label>
            </>
          ) : null}

          <textarea
            placeholder="Add inspection notes..."
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={3}
          />

          {editing && (
            <button
              className="save-issue-button"
              onClick={() => setEditing(false)}
            >
              Save Changes
            </button>
          )}
        </section>

        <section className="issue-detail-section">
          <h3>Related Images</h3>
          <div className="related-images">
            {[1, 2, 3].map(number => (
              <img
                key={number}
                src={InspectionFeed}
                alt={`Related inspection view ${number}`}
              />
            ))}
          </div>
        </section>

      </div>

      <footer className="issue-details-actions">
        {status === 'Confirmed' ? (
          <div className="issue-confirmed-message">
            ✓ Inspector Confirmed
          </div>
        ) : status === 'Dismissed' ? (
          <div className="issue-dismissed-message">
            Finding Dismissed
          </div>
        ) : (
          <button
            className="confirm-issue-button"
            onClick={confirmIssue}
          >
            ✓ Confirm Finding
          </button>
        )}

        <div className="issue-secondary-actions">
          <button onClick={() => setEditing(!editing)}>
            Edit Finding
          </button>
          <button onClick={dismissIssue}>
            Dismiss
          </button>
        </div>
      </footer>

        <BottomNav />
    </main>
  )
}

export default IssueDetails
