import { useState } from 'react'
import { useJobs } from '../context/JobContext'
import { JobForm } from './JobForm'
import { generateJobId } from '../utils/helpers'

export function CreateJob() {
  const { dispatch } = useJobs()
  const [initialJob] = useState(null)

  const handleSave = (job) => {
    dispatch({
      type: 'ADD',
      payload: {
        ...job,
        id: generateJobId()
      }
    })
    alert('Job created in demo data.')
  }

  const handleCancel = () => {
    window.history.back()
  }

  return (
    <div className="app-shell">
      <main className="layout">
        <section className="layout-main">
          <div className="layout-main-header">
            <h2>Create job</h2>
          </div>
          <div className="layout-sidebar">
            <JobForm
              initialJob={initialJob}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          </div>
        </section>
      </main>
    </div>
  )
}


