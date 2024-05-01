import { AbstractControl } from "@angular/forms";

export class DateValidators {

  static isPast(control: AbstractControl<string>) {
    if (control.value === '') return null

    return Date.parse(control.value) > Date.now()
      ? { isPast: true }
      : null
  }

  static notToday(control: AbstractControl<string>) {
    if (control.value === '') return null

    return Date.parse(control.value) === Date.now()
      ? { notToday: true }
      : null
  }

  static isFuture(control: AbstractControl<string>) {
    if (control.value === '') return null

    return Date.parse(control.value) < Date.now()
      ? { isFuture: true }
      : null
  }

  static onlyHours(control: AbstractControl<string>) {
    if (control.value === '') return null

    const date = new Date(control.value)

    const isValid =  date.getMinutes() === 0 && date.getSeconds() === 0 && date.getMilliseconds() === 0

    return !isValid
      ? { onlyHours: true }
      : null
  }
}
