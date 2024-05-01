import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environments/environment';

import type { EstablishmentItem } from '../models/EstablishmentItem';
import type { SearchAvailableEstablishmentsParams } from '../models/SearchAvailableEstablishmentsParams';

@Injectable({
  providedIn: 'root'
})
export class ApiEstablishmentService {

  private readonly _http = inject(HttpClient)

  private readonly BASE_API_URL = `${environment.baseApiUrl}/establishments`

  searchAvailable(params?: SearchAvailableEstablishmentsParams) {
    return this._http.get<EstablishmentItem[]>(this.BASE_API_URL + '/search/available', params !== undefined
      ? { params: { ...params } }
      : undefined
    )
  }
}
