
## ChipAutocomplete

Angular chip-autocomplete is a Formcontrol where you can create chips with autocomplete with clientside and server side option filtering which can be used with Reactive Forms as a normal formcontrol like ```<input>``` ```<select>```
  
## Demo

### check out **[Live Demo](https://chip-autocomplete-example.stackblitz.io/)**

code: [stackblitz](https://stackblitz.com/edit/chip-autocomplete-example)

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
```javascript
<chip-autocomplete><chip-autocomplete>
```

You don't need ```<mat-form-field>``` around this control. It was given under the hood.

## API

| Features | Type | Default | Description |
| ------ | ------ | -----| ------|
| placeholder | string | 'Select' | String that sets the placeholder |
| maxItems | number |  null | Sets the maximum number of chips |
| removable | boolean | true | whether the chips are removable |
| required | boolean | true | whether the field is required |
| clientSideFilter | boolean | true | whether the dropdown is filtered by client side or server side. If the value is true (clientside), **options** is required. If the value is false (serverside), **filteredOptions$** Observable and **isOptionString**, **changeSearchKey** eventEmitter |
| options | Array | |  dropdown Options: Array of strings Or Array of Object|
| isOptionString | boolean | true | Whether the options are Strings or Object. In Cleint side filtering, it is not required, it can select automatically from options. But in server side filtering, it is required. |
| displayWith | string | 'value' | If the options are objects, display property of that objects is required |
| itemId | string | 'key' | if the options are objects, key property of that objects is required |
| filteredOptions$ | Observable<any[]> | | Observable that fetch filtered Options from the server. It is required if it is server side filtering |
| changeSearchKey | EventEmitter<string> | | Eventemitter with every key stroke, useful for server side filtering |
| debounceTime | number | 500 | DebounceTime for server side filtering |
| isChipAddFromInput | boolean | false | whether the text not found in dropdown is allowed to add to chips |
| isOptionCheckable | boolean | false | whether Options can be added to chips with checkbox |
| disabledSelected | boolean | true | Whether previously selected options will be disabled and prevent to select |

