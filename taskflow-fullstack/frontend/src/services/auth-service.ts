import { apiRequest } from '../lib/api-client'
import { clearSessionTokens, getRefreshToken, setSessionTokens } from '../lib/session'
import type {
  AuthResponse,
  CurrentUserResponse,
  LoginRequest,
  RegisterRequest,
} from '../types/auth'

export const authService = {
  async register(payload: RegisterRequest): Promise<AuthResponse> {
    const data = await apiRequest<AuthResponse>('/api/v1/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    setSessionTokens(data.accessToken, data.refreshToken)
    return data
  },

  async login(payload: LoginRequest): Promise<AuthResponse> {
    const data = await apiRequest<AuthResponse>('/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    setSessionTokens(data.accessToken, data.refreshToken)
    return data
  },

  async logout(): Promise<void> {
    const refreshToken = getRefreshToken()

    if (!refreshToken) {
      clearSessionTokens()
      return
    }

    await apiRequest<void>('/api/v1/auth/logout', {
      method: 'POST',
      authenticated: true,
      body: JSON.stringify({ refreshToken }),
    })

    clearSessionTokens()
  },

  async getCurrentUser(): Promise<CurrentUserResponse> {
    return apiRequest<CurrentUserResponse>('/api/v1/auth/me', {
      method: 'GET',
      authenticated: true,
    })
  },

  async getHealth(): Promise<string> {
    return apiRequest<string>('/api/v1/auth/health', {
      method: 'GET',
    })
  },
}

