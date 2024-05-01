import { FormControl, FormGroup, Validators } from "@angular/forms";

import { DateValidators, UUIDValidator } from "../../../validations";

export const searchAvailableEstablishmentsFormGroup = new FormGroup({
  realizationDate: new FormControl('', [
    Validators.required,
    DateValidators.isFuture,
    DateValidators.notToday,
    DateValidators.onlyHours
  ]),
  finishDate: new FormControl('', [
    Validators.required,
    DateValidators.isFuture,
    DateValidators.notToday,
    DateValidators.onlyHours
  ]),
  topicId: new FormControl('', [
    UUIDValidator.isUUID
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
