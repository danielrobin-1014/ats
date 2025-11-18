export function AdminDashboard({ jobs, onCreateJob, onViewApplications }) {
  const totalJobs = jobs.length
  const totalApplications = jobs.reduce(
    (acc, job) => acc + (job.applications ? job.applications.length : 0),
    0
  )

  const handleCreateJob = () => {
    if (onCreateJob) onCreateJob()
  }

  const handleViewApplications = () => {
    if (onViewApplications) onViewApplications()
  }

  return (
    <section className="dashboard" aria-label="Admin dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Admin dashboard</h1>
          <p className="dashboard-subtitle">
            Choose an action to manage job postings or review incoming
            applications.
          </p>
        </div>
        <div className="dashboard-total">
          <span className="total-number">{totalJobs}</span>
          <span className="total-label">Jobs in the system</span>
        </div>
      </div>

      <div className="dashboard-actions-row">
        <button
          type="button"
          className="status-card primary-card"
          onClick={handleCreateJob}
        >
          <span className="status-label">Job creation</span>
          <span className="status-count">Post a new job</span>
        </button>
        <button
          type="button"
          className="status-card"
          onClick={handleViewApplications}
        >
          <span className="status-label">Applications</span>
          <span className="status-count">{totalApplications}</span>
        </button>
      </div>
    </section>
  )
}

