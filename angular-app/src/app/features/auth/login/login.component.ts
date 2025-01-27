import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { TextComponent } from '@app/shared/components/input/text/text.component'
import { ErrorMessages, LoginRequest } from './login.type'
import { PasswordComponent } from '@app/shared/components/input/password/password.component'
import { AuthService } from '../service'

@Component({
  selector: 'app-login',
  imports: [
    CommonModule, //The CommonModule provides structural directives such as *ngIf, *ngFor, *ngSwitch, and others.
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TextComponent,
    PasswordComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  errorMessages: ErrorMessages = {
    email: {
      required: 'Email is required',
      email: 'Please enter a valid email',
    },
    password: {
      required: 'Password is required',
      minlength: 'Password must be at least 6 characters',
    },
  }

  loginForm: FormGroup
  isLoading = false
  apiError = ''

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute, // check router params
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })

    this.route.queryParams.subscribe(params => {
      if (params['guest']) {
        this.prefillGuestAccount()
      }
    })
  }

  getErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName)
    if (control && control.errors && (control.dirty || control.touched)) {
      const errors = Object.keys(control.errors)

      return this.errorMessages[controlName][errors[0]] || 'Invalid field'
    }

    return ''
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      Object.keys(this.loginForm.controls).forEach(key => {
        const control = this.loginForm.get(key)
        if (control) {
          control.markAsTouched()
        }
      })
      return
    }

    this.isLoading = true
    const loginData: LoginRequest = this.loginForm.value

    this.authService.signin(loginData).subscribe({
      next: _response => {
        this.router.navigate(['/images'])
      },
      error: err => {
        this.isLoading = false
        this.apiError = 'Login failed. Please check your credentials.'
        console.error('Error:', err)
      },
    })
  }

  private prefillGuestAccount(): void {
    this.loginForm.patchValue({
      email: 'john@example.com',
      password: 'password123',
    })
  }
}
