import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { map } from 'rxjs';

import type { ReservationFormData } from '../../../reservation/models/ReservationFormData';

import { ApiEstablishmentService } from '../../services/api-establishment.service';

import { NavbarComponent } from '../../../../components/navbar/navbar.component';
import { ReservationFormComponent } from '../../../reservation/components/reservation-form/reservation-form.component';

@Component({
  selector: 'app-establishment-details-page',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    ReservationFormComponent
  ],
  templateUrl: './establishment-details-page.component.html',
  styles: `
    .establishment-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .establishment-image:nth-child(1) {
      grid-row: 1 / 3;
    }
  `
})
export class EstablishmentDetailsPageComponent {

  private readonly _activatedRoute = inject(ActivatedRoute)
  private readonly _apiEstablishmentService = inject(ApiEstablishmentService)

  establishment$ = this._apiEstablishmentService.getOne(this._activatedRoute.snapshot.params['establishmentId']).pipe(
      map(({ topics, ...res }) => {

        const topicsInLine = topics.reduce(
          (prev, current) => prev + ' - ' + current.name, '')
          .substring(3)

        return { ...res, topics: topicsInLine }
      })
    )
}
