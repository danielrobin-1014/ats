export const STATUSES = ['Applied', 'Screening', 'Interview', 'Rejected']

export function createEmptyJob() {
  const today = new Date().toISOString().slice(0, 10)
  return {
    id: '',
    company: '',
    role: '',
    location: '',
    salary: '',
    dateApplied: today,
    status: 'Applied',
    resumeHighlights: [],
    notes: ''
  }
}

export function generateJobId(prefix = 'job') {
  const random = Math.random().toString(36).slice(2, 8)
  const time = Date.now().toString(36).slice(-4)
  return `${prefix}-${random}${time}`
}

export function formatCurrency(value) {
  if (value === null || value === undefined || value === '') return ''
  const num = Number(value)
  if (Number.isNaN(num)) return ''
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(num)
}

export function summarizeByStatus(jobs) {
  return STATUSES.reduce(
    (acc, status) => ({
      ...acc,
      [status]: jobs.filter((j) => j.status === status).length
    }),
    {}
  )
}

export function filterJobs(jobs, filters) {
  const { search, status, from, to } = filters

  return jobs.filter((job) => {
    if (status && status !== 'All' && job.status !== status) return false

    if (search) {
      const q = search.toLowerCase()
      const text =
        `${job.company} ${job.role} ${job.location} ${job.notes}`.toLowerCase()
      if (!text.includes(q)) return false
    }

    if (from && job.dateApplied < from) return false
    if (to && job.dateApplied > to) return false

    return true
  })
}

export function sortJobs(jobs, sortConfig) {
  if (!sortConfig || !sortConfig.key) return jobs
  const { key, direction } = sortConfig
  const multiplier = direction === 'asc' ? 1 : -1

  return [...jobs].sort((a, b) => {
    const av = a[key]
    const bv = b[key]

    if (av === bv) return 0
    if (av == null) return -1 * multiplier
    if (bv == null) return 1 * multiplier

    if (key === 'salary') {
      return (Number(av) - Number(bv)) * multiplier
    }

    if (key === 'dateApplied') {
      return (av.localeCompare(bv)) * multiplier
    }

    return String(av).localeCompare(String(bv)) * multiplier
  })
}


