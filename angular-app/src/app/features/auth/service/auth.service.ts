import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { LoginRequest, LoginResponse } from '../login/login.type'
import { Observable } from 'rxjs'
import { environment } from '@env/environment'

@Injectable({
  providedIn: 'root',
})
/*
When you've added withInterceptors([authInterceptor]) to your app.config.ts, you still need to include withCredentials: true in your HTTP requests if you're:
Working with cookies
Making cross-origin requests (when your frontend and backend are on different domains/ports)
*/
export class AuthService {
  // TODO - implement enviroment.apiUrl
  private readonly API_URL = `${environment.apiUrl}/auth`

  constructor(private http: HttpClient) {}

  signin(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/login`, data, {
      withCredentials: true,
    })
  }

  signout() {
    return this.http.post(
      `${this.API_URL}/logout`,
      {},
      { withCredentials: true },
    )
  }
}
