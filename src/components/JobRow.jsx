import { formatCurrency } from '../utils/helpers'

export function JobRow({
  job,
  isSelected,
  onToggleSelect,
  onEdit,
  onDelete
}) {
  return (
    <tr aria-label={`Job at ${job.company}`} className="job-row">
      <td>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelect(job.id)}
          aria-label={`Select job at ${job.company} for bulk actions`}
        />
      </td>
      <td>
        <div className="cell-main">
          <span className="company">{job.company}</span>
          <span className="role">{job.role}</span>
        </div>
        <div className="cell-sub">
          <span>{job.location}</span>
        </div>
      </td>
      <td>
        <span className={`status-pill status-${job.status.toLowerCase()}`}>
          {job.status}
        </span>
      </td>
      <td>{job.dateApplied}</td>
      <td>{formatCurrency(job.salary)}</td>
      <td>{job.applications ? job.applications.length : 0}</td>
      <td className="resume-highlights-cell">
        {job.resumeHighlights?.map((tag) => (
          <span className="tag" key={tag}>
            {tag}
          </span>
        ))}
      </td>
      <td className="actions-cell">
        <button
          type="button"
          className="ghost-button"
          onClick={() => onEdit(job)}
        >
          Edit
        </button>
        <button
          type="button"
          className="ghost-button danger"
          onClick={() => onDelete(job.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  )
}


