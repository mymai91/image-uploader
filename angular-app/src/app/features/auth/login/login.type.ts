// .d.ts files are specifically for type declarations

export interface EmailErrors {
  required: string
  email: string
  customEmail: string
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
