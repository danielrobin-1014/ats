import { useEffect, useState } from 'react'
import { STATUSES, createEmptyJob } from '../utils/helpers'

export function JobForm({ initialJob, onSave, onCancel }) {
  const [job, setJob] = useState(() => initialJob ?? createEmptyJob())
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setJob(initialJob ?? createEmptyJob())
    setErrors({})
  }, [initialJob])

  const handleChange = (e) => {
    const { name, value } = e.target
    setJob((prev) => ({ ...prev, [name]: value }))
  }

  const handleSalaryChange = (e) => {
    const value = e.target.value
    if (value === '') {
      setJob((prev) => ({ ...prev, salary: '' }))
      return
    }
    const numeric = Number(value)
    if (!Number.isNaN(numeric)) {
      setJob((prev) => ({ ...prev, salary: numeric }))
    }
  }

  const handleHighlightsChange = (e) => {
    const value = e.target.value
    const tags = value
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)
    setJob((prev) => ({ ...prev, resumeHighlights: tags }))
  }

  const validate = () => {
    const nextErrors = {}
    if (!job.company.trim()) nextErrors.company = 'Company is required'
    if (!job.role.trim()) nextErrors.role = 'Role is required'
    if (!job.dateApplied) nextErrors.dateApplied = 'Date applied is required'
    if (!job.status) nextErrors.status = 'Status is required'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    onSave(job)
  }

  return (
    <form className="job-form" onSubmit={handleSubmit}>
      <h2>{job.id ? 'Edit application' : 'Add new application'}</h2>

      <div className="form-row">
        <div className="field">
          <label htmlFor="company">Company</label>
          <input
            id="company"
            name="company"
            value={job.company}
            onChange={handleChange}
            placeholder="Acme Corp"
          />
          {errors.company && (
            <span className="field-error">{errors.company}</span>
          )}
        </div>
        <div className="field">
          <label htmlFor="role">Role</label>
          <input
            id="role"
            name="role"
            value={job.role}
            onChange={handleChange}
            placeholder="Frontend Developer"
          />
          {errors.role && <span className="field-error">{errors.role}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            name="location"
            value={job.location}
            onChange={handleChange}
            placeholder="Remote"
          />
        </div>
        <div className="field">
          <label htmlFor="salary">Salary (USD)</label>
          <input
            id="salary"
            name="salary"
            type="number"
            min="0"
            step="1000"
            value={job.salary}
            onChange={handleSalaryChange}
            placeholder="90000"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor="dateApplied">Date applied</label>
          <input
            id="dateApplied"
            name="dateApplied"
            type="date"
            value={job.dateApplied}
            onChange={handleChange}
          />
          {errors.dateApplied && (
            <span className="field-error">{errors.dateApplied}</span>
          )}
        </div>
        <div className="field">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={job.status}
            onChange={handleChange}
          >
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          {errors.status && (
            <span className="field-error">{errors.status}</span>
          )}
        </div>
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor="resumeHighlights">Resume highlights</label>
          <input
            id="resumeHighlights"
            name="resumeHighlights"
            value={job.resumeHighlights?.join(', ') ?? ''}
            onChange={handleHighlightsChange}
            placeholder="React, TypeScript, Accessibility"
          />
          <span className="field-hint">Comma-separated keywords</span>
        </div>
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            value={job.notes}
            onChange={handleChange}
            placeholder="Referred by..., recruiter name, etc."
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="primary-button">
          {job.id ? 'Save changes' : 'Add application'}
        </button>
        <button
          type="button"
          className="ghost-button"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}


