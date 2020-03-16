import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipFieldComponent } from './chip-field/chip-field.component';
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
  declarations: [ChipFieldComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  exports: [ChipFieldComponent]
})
export class ChipFieldModule { }
