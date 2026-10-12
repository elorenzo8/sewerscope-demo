
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import BottomNav from '../components/BottomNav'

const segments = [
  {
    id: 'RD-0423',
    x1: 60, y1: 120,
    x2: 310, y2: 300,
  },
  {
    id: 'RD-0424',
    x1: 310, y1: 300,
    x2: 335, y2: 510,
  },
  {
    id: 'RD-0425',
    x1: 60, y1: 120,
    x2: 95, y2: 430,
  },
]

const mapIssues = [
  {
    id: 1,
    name: 'Possible crack',
    distance: '12.4 m',
    confidence: 87,
    category: 'Cracks',
    severity: 'Moderate',
    x: 160, y: 192,
    pipeId: 'RD-0423',
  },
  {
    id: 2,
    name: 'Root intrusion',
    distance: '28.7 m',
    confidence: 78,
    category: 'Roots',
    severity: 'High',
    x: 255, y: 260,
    pipeId: 'RD-0423',
  },
  {
    id: 3,
    name: 'Joint offset',
    distance: '43.1 m',
    confidence: 72,
    category: 'Other',
    severity: 'Moderate',
    x: 323, y: 410,
    pipeId: 'RD-0424',
  },
  {
    id: 4,
    name: 'Deposits',
    distance: '56.3 m',
    confidence: 68,
    category: 'Other',
    severity: 'Low',
    x: 85, y: 340,
    pipeId: 'RD-0425',
  },
]

function MapView() {
  const navigate = useNavigate()
  const location = useLocation()

  const initialPipe =
    location.state?.pipeId || 'RD-0423'

  const [selectedPipe, setSelectedPipe] = useState(initialPipe)
  const [selectedIssue, setSelectedIssue] = useState(
    location.state?.selectedIssueId
      ? mapIssues.find(
          issue => issue.id === location.state.selectedIssueId
        ) || null
      : null
  )

  function selectIssue(issue) {
    setSelectedIssue(issue)
    setSelectedPipe(issue.pipeId)
  }

  function openIssue() {
    if (!selectedIssue) return

    navigate(`/inspection/issues/${selectedIssue.id}`, {
      state: {
        ...location.state,
        issue: selectedIssue,
      },
    })
  }

  return (
    <main className="app-shell map-page">

      <header className="map-header">
        <button onClick={() => navigate(-1)} aria-label="Back">
          ‹
        </button>
        <h1>Map View</h1>
      </header>

      <div className="map-toolbar">
        <span>Riverside District</span>
        <span className="map-toolbar-tag">Pipe Network</span>
      </div>

      <div className="map-canvas">
        <svg
          viewBox="0 0 390 590"
          className="sewer-network"
          role="img"
          aria-label="Illustrative sewer network map"
        >
          {/* Background grid */}
          <defs>
            <pattern
              id="map-grid"
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 32 0 L 0 0 0 32"
                fill="none"
                stroke="#e5eaf0"
                strokeWidth="1"
              />
            </pattern>
          </defs>

          <rect
            width="390"
            height="590"
            fill="#f2f5f8"
          />
          <rect
            width="390"
            height="590"
            fill="url(#map-grid)"
          />

          {/* Roads */}
          <path
            d="M 0 90 L 390 370"
            stroke="#dce2e8"
            strokeWidth="28"
          />
          <path
            d="M 80 0 L 125 590"
            stroke="#dce2e8"
            strokeWidth="24"
          />
          <path
            d="M 300 0 L 360 590"
            stroke="#e2e7ec"
            strokeWidth="20"
          />

          {/* Pipe segments */}
          {segments.map(segment => (
            <g
              key={segment.id}
              onClick={() => {
                setSelectedPipe(segment.id)
                setSelectedIssue(null)
              }}
              style={{ cursor: 'pointer' }}
            >
              <line
                x1={segment.x1}
                y1={segment.y1}
                x2={segment.x2}
                y2={segment.y2}
                stroke="transparent"
                strokeWidth="28"
              />

              <line
                x1={segment.x1}
                y1={segment.y1}
                x2={segment.x2}
                y2={segment.y2}
                stroke={
                  selectedPipe === segment.id
                    ? '#1677e8'
                    : '#7c8b9b'
                }
                strokeWidth={
                  selectedPipe === segment.id ? 9 : 6
                }
                strokeLinecap="round"
              />
            </g>
          ))}

          {/* Manholes */}
          {[
            [60, 120],
            [310, 300],
            [335, 510],
            [95, 430],
          ].map(([x, y], index) => (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="8"
              fill="#ffffff"
              stroke="#54677a"
              strokeWidth="3"
            />
          ))}

          {/* Issue markers */}
          {mapIssues.map(issue => (
            <g
              key={issue.id}
              onClick={() => selectIssue(issue)}
              style={{ cursor: 'pointer' }}
            >
              <circle
                cx={issue.x}
                cy={issue.y}
                r={selectedIssue?.id === issue.id ? 17 : 14}
                fill={
                  selectedIssue?.id === issue.id
                    ? '#d64a55'
                    : '#e47b55'
                }
                stroke="white"
                strokeWidth="3"
              />

              <text
                x={issue.x}
                y={issue.y + 4}
                textAnchor="middle"
                fontSize="13"
                fontWeight="bold"
                fill="white"
              >
                !
              </text>
            </g>
          ))}

          {/* Pipe label */}
          <rect
            x="170"
            y="120"
            width="95"
            height="27"
            rx="6"
            fill="white"
            stroke="#d6dee6"
          />
          <text
            x="217"
            y="138"
            textAnchor="middle"
            fontSize="12"
            fill="#344054"
          >
            {selectedPipe}
          </text>
        </svg>

        {/* Selected issue information */}
        <div className="map-info-card">
          {selectedIssue ? (
            <>
              <span className="map-card-eyebrow">
                SELECTED FINDING
              </span>

              <h3>{selectedIssue.name}</h3>

              <p>
                {selectedIssue.pipeId} · {selectedIssue.distance}
              </p>

              <div className="map-card-bottom">
                <span>
                  {selectedIssue.confidence}% confidence
                </span>

                <button onClick={openIssue}>
                  View Details →
                </button>
              </div>
            </>
          ) : (
            <>
              <span className="map-card-eyebrow">
                SELECTED PIPE
              </span>

              <h3>{selectedPipe}</h3>

              <p>
                {mapIssues.filter(
                  issue => issue.pipeId === selectedPipe
                ).length} detected issue(s)
              </p>

              <span className="map-card-hint">
                Tap a marker to inspect a finding.
              </span>
            </>
          )}
        </div>
      </div>
      <BottomNav />
    </main>
  )
}

export default MapView
