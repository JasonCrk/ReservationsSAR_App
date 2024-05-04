import { FormGroup, FormControl, Validators } from '@angular/forms'

import { DateValidators, UUIDValidator } from "../../../validations";

export const establishmentReservationGroupForm = new FormGroup({
  realizationDate: new FormControl<string>('', [
    Validators.required,
    DateValidators.isFuture,
    DateValidators.notToday,
    DateValidators.onlyHours
  ]),
  finishDate: new FormControl<string>('', [
    Validators.required,
    DateValidators.isFuture,
    DateValidators.notToday,
    DateValidators.onlyHours
  ]),
  topicId: new FormControl<string>('', [
    UUIDValidator.isUUID,
    Validators.required
  ]),
}, {
  validators: control => {
    const realizationDate = Date.parse(control.get('realizationDate')?.value)
    const finishDate = Date.parse(control.get('finishDate')?.value)

    if (realizationDate === finishDate) return { datetimesEquals: true }

    return realizationDate > finishDate
      ? { datetimeDifference: true }
      : null
  }
})
