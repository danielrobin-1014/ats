const STORAGE_KEY = 'job_tracker_v1'

export function loadJobs() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return null
    return parsed
  } catch (err) {
    console.error('Failed to load jobs from storage', err)
    return null
  }
}

export function saveJobs(jobs) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs))
  } catch (err) {
    console.error('Failed to save jobs to storage', err)
  }
}


