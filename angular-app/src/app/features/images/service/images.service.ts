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
}
