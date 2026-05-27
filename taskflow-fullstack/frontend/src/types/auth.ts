export type UserResponse = {
  id: number
  firstName: string
  lastName: string
  email: string
  roles: string[]
  createdAt: string
}

export type AuthResponse = {
  accessToken: string
  refreshToken: string
  tokenType: string
  expiresIn: number
  user: UserResponse
}

export type CurrentUserResponse = {
  user: UserResponse
}

export type LoginRequest = {
  email: string
  password: string
}

export type RegisterRequest = {
  firstName: string
  lastName: string
  email: string
  password: string
}

export type LogoutRequest = {
  refreshToken: string
}

