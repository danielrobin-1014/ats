import { createContext, useContext, useEffect, useReducer } from 'react'
import seedJobs from '../data/seedJobs.json'
import { loadJobs, saveJobs } from '../utils/storage'

const JobContext = createContext(null)

const initialState = {
  jobs: [],
  isLoading: true
}

function jobReducer(state, action) {
  switch (action.type) {
    case 'INIT': {
      return {
        ...state,
        jobs: action.payload,
        isLoading: false
      }
    }
    case 'ADD': {
      return {
        ...state,
        jobs: [action.payload, ...state.jobs]
      }
    }
    case 'UPDATE': {
      return {
        ...state,
        jobs: state.jobs.map((job) =>
          job.id === action.payload.id ? action.payload : job
        )
      }
    }
    case 'DELETE': {
      return {
        ...state,
        jobs: state.jobs.filter((job) => job.id !== action.payload)
      }
    }
    case 'BULK_UPDATE_STATUS': {
      const { ids, status } = action.payload
      return {
        ...state,
        jobs: state.jobs.map((job) =>
          ids.includes(job.id) ? { ...job, status } : job
        )
      }
    }
    case 'ADD_APPLICATION': {
      const { jobId, application } = action.payload
      return {
        ...state,
        jobs: state.jobs.map((job) =>
          job.id === jobId
            ? {
                ...job,
                applications: [...(job.applications || []), application]
              }
            : job
        )
      }
    }
    default:
      return state
  }
}

export function JobProvider({ children }) {
  const [state, dispatch] = useReducer(jobReducer, initialState)

  useEffect(() => {
    const stored = loadJobs()
    if (stored && stored.length) {
      dispatch({ type: 'INIT', payload: stored })
    } else {
      // ensure seed jobs have applications array for consistency
      const normalized = seedJobs.map((job) => ({
        ...job,
        applications: job.applications || []
      }))
      dispatch({ type: 'INIT', payload: normalized })
    }
  }, [])

  useEffect(() => {
    if (!state.isLoading) {
      saveJobs(state.jobs)
    }
  }, [state.jobs, state.isLoading])

  const value = {
    jobs: state.jobs,
    isLoading: state.isLoading,
    dispatch
  }

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>
}

export function useJobs() {
  const ctx = useContext(JobContext)
  if (!ctx) {
    throw new Error('useJobs must be used within a JobProvider')
  }
  return ctx
}

