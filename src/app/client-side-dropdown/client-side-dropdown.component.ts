import { Component, OnInit, forwardRef, Input } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Observable, of } from "rxjs";
import { LanguageService } from "../language.service";
import { map } from "rxjs/operators";

@Component({
  selector: "app-client-side-dropdown",
  templateUrl: "./client-side-dropdown.component.html",
  styleUrls: ["./client-side-dropdown.component.css"]
})
export class ClientSideDropdownComponent implements OnInit {
  formGroup: FormGroup;
  placeholder = "Select Languages";
  clientsideFilter = true;
  removable = true;
  isOptionString = false;
  isChipAddFromInput = true;
  required = true;
  displayWith = "name";
  itemid = "id";
  isOptionCheckable = false;
  disabledSelected = true;
  maxLanguage = null;
  clientSideFilter = true;
  languageOptions = [
    { id: "bn", name: "Bangla" },
    { id: "en", name: "English" },
    { id: "de", name: "German" }
  ];
  // languageOptions = ['Bangla', 'English', "German"];
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      languages: [null]
    });
    this.formGroup.controls["languages"].valueChanges.subscribe(res =>
      console.log("parent value", res)
    );
    // this.formGroup.controls['languages'].setValue(['Bangla']);
    // this.formGroup.controls['languages'].setValue([{code: 'de', name: 'German'}])
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
    if(this.maxLanguage === null) {
      this.maxLanguage = 2;
    } else {
      this.maxLanguage = null
    }
  }
}
