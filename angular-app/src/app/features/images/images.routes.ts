import { Routes } from '@angular/router'
import { ImagesComponent } from './list/images.component'
import { CreateNewImageComponent } from './new/new.component'
import { AuthGuard } from '@app/core/guards/auth.guard'

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
