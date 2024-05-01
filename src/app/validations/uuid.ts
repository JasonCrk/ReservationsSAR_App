import { AbstractControl } from "@angular/forms";

export class UUIDValidator {

  static isUUID(control: AbstractControl<string>) {
    if (control.value === '') return null
    return control.value.match(/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/)
      ? null
      : { isUUID: true }
  }
}
