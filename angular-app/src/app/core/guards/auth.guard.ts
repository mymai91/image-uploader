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

    // const requiredRoles = route.data?.roles || []
    // if (requiredRoles.length && !this.authService.hasRole(requiredRoles)) {
    //   this.router.navigate(['/access-denied'])
    //   return false
    // }

    return true
  }
}

// export const routes: Routes = [
//   {
//     path: 'dashboard',
//     component: DashboardComponent,
//     data: { requiresAuth: true }, // Requires authentication
//   },
//   {
//     path: 'admin',
//     component: AdminComponent,
//     data: { requiresAuth: true, roles: ['admin'] }, // Requires authentication and admin role
//   },
// ]
