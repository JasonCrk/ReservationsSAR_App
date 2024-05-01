import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environments/environment';

import { TopicItem } from '../models/TopicItem';

@Injectable({
  providedIn: 'root'
})
export class ApiTopicService {

  private readonly _http = inject(HttpClient)
  private readonly BASE_API_URL = `${environment.baseApiUrl}/topics`

  getAllTopics() {
    return this._http.get<TopicItem[]>(this.BASE_API_URL)
  }
}

