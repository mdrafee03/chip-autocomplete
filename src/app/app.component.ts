import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  formGroup: FormGroup;
  maxLanguage = 2;
  languageOptions = [
    {id: 'bn', name: 'Bangla'},
    {id: 'en', name: 'English'},
    {id: 'de', name: 'German'}
  ]
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      languages: [null]
    })
    this.formGroup.controls['languages'].valueChanges.subscribe(res => console.log('root values', res))
    this.formGroup.controls['languages'].setValue([this.languageOptions[1]]);
  }
}
