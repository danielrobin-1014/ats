import { useMemo, useState } from 'react'
import { useJobs } from '../context/JobContext'
import { generateJobId } from '../utils/helpers'

const SAMPLE_APPLICANT = {
  name: 'Jane Doe',
  email: 'jane.doe@example.com'
}

export function JobsApplying() {
  const { jobs, dispatch } = useJobs()
  const [activeJobId, setActiveJobId] = useState(null)
  const [note, setNote] = useState('')

  const openJobs = useMemo(() => jobs, [jobs])

  const handleApply = (jobId) => {
    if (!note.trim()) {
      alert('Please add a short note or motivation before applying.')
      return
    }

    const application = {
      id: generateJobId('app'),
      applicantName: SAMPLE_APPLICANT.name,
      applicantEmail: SAMPLE_APPLICANT.email,
      note: note.trim(),
      dateApplied: new Date().toISOString().slice(0, 10)
    }

    dispatch({
      type: 'ADD_APPLICATION',
      payload: { jobId, application }
    })

    setNote('')
    setActiveJobId(null)
    alert('Application submitted!')
  }

  return (
    <div className="app-shell">
      <header className="applicant-header">
        <div>
          <h1>Browse open roles</h1>
          <p className="dashboard-subtitle">
            Select a job, add a quick note, and submit your application as the
            sample applicant.
          </p>
        </div>
      </header>

      <main className="applicant-layout">
        <section className="layout-main">
          <div className="job-cards">
            {openJobs.map((job) => (
              <article key={job.id} className="job-card">
                <div className="job-card-main">
                  <h2>
                    {job.role}{' '}
                    <span className="job-card-company">@ {job.company}</span>
                  </h2>
                  <p className="job-card-meta">
                    <span>{job.location}</span> ·{' '}
                    <span>Posted: {job.dateApplied}</span>
                  </p>
                  <p className="job-card-tags">
                    {job.resumeHighlights?.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </p>
                </div>
                <div className="job-card-actions">
                  <button
                    type="button"
                    className="primary-button"
                    onClick={() =>
                      setActiveJobId((prev) => (prev === job.id ? null : job.id))
                    }
                  >
                    {activeJobId === job.id ? 'Cancel' : 'Apply to this role'}
                  </button>
                  <span className="job-card-app-count">
                    {job.applications ? job.applications.length : 0} application
                    {job.applications && job.applications.length === 1
                      ? ''
                      : 's'}{' '}
                    so far
                  </span>
                </div>

                {activeJobId === job.id && (
                  <div className="apply-panel">
                    <div className="field">
                      <label htmlFor={`note-${job.id}`}>Short note</label>
                      <textarea
                        id={`note-${job.id}`}
                        rows={3}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Add a short motivation for this job..."
                      />
                    </div>
                    <div className="form-actions">
                      <button
                        type="button"
                        className="primary-button"
                        onClick={() => handleApply(job.id)}
                      >
                        Submit application
                      </button>
                      <button
                        type="button"
                        className="ghost-button"
                        onClick={() => {
                          setActiveJobId(null)
                          setNote('')
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </article>
            ))}

            {openJobs.length === 0 && (
              <div className="empty-state">
                No roles are available right now in this demo.
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}


