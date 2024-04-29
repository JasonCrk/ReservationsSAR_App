import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { AuthTokens, LoginRequest, RegisterUserRequest } from '../models'

import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiAuthService {

  private readonly _http = inject(HttpClient)

  private readonly BASE_API_URL = environment.baseApiUrl + '/auth'

  login(request: LoginRequest) {
    return this._http.post<AuthTokens>(`${this.BASE_API_URL}/login`, request)
  }

  registerUser(request: RegisterUserRequest) {
    return this._http.post<AuthTokens>(`${this.BASE_API_URL}/register`, request)
  }
}
