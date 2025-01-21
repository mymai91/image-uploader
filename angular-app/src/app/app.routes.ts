import { Routes } from '@angular/router'
import { LoginComponent } from './features/auth/login/login.component'

import { ImageRoutes } from './features/images/images.routes'

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  ...ImageRoutes,
]
