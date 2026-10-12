
import { useLocation } from "react-router-dom"

export default function DemoLayout({ children }) {
  const location = useLocation()
  const isHome = location.pathname === "/home"

  return (
    <div className="demo-layout">
      {/* LEFT INTRODUCTION */}
      <aside className="demo-intro">
        <div className="demo-intro-main">
          <div className="demo-eyebrow">
            <span className="demo-dot" />
            INTERACTIVE WEB DEMO
          </div>

          <h1>
            Explore
            <br />
            Sewer<span className="demo-period">Scope.</span>
          </h1>

          <p className="demo-description">
            A mobile inspection app that helps sewer
            professionals review detected issues, document
            findings, and map their next steps.
          </p>

          <a
            href="https://shining-growth-724562.framer.app/sewerscope"
            target="_blank"
            rel="noopener noreferrer"
            className="demo-case-study-link"
          >
            <br/>
            View the case study ↗
          </a>
        </div>

        <p className="demo-credit">
          Designed &amp; built as a frontend prototype
        </p>
      </aside>

      {/* CENTER: EXISTING REACT APP */}
      <div className="demo-phone-area">
        <div className="demo-phone">
          {children}
        </div>
      </div>

      {/* RIGHT INSTRUCTIONS */}
      <aside className="demo-guide">
        {isHome && (
          <div className="demo-start-hint">

            <svg
              viewBox="0 0 300 250"
              fill="none"
              aria-hidden="true"
            >
             
            </svg>
          </div>
        )}

        <div className="demo-guide-content">
          <h2>Functionalities to test</h2>

<div className="demo-guide-divider"></div>

          <div className="demo-guide-step">
            <span className="demo-step-number">1</span>
            <div>
              <h3>Start an inspection</h3>
              <p>Explore a sample inspection workflow.</p>
            </div>
          </div>

          <div className="demo-guide-step">
            <span className="demo-step-number">2</span>
            <div>
              <h3>Review an issue</h3>
              <p>Inspect findings and confirm the details.</p>
            </div>
          </div>

          <div className="demo-guide-step">
            <span className="demo-step-number">3</span>
            <div>
              <h3>Explore the map</h3>
              <p>See where detected issues are located.</p>
            </div>
          </div>

          <p className="demo-disclaimer">
            Sample data · Simulated inspection
          </p>
        </div>
      </aside>
    </div>
  )
}
