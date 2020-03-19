import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { LanguageService } from './language.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  formGroup: FormGroup;
  maxLanguage = 3;
  clientSideFilter = true;
  debounceTime = 1000;
  filteredOptions$: Observable<any>;
  // languageOptions = [
  //   {code: 'bn', name: 'Bangla'},
  //   {code: 'en', name: 'English'},
  //   {code: 'de', name: 'German'}
  // ];
  languageOptions = ['Bangla', 'English', "German"];
  constructor(
    private fb: FormBuilder,
    private service: LanguageService) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      languages: [null]
    })
    if (!this.clientSideFilter) {
      this.onChangeSearchkey('');
    }
    this.formGroup.controls['languages'].valueChanges.subscribe(res => console.log('root values', res))
    // this.formGroup.controls['languages'].setValue(['Bangla']);
    // this.formGroup.controls['languages'].setValue([{code: 'de', name: 'German'}])
  }
  onChangeSearchkey(event){
    if (event === '') {
      this.filteredOptions$ = this.service.languages$
    } else {
      this.filteredOptions$ = this.service.languages$.pipe(
        map(languages => languages.filter(lang => (lang.name).toLowerCase().includes(event)))
      )
    }
  }
}
