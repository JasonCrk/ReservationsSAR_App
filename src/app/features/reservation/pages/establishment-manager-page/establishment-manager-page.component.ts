import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiReservationService } from '../../services/api-reservation.service';

import { NavbarComponent } from '../../../../components/navbar/navbar.component';
import { ReservationItemComponent } from '../../components/reservation-item/reservation-item.component';

@Component({
  selector: 'app-establishment-manager-page',
  standalone: true,
  imports: [
    NavbarComponent,
    CommonModule,
    ReservationItemComponent
  ],
  templateUrl: './establishment-manager-page.component.html',
})
export class EstablishmentManagerPageComponent {

  private readonly _apiReservationService = inject(ApiReservationService)

  reservations$ = this._apiReservationService.getAllReservations()
}
