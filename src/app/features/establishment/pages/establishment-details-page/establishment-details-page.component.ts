import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { map } from 'rxjs';

import { ApiEstablishmentService } from '../../services/api-establishment.service';

import { NavbarComponent } from '../../../../components/navbar/navbar.component';

@Component({
  selector: 'app-establishment-details-page',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
  ],
  templateUrl: './establishment-details-page.component.html'
})
export class EstablishmentDetailsPageComponent {

  private readonly _activatedRoute = inject(ActivatedRoute)
  private readonly _apiEstablishmentService = inject(ApiEstablishmentService)

  establishment$ = this._apiEstablishmentService.getOne(
    this._activatedRoute.snapshot.params['establishmentId']
  ).pipe(
    map(({ topics, ...res }) => {

      const topicsInLine = topics.reduce(
        (prev, current) => prev + ' - ' + current.name, '')
        .substring(3)

      return { ...res, topics: topicsInLine }
    })
  )
}
