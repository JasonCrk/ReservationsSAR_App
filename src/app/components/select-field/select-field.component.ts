import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-select-field',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './select-field.component.html',
})
export class SelectFieldComponent {

  @Input({ required: true }) control!: FormControl
  @Input({ required: true }) options$!: Observable<Array<{ id: string, name: string }>>

  @Input() label: string | null = null
  @Input() selectClass!: string
  @Input() labelClass!: string
  @Input() containerClass!: string
  @Input() placeholder!: string
  @Input() error: boolean = false

}
