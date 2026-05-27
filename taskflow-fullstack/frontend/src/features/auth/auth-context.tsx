import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { authService } from '../../services/auth-service'
import { clearSessionTokens, getAccessToken } from '../../lib/session'
import type {
  CurrentUserResponse,
  LoginRequest,
  RegisterRequest,
  UserResponse,
} from '../../types/auth'

type AuthContextValue = {
  user: UserResponse | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (payload: LoginRequest) => Promise<void>
  register: (payload: RegisterRequest) => Promise<void>
  logout: () => Promise<void>
  refreshCurrentUser: () => Promise<void>
  clearError: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<UserResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    async function bootstrapAuth() {
      if (!getAccessToken()) {
        if (active) {
          setUser(null)
          setIsLoading(false)
        }
        return
      }

      try {
        const currentUser = await authService.getCurrentUser()
        if (active) {
          setUser(currentUser.user)
        }
      } catch {
        clearSessionTokens()
        if (active) {
          setUser(null)
        }
      } finally {
        if (active) {
          setIsLoading(false)
        }
      }
    }

    void bootstrapAuth()

    return () => {
      active = false
    }
  }, [])

  async function refreshCurrentUser() {
    setIsLoading(true)
    setError(null)

    try {
      const currentUser: CurrentUserResponse = await authService.getCurrentUser()
      setUser(currentUser.user)
    } catch (caughtError) {
      clearSessionTokens()
      setUser(null)
      setError(caughtError instanceof Error ? caughtError.message : 'Unable to refresh session')
    } finally {
      setIsLoading(false)
    }
  }

  async function login(payload: LoginRequest) {
    setIsLoading(true)
    setError(null)

    try {
      const response = await authService.login(payload)
      setUser(response.user)
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Login failed')
      throw caughtError
    } finally {
      setIsLoading(false)
    }
  }

  async function register(payload: RegisterRequest) {
    setIsLoading(true)
    setError(null)

    try {
      const response = await authService.register(payload)
      setUser(response.user)
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Registration failed')
      throw caughtError
    } finally {
      setIsLoading(false)
    }
  }

  async function logout() {
    setIsLoading(true)
    setError(null)

    try {
      await authService.logout()
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Logout failed')
    } finally {
      clearSessionTokens()
      setUser(null)
      setIsLoading(false)
    }
  }

  function clearError() {
    setError(null)
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user && getAccessToken()),
      isLoading,
      error,
      login,
      register,
      logout,
      refreshCurrentUser,
      clearError,
    }),
    [user, isLoading, error],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

