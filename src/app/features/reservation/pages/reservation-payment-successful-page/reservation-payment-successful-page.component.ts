import { Component, OnInit, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { ApiReservationService } from '../../services/api-reservation.service';

@Component({
  selector: 'app-reservation-payment-successful-page',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './reservation-payment-successful-page.component.html',
})
export class ReservationPaymentSuccessfulPageComponent implements OnInit {

  private readonly _activatedRoute = inject(ActivatedRoute)
  private readonly _router = inject(Router)
  private readonly _apiReservationService = inject(ApiReservationService)

  isLoading: boolean = true
  message = ''

  ngOnInit(): void {
    const queryParams = this._activatedRoute.snapshot.queryParams

    const paymentIntentId = queryParams['payment_intent'] ?? ''
    const paymentIntentClientSecret = queryParams['payment_intent_client_secret'] ?? ''
    const redirectStatus = queryParams['redirect_status'] ?? ''

    const realizationDate = queryParams['realization'] ?? ''
    const finishDate = queryParams['finish'] ?? ''
    const topicId = queryParams['topic'] ?? ''
    const establishmentId = queryParams['establishment'] ?? ''

    if (
      !paymentIntentId ||
      !paymentIntentClientSecret ||
      !redirectStatus ||
      !realizationDate ||
      !finishDate ||
      !topicId ||
      !establishmentId
    ) {
      this._router.navigate(['/'])
      return
    }

    this._apiReservationService.confirmCheckout({
      realizationDate,
      finishDate,
      topicId,
      paymentId: paymentIntentId,
      establishmentId
    }).subscribe({
      next: ({ message }) => {
        this.message = message
        this.isLoading = false
      }
    })
  }
}

