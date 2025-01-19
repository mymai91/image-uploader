# Summary

- Angular Material provides a modern UI.
- RxJS and BehaviorSubject manage the authentication state reactively.
- Reactive Forms handle form validation and submission.

# 1. Setting Up the Angular Project

1. Install Angular CLI and Create a New Project

```
   npm install -g @angular/cli
   ng new angular-app --routing --style=scss
   cd angular-app
```

2. Install Dependencies

```
yarn add @angular/material @angular/forms @angular/flex-layout rxjs
```

3. Set Up Angular Material

```
ng add @angular/material
```

Choose a theme (e.g., Indigo/Pink), enable global typography, and add animations when prompted.

4. Start the Application
   Start the development server:

```
ng serve
```

5. Access

`http://localhost:4200/`

# Compare Angular & React

The difference comes from Angular's and React's different philosophies (triet ly) and approaches:

## Angular:

Separates concerns into different files:

.ts - Component logic and TypeScript code
.html - Template markup
.scss/.css - Styles

## React:

Uses JSX which combines markup and logic in one file:
Everything is in .tsx (TypeScript) or .jsx (JavaScript)

# Code

1. create the auth feature structure:

```
src/
└── app/
    ├── features/
    │   └── auth/
    │       ├── components/
    │       │   ├── sign-in/
    │       │   │   ├── sign-in.component.ts
    │       │   │   ├── sign-in.component.html
    │       │   │   └── sign-in.component.scss

```

`ng generate component features/auth/login`

# Create the services folder inside auth feature

`ng generate service features/auth/services/auth`

`ng g guards core/guards`

`ng g interceptor core/interceptors/auth`

2. Set up auth.routes.ts:

```
import { Routes } from '@angular/router';

export default [
  {
    path: 'sign-in',
    loadComponent: () => import('./components/sign-in/sign-in.component')
      .then(c => c.SignInComponent)
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./components/sign-up/sign-up.component')
      .then(c => c.SignUpComponent)
  }
] as Routes;
```

# SSR server side rendering

```
// 1. Server render

// Using SSR with initial declarations
onChange = (value: any) => {}  // Empty function runs safely on server

// 2. Client hydration (Browser environment)
registerOnChange(fn: any): void {
  this.onChange = fn  // Real form control function gets registered
}

// 3. User interaction (Browser environment)
handleInput(event: Event): void {
  this.onChange(this.value)  // Now calls the actual form control function
}
```

# Binding in Angular

```
// In PasswordComponent:
@Input() placeholder: string = ''  // This is property #1 (class property)

<input [placeholder]="placeholder"/> // This is the HTML attribute
        ^           ^
        |           |
    HTML attribute  References the class property
```

1. The flow is:

Parent component sets the value:

```
<global-input-password placeholder="Enter password">
```

2. This value goes to the class property because of @Input():

```
@Input() placeholder: string = ''  // Receives "Enter password"
```

3. Then in the template, `[placeholder]="placeholder"` means:

Left side [placeholder]: HTML input attribute

Right side "placeholder": References your component's class property

So:

Right side placeholder GETS the value from your component class
Left side [placeholder] SETS it on the HTML input element

Think of it like this:

```
// 1. Login component says:
placeholder="Enter password"

// 2. PasswordComponent receives it in class:
@Input() placeholder = "Enter password"  // Value received from parent

// 3. Template uses that class value:
[placeholder]="placeholder"
// HTML attribute = component's property value
```

4. At parent call

The difference between [required]="true" and placeholder="Enter password" is about the type of value being passed:

```
<!-- With [] - passing a boolean/expression -->
[required]="true"    // Passing boolean true
[required]="false"   // Passing boolean false
[required]="isRequired"  // Passing a variable

<!-- Without [] - passing a string literal -->
placeholder="Enter password"  // Passing string literal
required="true"   // WRONG! This passes string "true", not boolean true
```

You only need [] when:

Passing booleans (true/false)
Passing numbers
Passing variables/expressions
Passing objects/arrays

You don't need [] when:

Passing string literals directly
Setting static text values

Example

```
// In Component
@Input() required: boolean = false
@Input() placeholder: string = ''

// In Template - Correct usage:
<input
  [required]="true"              // Passes boolean true
  placeholder="Enter password"   // Passes string literal
/>

// Wrong usage:
<input
  required="true"    // This passes string "true", not boolean true!
  [placeholder]="'Enter password'"  // Unnecessary [] for string literal
/>
```

5. @ViewChild

@ViewChild allows the parent component to access and call those functions directly.

Think of @ViewChild as a way to get a reference to the child component, like having a direct line of communication to it. The child component still has all its own functionality, but the parent can now interact with it programmatically rather than just through template bindings.

Here's an example:

```
// CaptchaComponent
@Component({
  selector: 'app-captcha'
})
export class CaptchaComponent {
  // Component has its own methods and logic
  verifyCaptcha() {
    // Captcha verification logic
    const isVerified = /* verification logic */;
    return isVerified;
  }

  resetCaptcha() {
    // Reset logic
  }
}

// LoginComponent (Parent)
@Component({
  selector: 'app-login',
  template: `
    <form>
      <app-captcha></app-captcha>
      <button (click)="onSubmit()">Submit</button>
    </form>
  `
})
export class LoginComponent {
  @ViewChild(CaptchaComponent) captchaComponent!: CaptchaComponent;

  onSubmit() {
    // Can directly call the child's methods
    const isVerified = this.captchaComponent.verifyCaptcha();
    if (isVerified) {
      // Process form submission
    }
  }

  resetForm() {
    // Can also call other methods
    this.captchaComponent.resetCaptcha();
  }
}
```

# Angular template syntax [] and ()

1. [] - Property Binding (Input)

[] sends data TO an element (square brackets "contain" the data)

2. () - Event Binding (Output)

() receives events FROM an element (parentheses "catch" the events)

3. [()] - Two-way Binding (Both)

Combines both property and event binding
Most commonly used with ngModel

```
<input
  [placeholder]="placeholderText"     <!-- Property binding -->
  (change)="handleChange($event)"     <!-- Event binding -->
  [(ngModel)]="inputValue"            <!-- Two-way binding -->
>

<button
  [disabled]="isLoading"              <!-- Property binding -->
  (click)="handleClick()"             <!-- Event binding -->
>
  Submit
</button>
```
