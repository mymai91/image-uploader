import { CommonModule } from '@angular/common'
import { Component, forwardRef, Input } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

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

// when we use ControlValueAccessor
// need to implement 3 methods
// 1. writeValue:  Called by Angular to write a value to the input
// 2. registerOnChange:  Registers a callback function for value changes
// 3. registerOnTouched: Registers a callback function for touch events
export class TextComponent implements ControlValueAccessor {
  // @Input({ required: true }) name!: string;
  @Input() name?: string
  @Input() icon: string = 'mail_outline'
  @Input() type: string = 'text'
  @Input() label: string = ''
  @Input() placeholder: string = ''
  @Input() required: boolean = false
  @Input() inputClass: string = ''
  @Input() labelClass: string = ''
  @Input() errorMessage: string = ''

  value: string = ''
  disabled: boolean = false

  // Initial empty functions
  onChange = (value: any) => {} // Placeholder until form control registers
  onTouch = () => {} // Placeholder until form control registers

  writeValue(value: any): void {
    this.value = value
  }

  // Later, Angular calls these registration methods
  registerOnChange(fn: any): void {
    console.log('TextComponent registerOnChange') // Shows in terminal due to SSR
    this.onChange = fn // Replace placeholder with actual form control function
  }

  registerOnTouched(fn: any): void {
    console.log('TextComponent registerOnTouched') // Shows in terminal due to SSR
    this.onTouch = fn // Replace placeholder with actual form control function
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  handleInput(event: Event): void {
    const input = event.target as HTMLInputElement
    this.value = input.value
    this.onChange(this.value) // Without initial declaration, this could be undefined
    this.onTouch() // Without initial declaration, this could be undefined
    console.log('value', this.value)
  }
}
