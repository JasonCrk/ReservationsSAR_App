import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';

import type { Observable } from 'rxjs';

import type { EstablishmentItem } from '../../features/establishment/models/EstablishmentItem';

import { ApiEstablishmentService } from '../../features/establishment/services/api-establishment.service';

import { EstablishmentItemComponent } from '../../features/establishment/components/ui/establishment-item/establishment-item.component';
import { SearchAvailableEstablishmentsFormComponent } from '../../features/establishment/components/search-available-establishments-form/search-available-establishments-form.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    EstablishmentItemComponent,
    SearchAvailableEstablishmentsFormComponent
  ],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {

  private readonly _apiEstablishmentService = inject(ApiEstablishmentService)
  private readonly _activatedRoute = inject(ActivatedRoute)

  availableEstablishments$!: Observable<EstablishmentItem[]>

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe({
      next: params => {
        const realizationDate = params['realization'] ?? ''
        const finishDate = params['finish'] ?? ''

        if (realizationDate === '' || finishDate === '') {
          this.availableEstablishments$ = this._apiEstablishmentService.searchAvailable()
          return
        }

        const topicId = params['topic'] ?? ''

        this.availableEstablishments$ = this._apiEstablishmentService.searchAvailable({
          finish: finishDate,
          realization: realizationDate,
          ...(topicId !== ''
            ? { t: topicId }
            : null)
        })
      }
    })
  }
}
