import { Routes } from '@angular/router'
import { LoginComponent } from './features/auth/login/login.component'
import { ImageComponent } from './features/image/image.component'

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'images',
    component: ImageComponent,
  },
]
