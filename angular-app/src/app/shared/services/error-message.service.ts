import { AbstractControl } from '@angular/forms'

export class ErrorMessageService {
  private errorMessages = {
    required: (field: string) => `${field} is required`,
    email: () => 'Invalide email',
    minlength: (field: string, config: any) => {
      return `${field} must be at least ${config.requiredLength} characters`
    },
    pattern: (field: string) => `Invalid ${field} format`,
    serverError: (error: string) => error,
  }

  getErrorMessage(control: AbstractControl, fieldName: string): string {
    if (!control || !control.errors) {
      return ''
    }

    const firstError = Object.keys(control.errors)[0]

    const getError = this.errorMessages[firstError]

    return getError(fieldName, control.errors[firstError])
  }
}
