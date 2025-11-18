import { useState } from 'react'

export const ROLES = {
  ADMIN: 'admin',
  APPLICANT: 'applicant'
}

export function AuthScreen({ onAuth }) {
  const [mode, setMode] = useState('login') // 'login' | 'register'

  return (
    <div className="login-shell">
      <div className="login-card">
        <h1>Job Application Tracker</h1>
        <p className="login-subtitle">
          {mode === 'login'
            ? 'Login as an admin or applicant to explore the ATS.'
            : 'Register a sample applicant account to explore the ATS.'}
        </p>

        <div className="login-buttons">
          <div>
            <button
              type="button"
              className="ghost-button"
              onClick={() => setMode('login')}
            >
              Login
            </button>
            <button
              type="button"
              className="ghost-button"
              onClick={() => setMode('register')}
            >
              Register
            </button>
          </div>
        </div>

        {mode === 'login' ? (
          <div className="login-buttons">
            <button
              type="button"
              className="primary-button"
              onClick={() => onAuth(ROLES.ADMIN)}
            >
              Login as admin
            </button>
            <button
              type="button"
              className="ghost-button"
              onClick={() => onAuth(ROLES.APPLICANT)}
            >
              Login as applicant
            </button>
          </div>
        ) : (
          <form
            className="job-form"
            onSubmit={(e) => {
              e.preventDefault()
              onAuth(ROLES.APPLICANT)
            }}
          >
            <div className="form-row">
              <div className="field">
                <label htmlFor="name">Full name</label>
                <input id="name" name="name" placeholder="Jane Doe" />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="jane@example.com"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="field">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="primary-button">
                Register & continue
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}


