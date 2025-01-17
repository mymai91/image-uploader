import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { RouterModule } from '@angular/router'
import { TextComponent } from '../../../shared/components/input/text/text.component'
import { ErrorMessages } from './login.type'
import { PasswordComponent } from '@app/shared/components/input/password/password.component'

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
      customEmail: 'Your custom email error',
    },
    password: {
      required: 'Password is required',
      minlength: 'Password must be at least 6 characters',
    },
  }

  loginForm: FormGroup

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  getErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName)
    console.log('getErrorMessage', control)
    if (control && control.errors && (control.dirty || control.touched)) {
      const errors = Object.keys(control.errors)

      return this.errorMessages[controlName][errors[0]] || 'Invalid field'
    }

    return ''
  }
}
