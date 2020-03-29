import { Component, OnInit, forwardRef, Input } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Observable, of } from "rxjs";
import { LanguageService } from "../language.service";
import { map } from "rxjs/operators";

@Component({
  selector: "app-server-side-dropdown",
  templateUrl: "./server-side-dropdown.component.html",
  styleUrls: ["./server-side-dropdown.component.css"]
})
export class ServerSideDropdownComponent implements OnInit {
  formGroup: FormGroup;
  placeholder = "Select Languages";
  clientsideFilter = false;
  removable = true;
  isOptionString = false;
  isChipAddFromInput = true;
  required = true;
  displayWith = "name";
  itemid = "code";
  isOptionCheckable = false;
  disabledSelected = true;
  maxLanguage = 3;
  debounceTime = 500;
  filteredOptions$: Observable<any>;
  constructor(private fb: FormBuilder, private service: LanguageService) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      languages: [null]
    });
    this.onChangeSearchkey("");

    this.formGroup.controls["languages"].valueChanges.subscribe(res =>
      console.log("root values", res)
    );
    // this.formGroup.controls['languages'].setValue([{code: 'de', name: 'German'}])
  }
  onChangeSearchkey(event) {
    if (event === "") {
      this.filteredOptions$ = this.service.languages$;
    } else {
      this.filteredOptions$ = this.service.languages$.pipe(
        map(languages =>
          languages.filter(lang => lang.name.toLowerCase().includes(event))
        )
      );
    }
  }
  changeRequired(value) {
    this.required = value;
  }
  changeRemovable(value) {
    this.removable = value;
  }
  changeCheckable(value) {
    this.isOptionCheckable = value;
  }
  changeIsChipAdd(value) {
    this.isChipAddFromInput = value;
  }
  changeMaxItemsNullStatus() {
    if (this.maxLanguage === null) {
      this.maxLanguage = 2;
    } else {
      this.maxLanguage = null;
    }
  }
}
