import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipFieldComponent } from './chip-field/chip-field.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ChipFieldComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatIconModule
  ],
  exports: [ChipFieldComponent]
})
export class ChipFieldModule { }
