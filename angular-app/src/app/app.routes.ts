import { Routes } from '@angular/router'
import { LoginComponent } from './features/auth/login/login.component'

import { ImageRoutes } from './features/images/images.routes'
import { WelcomeComponent } from './features/welcome/welcome.component'
import { AuthenticatedGuard } from './core/guards/authenticated.guard'

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthenticatedGuard],
  },
  ...ImageRoutes,
  {
    path: '',
    component: WelcomeComponent,
    pathMatch: 'full',
  },
  { path: '**', redirectTo: '/images' }, // Fallback for unknow routes
]
