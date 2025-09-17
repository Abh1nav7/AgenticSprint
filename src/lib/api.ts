const API_URL = 'http://localhost:8000'

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token')
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  }

  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    credentials: 'include',
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.detail || 'An error occurred')
  }

  return data
}