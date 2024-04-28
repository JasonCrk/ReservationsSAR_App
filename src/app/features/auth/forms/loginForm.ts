import { FormControl, FormGroup, Validators } from "@angular/forms";

export const loginForm = new FormGroup({
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
