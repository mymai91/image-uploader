import { CommonModule } from '@angular/common'
import { Component, forwardRef, Input } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

@Component({
  selector: 'global-input-password',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './password.component.html',
  styleUrl: './password.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordComponent),
      multi: true,
    },
  ],
})
export class PasswordComponent implements ControlValueAccessor {
  @Input() name?: string
  @Input() icon: string = 'lock'
  @Input() type: string = 'password'
  @Input() label: string = ''
  @Input() placeholder: string = ''
  @Input() required: boolean = true
  @Input() inputClass: string = ''
  @Input() labelClass: string = ''
  @Input() passwordErrorMessage: string = ''

  value: string = ''
  disabled: boolean = false

  // Initial empty functions
  onChange = (value: string) => {} // Placeholder until form control registers
  onTouch = () => {}

  writeValue(value: string): void {
    this.value = value
  }

  registerOnChange(fn: any): void {
    console.log('registerOnChange')
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  handlePasswordInput(event: Event): void {
    const input = event.target as HTMLInputElement
    this.value = input.value
    this.onChange(this.value)
    this.onTouch()
  }
}
