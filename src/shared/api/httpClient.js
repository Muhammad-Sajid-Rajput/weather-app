import axios from 'axios'

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  headers: { 'Content-Type': 'application/json' },
  timeout: 20000,
})

const getErrorMessage = (error) => {
  if (axios.isCancel(error)) {
    return 'Request was cancelled.'
  }

  if (error.code === 'ECONNABORTED') {
    return 'Request timed out. Please check your connection and try again.'
  }

  if (!error.response) {
    return 'Unable to reach the server. Check your connection or try again later.'
  }

  const { status, data } = error.response
  const serverMessage = data?.message

  if (serverMessage) return serverMessage

  switch (status) {
    case 400:
      return 'Invalid request. Please check your input.'
    case 404:
      return 'Location not found. Try another city.'
    case 429:
      return 'Too many requests. Please wait a moment and try again.'
    case 502:
    case 503:
    case 504:
      return 'Weather service is temporarily unavailable.'
    default:
      return 'Something went wrong. Please try again.'
  }
}

httpClient.interceptors.response.use(
  (response) => {
    const body = response.data
    if (body && typeof body === 'object' && body.success === true && 'data' in body) {
      return { ...response, data: body.data }
    }
    if (body && body.success === false) {
      return Promise.reject(new Error(body.message || 'Request failed'))
    }
    return response
  },
  (error) => Promise.reject(new Error(getErrorMessage(error)))
)

export default httpClient
