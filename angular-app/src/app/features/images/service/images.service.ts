import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { ImageResponse, ListImagesResponse } from '../images.type'
import { map, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  private readonly API_URL = 'http://localhost:3000/images'

  constructor(private http: HttpClient) {}

  getListImages(): Observable<ImageResponse[]> {
    return this.http.get<ListImagesResponse>(this.API_URL).pipe(
      map((response: ListImagesResponse) => {
        console.log('response', response)
        return response.items
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

  deleteImage(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.API_URL}/${id}`)
      .pipe(map(() => console.log(`image ${id} has been deleted`)))
  }
}
