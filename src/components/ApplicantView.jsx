import { useMemo } from 'react'
import { useJobs } from '../context/JobContext'

const SAMPLE_APPLICANT = {
  name: 'Jane Doe',
  email: 'jane.doe@example.com'
}

export function ApplicantView() {
  const { jobs } = useJobs()

  const appliedJobs = useMemo(
    () =>
      jobs.filter(
        (job) =>
          job.applications &&
          job.applications.some(
            (app) => app.applicantEmail === SAMPLE_APPLICANT.email
          )
      ),
    [jobs]
  )

  return (
    <div className="app-shell">
      <header className="applicant-header">
        <div>
          <h1>Your applications</h1>
          <p className="dashboard-subtitle">
            Track the jobs you have applied for and see their current status.
          </p>
        </div>
        <div className="applicant-badge">
          <span className="badge-label">Sample applicant</span>
          <span className="badge-main">{SAMPLE_APPLICANT.name}</span>
          <span className="badge-sub">{SAMPLE_APPLICANT.email}</span>
        </div>
      </header>

      <main className="applicant-layout">
        <section className="layout-main">
          <div className="job-cards">
            {appliedJobs.map((job) => (
              <article key={job.id} className="job-card">
                <div className="job-card-main">
                  <h2>
                    {job.role}{' '}
                    <span className="job-card-company">@ {job.company}</span>
                  </h2>
                  <p className="job-card-meta">
                    <span>{job.location}</span>
                  </p>
                  <p className="job-card-tags">
                    <span
                      className={`status-pill status-${job.status.toLowerCase()}`}
                    >
                      {job.status}
                    </span>
                  </p>
                </div>
              </article>
            ))}

            {appliedJobs.length === 0 && (
              <div className="empty-state">
                You haven&apos;t applied to any jobs yet in this demo.
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

