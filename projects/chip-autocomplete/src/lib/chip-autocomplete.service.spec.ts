import { TestBed } from '@angular/core/testing';

import { ChipAutocompleteService } from './chip-autocomplete.service';

describe('ChipAutocompleteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChipAutocompleteService = TestBed.get(ChipAutocompleteService);
    expect(service).toBeTruthy();
  });
});
