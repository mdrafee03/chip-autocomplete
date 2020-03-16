import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormBuilder, FormGroup } from '@angular/forms';
export interface Language {
  key: string;
  value: string
}
@Component({
  selector: 'app-chip-field',
  templateUrl: './chip-field.component.html',
  styleUrls: ['./chip-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipFieldComponent),
      multi: true
    }
  ]
})
export class ChipFieldComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder = 'Select Language';
  @Input() languageOptions: Language[];
  onChanged: (val: string) => void;
  onTouch: () => void;
  form: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      language: ['']
    })
    this.form.valueChanges.subscribe(form => {
      console.log('form value changes...', form);
      // this.onChanged(form.value)
    })
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  writeValue(val: string) {
    console.log('initial value', val);
    this.form.controls['language'].setValue(val);
  }
}
