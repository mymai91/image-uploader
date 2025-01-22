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

# Service - update state between service & view (a bit same as Redux)

### Key Benefits of This Approach

- Reactive State Updates:

  When the BehaviorSubject state changes (e.g., after deletion), all subscribed components are notified and updated automatically.

- Centralized State Management:

  The ImagesService acts as a single source of truth for the state, making it easier to debug and maintain.

- Scalable:

  Works well for small to medium applications. If the app grows, you can transition to NgRx for more structured state management.

### Steps to Implement RxJS with BehaviorSubject

1. Service to Manage State
   We'll use a service to:

- Fetch the initial list of images.
- Manage the state of images with a BehaviorSubject.
- Update the state when an image is deleted.

Implementation:

```
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ImageResponse, ListImagesResponse } from '../images.type';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  private readonly API_URL = 'http://localhost:3000/images';

  // BehaviorSubject to manage state
  private imagesSubject = new BehaviorSubject<ImageResponse[]>([]);

  // Expose the state as an observable
  images$ = this.imagesSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Fetch images from the API and update the state
  fetchImages(): Observable<ImageResponse[]> {
    return this.http.get<ListImagesResponse>(this.API_URL).pipe(
      tap((response) => {
        this.imagesSubject.next(response.items); // Update the BehaviorSubject with fetched data
      })
    );
  }

  // Delete an image and update the state
  deleteImage(id: number): Observable<void> {
    const url = `${this.API_URL}/${id}`;
    return this.http.delete<void>(url).pipe(
      tap(() => {
        const updatedImages = this.imagesSubject.value.filter((img) => img.id !== id);
        this.imagesSubject.next(updatedImages); // Update the state after deletion
      })
    );
  }
}
```

2. Component to Consume the Service
   The component will:

- Subscribe to the images$ observable for automatic updates.
- Trigger actions like fetching and deleting images via the service.

Implementation:

```
import { Component, OnInit } from '@angular/core';
import { ImagesService } from '../service/images.service';
import { ImageResponse } from '../images.type';

@Component({
  selector: 'app-image-list',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
})
export class ImagesComponent implements OnInit {
  images: ImageResponse[] = []; // Local copy of images for display
  isLoading = false;
  error = '';

  constructor(private imagesService: ImagesService) {}

  ngOnInit() {
    this.loadImages();

    // Subscribe to the observable for real-time updates
    this.imagesService.images$.subscribe({
      next: (images) => {
        this.images = images; // Update the local copy
      },
      error: (err) => {
        console.error('Error loading images:', err);
        this.error = 'Failed to load images.';
      },
    });
  }

  // Fetch images from the API
  loadImages() {
    this.isLoading = true;
    this.imagesService.fetchImages().subscribe({
      complete: () => {
        this.isLoading = false;
      },
      error: () => {
        this.error = 'Failed to load images.';
        this.isLoading = false;
      },
    });
  }

  // Delete an image
  deleteImage(id: number) {
    if (confirm('Are you sure you want to delete this image?')) {
      this.isLoading = true;
      this.imagesService.deleteImage(id).subscribe({
        complete: () => {
          this.isLoading = false; // Automatically updates the view via BehaviorSubject
        },
        error: () => {
          this.error = 'Failed to delete the image.';
          this.isLoading = false;
        },
      });
    }
  }
}
```

3. Template for Display
   The template will:

- Display the images dynamically.
- Show a loading spinner and error message.
- Include a button to delete images.

```
<div *ngIf="isLoading" class="flex">
  <span class="loading loading-spinner loading-lg"></span>
</div>

<div class="container mx-auto p-4">
  <div class="flex justify-between items-center">
    <h1 class="text-2xl font-bold">Images</h1>
    <a routerLink="/images/new" class="btn btn-primary">Add Image</a>
  </div>

  <div *ngIf="error" class="alert alert-error mt-4">{{ error }}</div>

  <div>
    <div
      *ngFor="let image of images"
      class="bg-white shadow-md rounded-lg p-4 mt-4 flex items-center"
    >
      <img [src]="image.filename" [alt]="image.description" class="w-32 h-32 object-cover mr-4 rounded" />
      <p class="flex-grow">{{ image.description }}</p>
      <button
        (click)="deleteImage(image.id)"
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Delete
      </button>
    </div>
  </div>
</div>
```
