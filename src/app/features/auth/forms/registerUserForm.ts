import { FormControl, FormGroup, Validators } from "@angular/forms";

import { DateValidators } from "../../../validations";

export const registerUserForm = new FormGroup({
  firstName: new FormControl('', [
    Validators.required,
    Validators.maxLength(60)
  ]),
  lastName: new FormControl('', [
    Validators.required,
    Validators.maxLength(50)
  ]),
  birthdate: new FormControl(new Date(), [
    Validators.required,
    DateValidators.isPast,
    DateValidators.notToday
  ]),
  phoneNumber: new FormControl('', [
    Validators.required,
    Validators.pattern(/^[1-9]\d{8}$/)
  ]),
  email: new FormControl('', [
    Validators.required,
    Validators.email,
    Validators.maxLength(255)
  ]),
  password: new FormControl('', [
    Validators.required,
    Validators.maxLength(255)
  ])
})
