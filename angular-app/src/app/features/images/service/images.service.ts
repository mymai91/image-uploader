import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { ImageResponse, ListImagesResponse } from '../images.type'
import { BehaviorSubject, map, Observable, tap } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  private readonly API_URL = 'http://localhost:3000/images'

  constructor(private http: HttpClient) {}

  // State for active and inactive images
  private activeImagesSubject = new BehaviorSubject<ListImagesResponse>({
    items: [],
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  })

  private inactiveImagesSubject = new BehaviorSubject<ListImagesResponse>({
    items: [],
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  })

  activeImages$ = this.activeImagesSubject.asObservable()
  inactiveImages$ = this.inactiveImagesSubject.asObservable()

  // Fetch images and update the correct BehaviorSubject
  getListImages({
    isActive,
    page = 1,
    limit = 10,
  }: {
    isActive: boolean
    page?: number
    limit?: number
  }): Observable<ListImagesResponse> {
    const params: Record<string, string> = {
      isActive: isActive.toString(),
      page: page.toString(),
      limit: limit.toString(),
    }

    return this.http.get<ListImagesResponse>(this.API_URL, { params }).pipe(
      tap(response => {
        console.log('response', response)
        if (isActive) {
          this.activeImagesSubject.next(response)
        } else {
          this.inactiveImagesSubject.next(response)
        }
      }),
    )
  }

  uploadImage(file: File, description: string): Observable<ImageResponse> {
    const formData = new FormData()
    formData.append('image', file)
    formData.append('description', description)

    return this.http.post<ImageResponse>(this.API_URL, formData).pipe(
      map((response: ImageResponse) => {
        console.log('response', response)
        return response
      }),
    )
  }

  // Delete an image and update both lists
  deleteImage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`).pipe(
      tap(() => {
        const activeImages = this.activeImagesSubject.value
        const updatedActiveItems = activeImages.items.filter(
          img => img.id !== id,
        )

        const deletedImage = activeImages.items.find(img => img.id === id)
        const inactiveImages = this.inactiveImagesSubject.value

        this.activeImagesSubject.next({
          ...activeImages,
          items: updatedActiveItems,
        })

        if (deletedImage) {
          this.inactiveImagesSubject.next({
            ...inactiveImages,
            items: [deletedImage, ...inactiveImages.items],
          })
        }
      }),
    )
  }

  restoreImage(id: number): Observable<void> {
    return this.http.put<void>(`${this.API_URL}/${id}/restore`, {}).pipe(
      tap(() => {
        const inactiveImages = this.inactiveImagesSubject.value
        const restoredImage = inactiveImages.items.find(img => img.id === id)
        const updatedInactiveItems = inactiveImages.items.filter(
          img => img.id !== id,
        )

        this.inactiveImagesSubject.next({
          ...inactiveImages,
          items: updatedInactiveItems,
        })

        if (restoredImage) {
          const activeImages = this.activeImagesSubject.value
          this.activeImagesSubject.next({
            ...activeImages,
            items: [restoredImage, ...activeImages.items],
          })
        }
      }),
    )
  }
}
