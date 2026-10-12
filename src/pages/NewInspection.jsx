
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'

function NewInspection() {
  const navigate = useNavigate()

  // Prefilled sample inspection data
  const [form, setForm] = useState({
    project: 'Riverside District',
    pipeId: 'RD-0423',
    material: 'Concrete (RCP)',
    diameter: '24 in (600 mm)',
    direction: 'Upstream',
    notes: '',
  })

  function updateField(field, value) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }))
  }

  function handleStart(event) {
    event.preventDefault()

    // Pass inspection details to Live Inspection
    navigate('/inspection/live', {
      state: form,
    })
  }

  return (
    <main className="app-shell inspection-form-page">

      {/* Header */}
      <header className="inspection-form-header">
        <button
          type="button"
          className="inspection-back"
          onClick={() => navigate('/home')}
          aria-label="Back to Home"
        >
          ‹
        </button>

        <h1>New Inspection</h1>
      </header>

      {/* Inspection Form */}
      <form
        className="inspection-form-content"
        onSubmit={handleStart}
      >
        <div className="inspection-fields">

          <label className="inspection-field">
            <span>Project / Site</span>
            <input
              type="text"
              value={form.project}
              onChange={(e) =>
                updateField('project', e.target.value)
              }
              required
            />
          </label>

          <label className="inspection-field">
            <span>Pipe ID (optional)</span>
            <input
              type="text"
              value={form.pipeId}
              onChange={(e) =>
                updateField('pipeId', e.target.value)
              }
            />
          </label>

          <label className="inspection-field">
            <span>Pipe Material</span>
            <select
              value={form.material}
              onChange={(e) =>
                updateField('material', e.target.value)
              }
            >
              <option>Concrete (RCP)</option>
              <option>PVC</option>
              <option>Vitrified Clay</option>
              <option>Cast Iron</option>
            </select>
          </label>

          <label className="inspection-field">
            <span>Pipe Diameter</span>
            <select
              value={form.diameter}
              onChange={(e) =>
                updateField('diameter', e.target.value)
              }
            >
              <option>18 in (450 mm)</option>
              <option>24 in (600 mm)</option>
              <option>30 in (750 mm)</option>
              <option>36 in (900 mm)</option>
            </select>
          </label>

          {/* Direction */}
          <div className="inspection-field">
            <span>Inspection Direction</span>

            <div className="direction-options">
              <button
                type="button"
                className={
                  form.direction === 'Upstream'
                    ? 'direction-button selected'
                    : 'direction-button'
                }
                onClick={() =>
                  updateField('direction', 'Upstream')
                }
              >
                ↑ Upstream
              </button>

              <button
                type="button"
                className={
                  form.direction === 'Downstream'
                    ? 'direction-button selected'
                    : 'direction-button'
                }
                onClick={() =>
                  updateField('direction', 'Downstream')
                }
              >
                ↓ Downstream
              </button>
            </div>
          </div>

          {/* Notes */}
          <label className="inspection-field">
            <span>Notes (optional)</span>
            <textarea
              placeholder="Add any relevant notes..."
              value={form.notes}
              onChange={(e) =>
                updateField('notes', e.target.value)
              }
              rows={4}
            />
          </label>

        </div>

        {/* Demo helper */}
        <p className="demo-helper">
          Sample inspection details are prefilled for this demo.
        </p>

        {/* Start Recording */}
        <button
          type="submit"
          className="start-recording-button"
        >
          <span>▣</span>
          Start Recording
        </button>

      </form>

    

    </main>
  )
}

export default NewInspection
