import { useState } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import './App.css'
import { ApplicantView } from './components/ApplicantView'
import { AdminDashboard } from './components/Dashboard'
import { LandingPage } from './components/LandingPage'
import { AuthScreen, ROLES } from './components/AuthScreen'
import { JobsApplying } from './components/JobsApplying'
import { CreateJob } from './components/CreateJob'
import { Applications } from './components/Applications'
import { JobProvider, useJobs } from './context/JobContext'

function AdminDashboardRoute() {
  const { jobs } = useJobs()
  return (
    <div className="app-shell">
      <AdminDashboard jobs={jobs} />
    </div>
  )
}

export default function App() {
  const [role, setRole] = useState(null)
  const navigate = useNavigate()

  const handleAuth = (nextRole) => {
    setRole(nextRole)
    if (nextRole === ROLES.ADMIN) {
      navigate('/admin/dashboard', { replace: true })
    } else if (nextRole === ROLES.APPLICANT) {
      navigate('/applicant/dashboard', { replace: true })
    }
  }

  const handleSwitchRole = () => {
    if (role === ROLES.ADMIN) {
      handleAuth(ROLES.APPLICANT)
    } else {
      handleAuth(ROLES.ADMIN)
    }
  }

  return (
    <JobProvider>
      <nav className="top-nav">
        <div className="top-nav-left">
          <button
            type="button"
            className="nav-link"
            onClick={() => navigate('/')}
          >
            Home
          </button>
          {role === ROLES.APPLICANT && (
            <button
              type="button"
              className="nav-link"
              onClick={() => navigate('/jobs/apply')}
            >
              Jobs
            </button>
          )}
          {role === ROLES.ADMIN && (
            <>
              <button
                type="button"
                className="nav-link"
                onClick={() => navigate('/admin/create-job')}
              >
                Create job
              </button>
              <button
                type="button"
                className="nav-link"
                onClick={() => navigate('/admin/applications')}
              >
                Applications
              </button>
            </>
          )}
        </div>
        <div className="top-nav-title">Job Application Tracker (ATS)</div>
        <div className="top-nav-right">
          {role ? (
            <button
              type="button"
              className="ghost-button"
              onClick={handleSwitchRole}
            >
              {role === ROLES.ADMIN ? 'Switch to applicant' : 'Switch to admin'}
            </button>
          ) : (
            <button
              type="button"
              className="ghost-button"
              onClick={() => navigate('/auth')}
            >
              Login / Register
            </button>
          )}
        </div>
      </nav>

      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthScreen onAuth={handleAuth} />} />

        {/* Admin routes */}
        <Route
          path="/admin/dashboard"
          element={
            role === ROLES.ADMIN ? (
              <AdminDashboardRoute />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />
        <Route
          path="/admin/create-job"
          element={
            role === ROLES.ADMIN ? (
              <CreateJob />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />
        <Route
          path="/admin/applications"
          element={
            role === ROLES.ADMIN ? (
              <Applications />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />

        {/* Applicant routes */}
        <Route
          path="/applicant/dashboard"
          element={
            role === ROLES.APPLICANT ? (
              <ApplicantView />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />
        <Route
          path="/jobs/apply"
          element={
            role === ROLES.APPLICANT ? (
              <JobsApplying />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </JobProvider>
  )
}


