import { Routes } from '@angular/router'
import { ImagesComponent } from './list/images.component'
import { CreateNewImageComponent } from './new/new.component'
import { AuthGuard } from '@app/core/guards/auth.guard'
// Nested route: when redirect in component should
// 1. put under the html file is <router-outlet></router-outlet>
// 2. in component file  imports: [
//   CommonModule,
//   RouterModule, // Include RouterModule here
// ],

// Flatten route: if you DO NOT want add <router-outlet></router-outlet>  so use

// export const ImageRoutes: Routes = [
//   {
//     path: 'images',
//     component: ImagesComponent,
//     canActivate: [AuthGuard],
//     data: { requiresAuth: true },
//   },
//   {
//     path: 'images/new',
//     component: CreateNewImageComponent,
//     canActivate: [AuthGuard],
//     data: { requiresAuth: true },
//   },
// ];

export const ImageRoutes: Routes = [
  {
    path: 'images',
    canActivate: [AuthGuard],
    data: { requiresAuth: true },
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
