import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  formGroup: FormGroup;
  languageOptions = [
    {key: 'bn', value: 'Bangla'},
    {key: 'en', value: 'English'},
    {key: 'de', value: 'German'}
  ]
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      languages: [null]
    })
    this.formGroup.controls['languages'].valueChanges.subscribe(res => console.log(res))
    this.formGroup.controls['languages'].setValue('bn')
  }
  log() {
    console.log(this.formGroup.value)
  }
}
