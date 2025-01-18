// .d.ts files are specifically for type declarations

export interface EmailErrors {
  required: string
  email: string
}

export interface PasswordErrors {
  required: string
  minlength: string
}

export interface ErrorType {
  [key: string]: string
}

export interface ErrorMessages {
  [key: string]: ErrorType
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  user: {
    id: string
    email: string
    name: string
  }
}
