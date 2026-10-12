import { useNavigate } from 'react-router-dom'
import SewerScopeLogo from '../assets/SewerScopeLogo.svg'
import InspectionHome from '../assets/inspection-home.svg'
import BottomNav from '../components/BottomNav'

function Home() {
  const navigate = useNavigate()

  const projects = [
    {
      name: 'Riverside District',
      id: 'RD-0423',
      details: '24 in (600 mm)',
      date: 'Mar 15, 2025',
      status: 'In Progress',
    },
    {
      name: 'Maple Ave Extension',
      id: 'MA-0012',
      details: '30 in (750 mm)',
      date: 'Mar 14, 2025',
      status: 'Not Started',
    },
    {
      name: 'Westside Interceptor',
      id: 'WI-3109',
      details: '36 in (900 mm)',
      date: 'Mar 10, 2025',
      status: 'Completed',
    },
  ]

  return (
    <main className="app-shell home-page">

      <section className="home-hero">

        <img
          src={InspectionHome}
          alt=""
          className="home-background"
        />

        <div className="home-dark-overlay"></div>

        <div className="home-content">

          <header className="home-topbar">
            <img
              src={SewerScopeLogo}
              alt="SewerScope"
              className="home-logo"
            />

            <div className="home-avatar">
              KL
            </div>
          </header>

          <div className="hero-copy">
            <h1>
              See<br />
              What Matters<br />
              <span>Underground</span>
            </h1>

            <p>
              SewerScope uses AI-powered inspection to
              help sewer professionals detect issues earlier,
              document faster, and keep cities running.
            </p>

            <button
              className="start-inspection-button"
              onClick={() => navigate('/inspection/new')}
            >
              Start New Inspection
              <span>→</span>
            </button>
          </div>

          <section className="projects-section">

            <div className="projects-heading">
              <h2>Your Projects</h2>
              <button>View All →</button>
            </div>

            <div className="project-list">
              {projects.map((project) => (
                <button
                  className="project-row"
                  key={project.id}
                >
                  <img
                    src={InspectionHome}
                    alt=""
                    className="project-thumbnail"
                  />

                  <div className="project-info">
                    <h3>{project.name}</h3>

                    <p>
                      {project.id} · {project.details}
                    </p>

                    <span>{project.date}</span>
                  </div>

                  <div className="project-right">
                    <span
                      className={`project-status ${
                        project.status === 'Completed'
                          ? 'completed'
                          : project.status === 'Not Started'
                          ? 'not-started'
                          : ''
                      }`}
                    >
                      {project.status}
                    </span>

                    <span className="project-chevron">›</span>
                  </div>
                </button>
              ))}
            </div>

          </section>

        </div>
      </section>

      <BottomNav />

    </main>
  )
}

export default Home