import type { ApiErrorResponse, ApiResponse } from '../types/api'
import { ApiError } from '../types/api'
import { getAccessToken } from './session'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8082'

type RequestOptions = RequestInit & {
  authenticated?: boolean
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { authenticated = false, headers, ...rest } = options
  const mergedHeaders = new Headers(headers ?? {})

  if (!mergedHeaders.has('Content-Type') && rest.body) {
    mergedHeaders.set('Content-Type', 'application/json')
  }

  if (authenticated) {
    const token = getAccessToken()
    if (token) {
      mergedHeaders.set('Authorization', `Bearer ${token}`)
    }
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    headers: mergedHeaders,
  })

  const payload = (await response.json()) as ApiResponse<T> | ApiErrorResponse

  if (!response.ok) {
    throw new ApiError(payload.message, response.status, 'errors' in payload ? payload.errors : {})
  }

  return (payload as ApiResponse<T>).data
}

