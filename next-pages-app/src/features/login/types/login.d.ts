interface User {
  id: number
  username: string
  email: string
}

export interface LoginDto {
  email: string
  password: string
}

export interface LoginResponse {
  data: {
    accessToken: string
    user: User
  }
  status: number
}
