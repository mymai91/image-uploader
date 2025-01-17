import { CommonModule } from '@angular/common'
import { Component, forwardRef, Input } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'

// Common event bindings:

// (input) - when value changes (typing)
// (click) - when element is clicked
// (change) - when value changes AND input loses focus
// (blur) - when input loses focus
// (focus) - when input gains focus

@Component({
  selector: 'global-input-text',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './text.component.html',
  styleUrl: './text.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextComponent),
      multi: true,
    },
  ],
})
export class TextComponent {
  // @Input({ required: true }) name!: string;
  @Input({ required: true }) name!: string
  @Input() icon: string = 'mail_outline'
  @Input() type: string = 'text'
  @Input() label: string = ''
  @Input() placeholder: string = ''
  @Input() required: boolean = false
  @Input() inputClass: string = ''
  @Input() labelClass: string = ''
  @Input() errorMessage: string = ''

  value: string = ''

  handleInput(event: Event): void {
    const input = event.target as HTMLInputElement
    this.value = input.value
    console.log('value', this.value)
  }
}
