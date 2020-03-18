import { Component, OnInit, forwardRef, Input, ViewChild, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormBuilder, FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';

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
  @Input() placeholder = 'Select Options';
  @Input() options: any[];
  @Input() maxLen: number;
  @Input() removable = true;
  @Input() displayWith = 'value';
  @Input() itemId = 'key'
  selected: [];
  @ViewChild('input', { static: true }) input: ElementRef<HTMLInputElement>;
  onTouch: any = () => { };
  onChange: any = () => { };
  form: FormGroup;
  filteredOptions: any;
  disabled = false;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      control: ['']
    })
    this.form.valueChanges.subscribe(form => {
      this.onChange(form.control)
    })
  }
  get control() {
    return this.form.get('control');
  }

  add(event: MatChipInputEvent): void {
    // const input = event.input;
    // const value = event.value;
    // console.log('event', event)

    // // Add our fruit
    // if ((value || '').trim()) {
    //   this.languages.setValue([...this.languages.value, value.trim()]);
    // }
    // // Reset the input value
    // if (input) {
    //   input.value = '';
    // }
  }

  remove(chip): void {
    const index = this.control.value.findIndex((ctr) => ctr[this.itemId] === chip[this.itemId]);
    if (index >= 0) {
      this.changeInput('');
      this.control.value.splice(index, 1);
      this.onChange(this.control.value);
      this.disabled = false;
    }
  }

  changeInput(key: string) {
    this.filteredOptions = this.filterOption(key);
  }

  filterOption(key: string) {
    if (key === '') {
      return this.options;
    } else {
      return this.options.filter(f => (f[this.displayWith]).toLowerCase().includes(key.toLowerCase()));
    }
  }
  onSelect(event) {
    const value = event.option.value;
    this.control.setValue([...this.control.value, value]);
    this.input.nativeElement.value = '';
    if (this.control.value.length === this.maxLen) {
      this.disabled = true;
    }
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  writeValue(val: string) {
    this.control.setValue(val);
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
}
