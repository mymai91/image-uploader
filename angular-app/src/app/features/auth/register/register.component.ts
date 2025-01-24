import { Component } from '@angular/core'
import { TextComponent } from '../../../shared/components/input/text/text.component'
import { PasswordComponent } from '../../../shared/components/input/password/password.component'
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { AuthService } from '../service'
import { Router, RouterModule } from '@angular/router'
import { ErrorMessages } from '../login/login.type'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-register',
  imports: [
    TextComponent,
    PasswordComponent,
    FormsModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  errorMessages: ErrorMessages = {
    email: {
      required: 'Email is required',
      email: 'Please enter a valid email',
    },
    password: {
      required: 'Password is required',
      minlength: 'Password must be at least 6 characters',
    },
    username: {
      required: 'Username is required',
      minlength: 'Username must be at least 3 characters',
      maxlength: 'Username must be at most 20 characters',
    },
  }

  registerForm: FormGroup
  isLoading = false
  apiError = ''

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.registerForm = this.fb.group({
      email: ['my.mai@example.com', [Validators.required, Validators.email]],
      password: ['password123', [Validators.required, Validators.minLength(6)]],
      username: [
        'mymai',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
    })
  }

  getErrorMessage(controlName: string): string {
    const control = this.registerForm.get(controlName)
    if (control && control.errors && (control.dirty || control.touched)) {
      const errors = Object.keys(control.errors)
      return this.errorMessages[controlName][errors[0]]
    }

    return ''
  }

  onSubmit(): void {
    console.log('Register form submitted')
    this.isLoading = true

    const { email, password, username } = this.registerForm.value
    console.log('Registering user:', email, password, username)

    console.log('this.registerForm.invalid', this.registerForm.invalid)
    if (this.registerForm.invalid) {
      Object.keys(this.registerForm.controls).forEach(key => {
        const control = this.registerForm.get(key)
        if (control) {
          control.markAsTouched()
        }
      })
      return
    }

    this.authService.register({ email, password, username }).subscribe({
      next: () => {
        this.router.navigate(['login'])
      },
      error: err => {
        this.isLoading = false
        this.apiError = 'Failed to register'
      },
    })
  }
}
