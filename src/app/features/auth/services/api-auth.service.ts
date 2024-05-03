import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import type { Observable } from 'rxjs';

import type { AuthTokens, AuthUser, LoginRequest, RegisterUserRequest } from '../models'

import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiAuthService {

  private readonly _http = inject(HttpClient)

  private readonly BASE_API_URL = environment.baseApiUrl + '/auth'

  getUserByAccessToken(token: string) {
    return this._http.get<AuthUser>(`${this.BASE_API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  login(request: LoginRequest) {
    return this._http.post<AuthTokens>(`${this.BASE_API_URL}/login`, request)
  }

  logout(accessToken: string) {
    return this._http.post<null>(`${this.BASE_API_URL}/logout`, undefined, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  }

  registerUser(request: RegisterUserRequest) {
    return this._http.post<AuthTokens>(`${this.BASE_API_URL}/register`, request)
  }

  verifyAccessToken(accessToken: string): Observable<null> {
    return this._http.post<null>(`${this.BASE_API_URL}/verify`, undefined, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  }

  refreshAccessToken(refreshToken: string): Observable<AuthTokens> {
    return this._http.post<AuthTokens>(`${this.BASE_API_URL}/refresh`, undefined, {
      headers: {
        Authorization: `Bearer ${refreshToken}`
      }
    })
  }
}
