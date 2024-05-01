import { Component, Input } from '@angular/core';

import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-field',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="flex flex-col {{ containerClass }}">
      @if (label !== null) {<label class="font-medium mb-1 {{ labelClass }}">{{ label }}</label>}
      <input
        [type]="type || 'text'"
        [min]="minAndMax !== null ? minAndMax.min : undefined"
        [max]="minAndMax !== null ? minAndMax.max : undefined"
        [formControl]="control"
        [placeholder]="placeholder || ''"
        class="px-3 py-2 rounded {{ error ? 'outline outline-red-600' : 'outline-none focus:outline focus:outline-gray-400' }} placeholder:text-gray-600 {{ inputClass }}"
      />
    </div>
  `,
})
export class TextFieldComponent {

  @Input({ required: true }) control!: FormControl
  @Input() error: boolean = false
  @Input() type!: string
  @Input() label: string | null = null
  @Input() minAndMax: { min: string, max: string } | null = null
  @Input() inputClass!: string
  @Input() labelClass!: string
  @Input() containerClass!: string
  @Input() placeholder!: string

}
