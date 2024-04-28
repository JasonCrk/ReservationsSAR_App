import { Component, Input } from '@angular/core';

import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-field',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="flex gap-1 flex-col">
      @if (label !== null) {<label class="font-medium">{{ label }}</label>}
      <input
        [type]="type || 'text'"
        [formControl]="control"
        [placeholder]="placeholder || ''"
        class="px-3 py-2 rounded bg-gray-200 outline-none focus:outline focus:outline-gray-400 placeholder:text-gray-600 {{ class }}"
      />
    </div>
  `,
})
export class TextFieldComponent {

  @Input({ required: true }) control!: FormControl
  @Input() type!: string
  @Input() label!: string
  @Input() class!: string
  @Input() placeholder!: string

}
