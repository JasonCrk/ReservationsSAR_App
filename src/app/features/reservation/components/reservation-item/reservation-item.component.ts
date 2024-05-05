import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationItem } from '../../models/ReservationItem';

@Component({
  selector: 'app-reservation-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservation-item.component.html',
})
export class ReservationItemComponent {

  private readonly status: { [key: string]: string } = {
    'PENDING': 'En espera'
  }

  @Input({ required: true }) reservation!: ReservationItem

  get reservationStatus() {
    return this.status[this.reservation.status]
  }
}
