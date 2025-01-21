interface User {
  id: number
  username: string
  email: string
}
export interface LoginResponse {
  data: {
    accessToken: string
    user: User
  }
  status: number
}

export interface LoginRequest {
  email: string
  password: string
}
