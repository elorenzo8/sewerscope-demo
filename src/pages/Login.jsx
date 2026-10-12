import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()
    navigate('/home')
  }

  return (
    <main className="login-page">
      <div className="login-container">

        <div className="brand">
  <div className="brand-wordmark">
    <span className="brand-sewer">Sewer</span>
    <span className="brand-scope">Scope</span>
  </div>
</div>

        <div className="login-heading">
          <h1>Welcome back</h1>
          <p>Sign in to continue to SewerScope</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
            />
          </div>

          <div className="form-group">
            <div className="password-label">
              <label htmlFor="password">Password</label>
              <button type="button" className="forgot-password">
                Forgot password?
              </button>
            </div>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="sign-in-button">
            Sign In <span>→</span>
          </button>

        </form>

        <div className="divider">
          <span></span>
          <p>or</p>
          <span></span>
        </div>

        <button className="sso-button">
          Continue with SSO
        </button>

        <p className="help-text">
          Need help? <button>Contact support</button>
        </p>

      </div>
    </main>
  )
}

export default Login