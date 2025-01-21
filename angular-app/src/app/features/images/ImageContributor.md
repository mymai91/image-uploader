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
