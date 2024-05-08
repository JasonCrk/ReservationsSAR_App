import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Stripe, StripeElements, loadStripe } from '@stripe/stripe-js';

import type { ReservationFormData } from '../../models/ReservationFormData';

import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-stripe-checkout-form',
  standalone: true,
  imports: [],
  templateUrl: './stripe-checkout-form.component.html',
})
export class StripeCheckoutFormComponent {

  @Input({ required: true }) clientSecret!: string
  @Input({ required: true }) reservationData!: ReservationFormData
  @Input({ required: true }) establishmentId!: string

  stripe!: Stripe | null
  stripeElements!: StripeElements | undefined
  paymentForm!: FormGroup

  isLoading = false

  ngOnInit(): void {
    this.onInitStripe()
  }

  async onInitStripe() {
    this.stripe = await loadStripe(environment.stripePublishableKey)

    this.stripeElements = this.stripe?.elements({
      appearance: { theme: 'stripe' },
      clientSecret: this.clientSecret!,
      locale: 'auto',
    })

    const paymentElement = this.stripeElements?.create('payment', { layout: 'tabs' })
    paymentElement?.mount('#payment-element')

    document.getElementById('payment-form')!.addEventListener("submit", async e => {
      e.preventDefault()
      if (this.isLoading) return

      this.isLoading = true

      const { error } = await this.stripe!.confirmPayment({
        elements: this.stripeElements!,
        confirmParams: {
          return_url: `http://localhost:4200/reservation/checkout?realization=${this.reservationData.realizationDate}&finish=${this.reservationData.finishDate}&topic=${this.reservationData.topicId}&establishment=${this.establishmentId}`,
        }
      })

      this.isLoading = false

      if (error.type === 'card_error' || error.type === 'validation_error') {
          let $erroMessage = document.querySelector("#payment-message")!;

          $erroMessage.classList.remove("hidden");
          $erroMessage.textContent = error.message!;

          setTimeout(function () {
            $erroMessage.classList.add("hidden");
            $erroMessage.textContent = "";
          }, 4000);
      }
    })
  }
}
