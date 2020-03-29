import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "./material.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from "./app.component";
import { ChipAutocompleteModule } from "../../projects/chip-autocomplete/src/lib/chip-autocomplete.module";
import { HttpClientModule } from "@angular/common/http";
import { ServerSideDropdownComponent } from "./server-side-dropdown/server-side-dropdown.component";
import { ClientSideDropdownComponent } from "./client-side-dropdown/client-side-dropdown.component";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app.routing.module";

@NgModule({
  declarations: [
    AppComponent,
    ServerSideDropdownComponent,
    ClientSideDropdownComponent
    ],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule, 
    MaterialModule, 
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ChipAutocompleteModule,
    RouterModule,
    AppRoutingModule
    ],
  bootstrap: [AppComponent]
})
export class AppModule {}
