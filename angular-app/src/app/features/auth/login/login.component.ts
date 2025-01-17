import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms'
import { RouterModule } from '@angular/router'
import { TextComponent } from '../../../shared/components/input/text/text.component'

@Component({
  selector: 'app-login',
  imports: [
    CommonModule, //The CommonModule provides structural directives such as *ngIf, *ngFor, *ngSwitch, and others.
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TextComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {}
