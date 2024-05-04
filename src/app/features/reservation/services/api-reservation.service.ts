import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';

import { environment } from '../../../../environments/environment';

import { GenerateReservationCheckout } from '../models/GenerateReservationCheckoutRequest';
import { ConfirmReservationCheckout } from '../models/ConfirmReservationCheckoutRequest';

import { CTX_REQUIRE_AUTH } from '../../../interceptors/with-authentication-interceptor.interceptor';

@Injectable({
  providedIn: 'root'
})
export class ApiReservationService {

  private readonly _http = inject(HttpClient)
  private readonly BASE_API_URL = `${environment.baseApiUrl}/reservations`

  generateCheckout(request: GenerateReservationCheckout) {
    return this._http.post<{ clientSecret: string }>(`${this.BASE_API_URL}/checkout`, request, {
      context: new HttpContext().set(CTX_REQUIRE_AUTH, true)
    })
  }

  confirmCheckout(request: ConfirmReservationCheckout) {
    return this._http.post<{ message: string }>(`${this.BASE_API_URL}/checkout/confirm`, request, {
      context: new HttpContext().set(CTX_REQUIRE_AUTH, true)
    })
  }
}
