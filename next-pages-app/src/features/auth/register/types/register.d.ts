// interface User {
//   id: number
//   username: string
//   email: string
// }

export interface RegisterDto {
  username: string
  email: string
  password: string
}

export interface RegisterResponse {
  id: string
  username: string
  email: string
}
