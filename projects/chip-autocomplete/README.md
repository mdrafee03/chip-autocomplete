## ChipAutocomplete

chip-autocomplete formcontrol where you can create chips with autocomplete with clientside and server side option filtering.

## Getting Started

    npm i chip-autocomplete

## Configuration

Install @angular/material, if you didn't installed already:

    npm add @angular/material

Ensure you import the module and the dependencies:

```javascript
import { ChipAutocompleteModule } from 'chips-autocomplete';
import { BrowserModule } from '@angular/platform-browser'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
   imports: [
       BrowserModule,
       FormsModule,
       ReactiveFormsModule,
       ChipAutocompleteModule
       ...OtherModules 
   ] // along with your other modules
})
export class AppModule {}
```
## Implementation

Use the component in any component:

app.component.html
<chip-autocomplete><chip-autocomplete>

## API
**`placeholder`** - [**`?string`**]

String that sets the placeholder of the chip-autocomplete.


**`maxItems`** -  [**`?number`**]

Sets the maximum number of items it is possible to enter.

