import { Routes } from '@angular/router'
import { LoginComponent } from './features/auth/login/login.component'

import { ImageRoutes } from './features/images/images.routes'
import { WelcomeComponent } from './features/welcome/welcome.component'

export const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  ...ImageRoutes,
]
