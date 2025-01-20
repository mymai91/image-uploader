import { Routes } from '@angular/router'
import { ImagesComponent } from './list/images.component'

export const ImageRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ImagesComponent,
      },
      {
        path: 'new',
        component: ImagesComponent,
      },
    ],
  },
]
