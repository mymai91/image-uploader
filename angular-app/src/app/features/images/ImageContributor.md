# Grouped Routes

1. src/app/features/images/images.routes.ts

```
import { Routes } from '@angular/router'
import { ImagesComponent } from './list/images.component'
import { CreateNewImageComponent } from './new/new.component'

export const ImageRoutes: Routes = [
  {
    path: 'images',
    children: [
      {
        path: '',
        component: ImagesComponent,
      },
      {
        path: 'new',
        component: CreateNewImageComponent,
      },
    ],
  },
]
```

2. src/app/app.routes.ts

```
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

```

3. Resulting URL Mapping:

- `/login` → LoginComponent
- `/images` → ImagesComponent
- `/images/new` → CreateNewImageComponent

# Role based access control

1. src/app/core/guards/auth.guard.ts

```
import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router'
import { AuthService } from '@app/features/auth/service'

export interface RouteData {
  requiresAuth?: boolean
  roles?: string[]
}

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const data = route.data as RouteData // Explicitly cast data

    const requiresAuth = data.requiresAuth || false

    if (requiresAuth && !this.authService.isAuthenticated()) {
      this.router.navigate(['/login'])
      return false
    }

    return true
  }
}

```

2. At route config

```
import { Routes } from '@angular/router'
import { ImagesComponent } from './list/images.component'
import { CreateNewImageComponent } from './new/new.component'

export const ImageRoutes: Routes = [
  {
    path: 'images',
    children: [
      {
        path: '',
        component: ImagesComponent,
        data: { requiresAuth: true },
      },
      {
        path: 'new',
        component: CreateNewImageComponent,
        data: { requiresAuth: true },
      },
    ],
  },
]
```
