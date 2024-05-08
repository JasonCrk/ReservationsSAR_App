import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
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
export class EstablishmentDetailsPageComponent implements OnInit {

  private readonly routeSnapshot = inject(ActivatedRoute).snapshot
  private readonly _apiEstablishmentService = inject(ApiEstablishmentService)

  defaultValueReservationForm: ReservationFormData | null = null

  establishment$ = this._apiEstablishmentService.getOne(this.routeSnapshot.params['establishmentId']).pipe(
      map(({ topics, ...res }) => {

        const topicsInLine = topics.reduce(
          (prev, current) => prev + ' - ' + current.name, '')
          .substring(3)

        return { ...res, topics: topicsInLine }
      })
    )

  ngOnInit(): void {
    const realizationDate = this.routeSnapshot.queryParams['realization'] ?? ''
    const finishDate = this.routeSnapshot.queryParams['finish'] ?? ''

    if (!realizationDate || !finishDate) return

    const topicId = this.routeSnapshot.queryParams['topic'] ?? ''

    this.defaultValueReservationForm = {
      finishDate,
      realizationDate,
      topicId
    }
  }
}
