import { useJobs } from '../context/JobContext'

export function Applications() {
  const { jobs } = useJobs()

  const jobsWithApplications = jobs.filter(
    (job) => job.applications && job.applications.length > 0
  )

  return (
    <div className="app-shell">
      <header className="applicant-header">
        <div>
          <h1>Applications</h1>
          <p className="dashboard-subtitle">
            Review applications submitted for each job in this demo.
          </p>
        </div>
      </header>

      <main className="applicant-layout">
        <section className="layout-main">
          <div className="job-cards">
            {jobsWithApplications.map((job) => (
              <article key={job.id} className="job-card">
                <div className="job-card-main">
                  <h2>
                    {job.role}{' '}
                    <span className="job-card-company">@ {job.company}</span>
                  </h2>
                  <p className="job-card-meta">
                    <span>{job.location}</span>
                  </p>
                </div>
                <div className="applications-panel">
                  <h3>Applications</h3>
                  <ul className="applications-list">
                    {job.applications.map((app) => (
                      <li key={app.id} className="applications-item">
                        <div className="applications-main">
                          <strong>{app.applicantName}</strong>
                          <span>{app.applicantEmail}</span>
                        </div>
                        <div className="applications-meta">
                          Applied on {app.dateApplied}
                        </div>
                        <p className="applications-note">{app.note}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}

            {jobsWithApplications.length === 0 && (
              <div className="empty-state">
                No applications yet in this demo. Have the applicant apply to a
                job first.
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}


