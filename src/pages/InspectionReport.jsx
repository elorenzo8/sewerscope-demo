
import { useLocation, useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'

const reportIssues = [
  {
    id: 1,
    name: 'Possible crack',
    distance: '12.4 m',
    severity: 'Moderate',
    status: 'Confirmed',
  },
  {
    id: 2,
    name: 'Root intrusion',
    distance: '28.7 m',
    severity: 'High',
    status: 'Confirmed',
  },
  {
    id: 3,
    name: 'Joint offset',
    distance: '43.1 m',
    severity: 'Moderate',
    status: 'Needs Review',
  },
  {
    id: 4,
    name: 'Deposits',
    distance: '56.3 m',
    severity: 'Low',
    status: 'Needs Review',
  },
]

function InspectionReport() {
  const navigate = useNavigate()
  const location = useLocation()

  const inspection = location.state || {}

  const pipeId = inspection.pipeId || 'RD-0423'
  const project = inspection.project || 'Riverside District'

  function openIssue(issue) {
    navigate(`/inspection/issues/${issue.id}`, {
      state: {
        ...inspection,
        issue: {
          ...issue,
          category: issue.id === 1
            ? 'Cracks'
            : issue.id === 2
            ? 'Roots'
            : 'Other',
          confidence: issue.id === 1
            ? 87
            : issue.id === 2
            ? 78
            : 72,
        },
      },
    })
  }

  return (
    <main className="app-shell report-page">

      <header className="report-header">
        <button
          className="report-back"
          onClick={() => navigate('/inspection/issues')}
        >
          ‹
        </button>
        <h1>Inspection Report</h1>
      </header>

      <div className="report-scroll">

        <section className="report-heading">
          <div className="report-complete">
            ✓ Inspection Complete
          </div>

          <h2>{pipeId}</h2>
          <p>{project}</p>
          <span>Inspection Summary · Mar 15, 2025</span>
        </section>

        <section className="report-summary">
          <h3>Inspection Overview</h3>

          <div className="report-info-grid">
            <div>
              <span>Pipe ID</span>
              <strong>{pipeId}</strong>
            </div>
            <div>
              <span>Material</span>
              <strong>{inspection.material || 'Concrete (RCP)'}</strong>
            </div>
            <div>
              <span>Diameter</span>
              <strong>{inspection.diameter || '24 in (600 mm)'}</strong>
            </div>
            <div>
              <span>Direction</span>
              <strong>{inspection.direction || 'Upstream'}</strong>
            </div>
          </div>
        </section>

        <section className="report-stats">
          <div>
            <strong>4</strong>
            <span>Detected Issues</span>
          </div>
          <div>
            <strong>2</strong>
            <span>Confirmed</span>
          </div>
          <div>
            <strong>2</strong>
            <span>Needs Review</span>
          </div>
        </section>

        <section className="report-findings">
          <div className="report-section-title">
            <h3>Detected Findings</h3>
            <button
              onClick={() => navigate('/inspection/issues')}
            >
              View All
            </button>
          </div>

          {reportIssues.map(issue => (
            <button
              key={issue.id}
              className="report-finding"
              onClick={() => openIssue(issue)}
            >
              <div>
                <h4>{issue.name}</h4>
                <p>{issue.distance} · {issue.severity}</p>
              </div>

              <span
                className={
                  issue.status === 'Confirmed'
                    ? 'report-status confirmed'
                    : 'report-status pending'
                }
              >
                {issue.status}
              </span>

              <span className="report-finding-arrow">›</span>
            </button>
          ))}
        </section>

        <section className="report-notes">
          <h3>Inspector Notes</h3>
          <p>
            {inspection.notes ||
              'Inspection completed. Review outstanding findings before final approval.'}
          </p>
        </section>

        <section className="report-map-link">
          <div>
            <h3>Inspection Location</h3>
            <p>View detected issues along the inspected pipe.</p>
          </div>

          <button
            onClick={() =>
              navigate('/inspection/map', {
                state: inspection,
              })
            }
          >
            View on Map →
          </button>
        </section>

      </div>

      <footer className="report-footer">
        <button
          className="report-export"
          onClick={() => window.print()}
        >
          ↓ Export Report
        </button>

        <button
          className="report-home"
          onClick={() => navigate('/home')}
        >
          Back to Home
        </button>
      </footer>


    </main>
  )
}

export default InspectionReport
