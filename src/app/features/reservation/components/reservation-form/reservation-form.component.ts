import { Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { Store } from '@ngrx/store';

import type { Observable } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

import { selectIsAuth } from '../../../auth/store/auth.selectors';

import type { TopicItem } from '../../../topic/models/TopicItem';
import type { GenerateReservationCheckout } from '../../models/GenerateReservationCheckoutRequest';
import type { ReservationFormData } from '../../models/ReservationFormData';

import { ApiEstablishmentService } from '../../../establishment/services/api-establishment.service';
import { ApiReservationService } from '../../../reservation/services/api-reservation.service';

import { TextFieldComponent } from '../../../../components/text-field/text-field.component';
import { SelectFieldComponent } from '../../../../components/select-field/select-field.component';
import { StripeCheckoutFormComponent } from '../stripe-checkout-form/stripe-checkout-form.component';

import { establishmentReservationGroupForm } from '../../forms';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TextFieldComponent,
    SelectFieldComponent,
    StripeCheckoutFormComponent
  ],
  templateUrl: './reservation-form.component.html',
})
export class ReservationFormComponent implements OnInit {

  @Input({ required: true }) establishmentId!: string
  @Input({ required: true }) establishmentPricePerHour!: number
  @Input() defaultValues: ReservationFormData | null = null

  private readonly _apiEstablishmentService = inject(ApiEstablishmentService)
  private readonly _apiReservationService = inject(ApiReservationService)
  private readonly _toast = inject(ToastrService)
  private readonly _store = inject(Store)
  private readonly _router = inject(Router)

  topics$!: Observable<TopicItem[]>

  isLoading = false
  isSubmitted = false
  isBlockForm = false
  checkoutClientSecret: string | null = null
  reservationData: ReservationFormData | null = null

  reservationForm = establishmentReservationGroupForm

  ngOnInit(): void {
    this.topics$ = this._apiEstablishmentService.getEstablishmentTopics(this.establishmentId)

    if (this.defaultValues !== null) {
      this.reservationForm.setValue({ ...this.defaultValues })
    }
  }

  onReservationSubmit() {
    this.isLoading = true
    this.isSubmitted = true

    if (this.reservationForm.invalid || this.isBlockForm) {
      this.isLoading = false
      return
    }

    this._store.select(selectIsAuth).subscribe({
      next: ({ isAuth }) => {
        if (!isAuth) {
          this._router.navigate(['/auth/login'])
          return
        }

        const reservationRequest = { ...this.reservationForm.value, establishmentId: this.establishmentId }

        this._apiReservationService.generateCheckout(reservationRequest as GenerateReservationCheckout).subscribe({
          next: ({ clientSecret }) => {
            this.checkoutClientSecret = clientSecret
            this.reservationData = {
              realizationDate: reservationRequest.realizationDate!,
              topicId: reservationRequest.topicId!,
              finishDate: reservationRequest.finishDate!
            }

            this.isLoading = false
            this.isSubmitted = false
            this.isBlockForm = true

            this.realizationDate.disable()
            this.finishDate.disable()
            this.topicId.disable()
          },
          error: err => {
            this._toast.error(err.error.message, 'Reservación de establecimiento')
            this.isLoading = false
            this.isSubmitted = false
          }
        })
      }
    })
  }

  calculateTotalHours(): number {
    if (
      !this.reservationForm.hasError('datetimeDifference') &&
      !this.reservationForm.hasError('datetimesEquals') &&
      this.realizationDate.valid &&
      this.finishDate.valid &&
      this.topicId.valid
    ) {
      const realizationDate = new Date(this.realizationDate.value!)
      const finishDate = new Date(this.finishDate.value!)

      return (finishDate.getTime() - realizationDate.getTime()) / (1000 * 60 * 60)
    }

    return 0
  }

  calculateTotalPrice(): number {
    if (
      !this.reservationForm.hasError('datetimeDifference') &&
      !this.reservationForm.hasError('datetimesEquals') &&
      this.realizationDate.valid &&
      this.finishDate.valid &&
      this.topicId.valid
    ) {
      const realizationDate = new Date(this.realizationDate.value!)
      const finishDate = new Date(this.finishDate.value!)

      const hours = (finishDate.getTime() - realizationDate.getTime()) / (1000 * 60 * 60)

      return hours * this.establishmentPricePerHour
    }

    return 0
  }

  get realizationDate() {
    return this.reservationForm.controls.realizationDate
  }

  get finishDate() {
    return this.reservationForm.controls.finishDate
  }

  get topicId() {
    return this.reservationForm.controls.topicId
  }
}

