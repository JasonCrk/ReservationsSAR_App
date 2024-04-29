import { AbstractControl } from "@angular/forms";

export class DateValidators {

  static isPast(control: AbstractControl<string>) {
    return new Date(control.value).getDate() > new Date().getDate()
      ? { isPast: true }
      : null
  }

  static notToday(control: AbstractControl<string>){
    return new Date(control.value).getDate() === new Date().getDate()
      ? { notToday: true }
      : null
  }

  static isFuture(control: AbstractControl<string>){
    return new Date(control.value).getDate() < new Date().getDate()
      ? { isFuture: true }
      : null
  }
}
