import { Component, OnInit, forwardRef, Input, ViewChild, ElementRef, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormBuilder, FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { Observable, Subject, timer } from 'rxjs';
import { distinctUntilChanged, debounce } from 'rxjs/operators';

@Component({
  selector: 'chip-autocomplete',
  templateUrl: './chip-autocomplete.component.html',
  styleUrls: ['./chip-autocomplete.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipAutocompleteComponent),
      multi: true
    }
  ]
})
export class ChipAutocompleteComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder = 'Select';
  @Input() clientSideFilter = true;
  @Input() options: any[];
  @Input() maxItems = null;
  @Input() removable = true;
  @Input() required = true;
  @Input() isOptionString = true;
  @Input() displayWith = 'value';
  @Input() itemId = 'key';
  @Input() disabledSelected = true;
  @Input() filteredOptions$: Observable<any>;
  @Input() debounceTime = 500;
  @Input() isChipAddFromInput = false;
  @Input() isOptionCheckable = false;
  @Output() changeSearchkey = new EventEmitter<string>();
  @ViewChild('input', { static: false }) input: ElementRef<HTMLInputElement>;
  @ViewChild(MatAutocomplete, { static: true }) matAutocomplete: MatAutocomplete;

  separatorKeysCodes: number[] = [13, 9]
  onTouch: any = () => { };
  onChange: any = () => { };
  form: FormGroup;
  filteredOptions: any;
  disabled = false;
  debounceHelper = new Subject();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.changeInput('');
    this.form = this.fb.group({
      control: [''],
    })
    this.form.valueChanges.subscribe(form => {
      setTimeout(() => this.onChange(form.control), 0);
    })
    this.debounceHelper.pipe(
      debounce(() => timer(this.debounceTime)),
      distinctUntilChanged()
    ).subscribe((res: string) => this.changeSearchkey.emit(res));
    if (this.clientSideFilter) {
      if (this.options.some(option => typeof(option) === 'string')) {
        this.isOptionString = true;
      } else {
        this.isOptionString = false;
      }
    }
  }
  get control() {
    return this.form.get('control');
  }

  add(event: MatChipInputEvent): void {
    if (this.isChipAddFromInput && !this.matAutocomplete.showPanel) {
      const input = event.input;
      const value = event.value;
      if (this.isOptionString) {
        if ((value || '').trim()) {
          this.control.setValue([...this.control.value || [], value.trim()]);
        }
      } else {
        const obj = {};
        obj[this.itemId] = value;
        obj[this.displayWith] = value;
        this.control.setValue([...this.control.value || [], obj]);
      }
      // Reset the input value
      if (input) {
        input.value = '';
      }
    }
  }

  remove(chip): void {
    const index = this.control.value.findIndex((ctr) =>
      this.isOptionString ? ctr === chip : ctr[this.itemId] === chip[this.itemId]);
    if (index >= 0) {
      this.changeInput();
      this.control.value.splice(index, 1);
      if (this.control.value.length === 0) {
        this.control.setValue(null);
      } else {
        this.control.updateValueAndValidity();
      }
      this.disabled = false;
    }
  }

  changeInput(key: string = '') {
    this.clientSideFilter ? this.filteredOptions = this.filterOption(key) : this.debounceHelper.next(key);
  }

  filterOption(key: string) {
    return (key === '') ? this.options : this.options.filter(f =>
      this.isOptionString ? f.toLowerCase().includes(key.toLowerCase()) :
        (f[this.displayWith]).toLowerCase().includes(key.toLowerCase()));
  }

  onSelect(value) {
    this.control.setValue([...this.control.value || [], value]);
    this.afterSelect();
  }

  afterSelect() {
    this.input.nativeElement.value = '';
    if (this.maxItems && this.control.value.length === this.maxItems) {
      this.disabled = true;
    }
    this.changeInput();
  }

  isSelected = (option) => {
    return this.control.value && this.control.value.some(ctr =>
      this.isOptionString ? ctr === option : ctr[this.itemId] === option[this.itemId]);
  }
  chooseFirstOption(keyCode) {
    if (this.matAutocomplete.options.first && (!this.control.value || (this.control.value && !this.control.value.some(ctr =>
      this.isOptionString ? ctr === this.matAutocomplete.options.first.value :
        ctr[this.itemId] === this.matAutocomplete.options.first.value[this.itemId])))) {
      if (keyCode === 'enter') {
        this.matAutocomplete.options.first.select();
      } else if (keyCode === 'tab') {
        this.control.setValue([...this.control.value || [], this.matAutocomplete.options.first.value]);
        this.afterSelect();
      }
    }
  }
  clickCheckboxWrap($event, option) {
    $event.stopPropagation();
    this.toggleSelection(option);
  }
  toggleSelection(option) {
    if (this.isSelected(option)) {
      this.remove(option);
    } else {
      if (!this.control.value || !this.maxItems ||this.control.value.length < this.maxItems) {
        this.onSelect(option)
      }
    }
  }

  onBlur() {
    this.input.nativeElement.value = '';
    this.changeInput();
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