import axios from 'axios'

// Base URL will point to the FastAPI backend once it's live.
// Override via a .env file: VITE_API_BASE_URL=http://localhost:8000/api
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 120000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Flip this off once the FastAPI backend is deployed and endpoints below are wired up.
export const USE_MOCK_DATA = false
