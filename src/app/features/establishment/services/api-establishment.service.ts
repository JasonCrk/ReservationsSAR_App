import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environments/environment';

import type { EstablishmentItem } from '../models/EstablishmentItem';
import type { EstablishmentDetails } from '../models/EstablishmentDetails';
import type { SearchAvailableEstablishmentsParams } from '../models/SearchAvailableEstablishmentsParams';

@Injectable({
  providedIn: 'root'
})
export class ApiEstablishmentService {

  private readonly _http = inject(HttpClient)

  private readonly BASE_API_URL = `${environment.baseApiUrl}/establishments`

  getOne(establishmentId: string) {
    return this._http.get<EstablishmentDetails>(`${this.BASE_API_URL}/${establishmentId}`)
  }

  searchAvailable(params?: SearchAvailableEstablishmentsParams) {
    return this._http.get<EstablishmentItem[]>(this.BASE_API_URL + '/search/available', params !== undefined
      ? { params: { ...params } }
      : undefined
    )
  }
}
