import { JobRow } from './JobRow'

const columns = [
  { key: 'company', label: 'Company / Role', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'dateApplied', label: 'Date Applied', sortable: true },
  { key: 'salary', label: 'Salary', sortable: true },
  { key: 'applications', label: 'Apps', sortable: false },
  { key: 'resumeHighlights', label: 'Highlights', sortable: false },
  { key: 'actions', label: 'Actions', sortable: false }
]

export function JobTable({
  jobs,
  selectedIds,
  onToggleSelect,
  onEdit,
  onDelete,
  sortConfig,
  onSort
}) {
  const isAllSelected =
    jobs.length > 0 && jobs.every((job) => selectedIds.includes(job.id))

  const handleToggleAll = () => {
    if (isAllSelected) {
      jobs.forEach((job) => {
        if (selectedIds.includes(job.id)) {
          onToggleSelect(job.id)
        }
      })
    } else {
      jobs.forEach((job) => {
        if (!selectedIds.includes(job.id)) {
          onToggleSelect(job.id)
        }
      })
    }
  }

  const renderSortIndicator = (key) => {
    if (!sortConfig || sortConfig.key !== key) return null
    return sortConfig.direction === 'asc' ? '▲' : '▼'
  }

  return (
    <div className="table-wrapper" role="region" aria-label="Job applications">
      <table className="job-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={handleToggleAll}
                aria-label="Select all jobs"
              />
            </th>
            {columns.map((col) => (
              <th key={col.key} scope="col">
                {col.sortable ? (
                  <button
                    type="button"
                    className="sort-header"
                    onClick={() => onSort(col.key)}
                  >
                    <span>{col.label}</span>
                    <span className="sort-indicator">
                      {renderSortIndicator(col.key)}
                    </span>
                  </button>
                ) : (
                  col.label
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {jobs.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1} className="empty-state">
                No applications match your filters. Try broadening your search.
              </td>
            </tr>
          ) : (
            jobs.map((job) => (
              <JobRow
                key={job.id}
                job={job}
                isSelected={selectedIds.includes(job.id)}
                onToggleSelect={onToggleSelect}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}


