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
