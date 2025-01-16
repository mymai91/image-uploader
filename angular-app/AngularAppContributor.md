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
