import { Component, OnInit, forwardRef, Input, ViewChild, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';
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
  @Input() maxLen: number;
  @ViewChild('languageInput', { static: true }) input: ElementRef<HTMLInputElement>;
  onTouch: any = () => { };
  onChange: any = () => { };
  form: FormGroup;
  filteredLanguages: any;
  disabled = false;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      language: ['']
    })
    this.form.valueChanges.subscribe(form => {
      console.log('in', form)
      this.onChange(form.language)
    })
  }
  get languages() {
    return this.form.get('language');
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

  remove(lang: Language): void {
    const index = this.languages.value.findIndex((language: Language) => language.key === lang.key);
    if (index >= 0) {
      this.languages.value.splice(index, 1);
      this.changeInput('');
      this.onChange(this.languages.value);
      // this.disabled = false;
    }
  }

  changeInput(key) {
    this.filteredLanguages = this.filterFruit(key);
  }

  filterFruit(key) {
    if (key === '') {
      return this.languageOptions;
    } else {
      return this.languageOptions.filter(f => (f.value).toLowerCase().includes(key.toLowerCase()));
    }
  }
  onSelect(event) {
    const value = event.option.value;
    this.languages.setValue([...this.languages.value, value]);
    this.input.nativeElement.value = '';
    // if (this.fruits.value.length === this.maxLen) {
    //   this.disabled = true;
    // }
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  writeValue(val: string) {
    this.form.controls['language'].setValue(val);
  }
}
