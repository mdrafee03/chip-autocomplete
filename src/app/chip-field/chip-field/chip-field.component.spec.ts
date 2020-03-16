import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipFieldComponent } from './chip-field.component';

describe('ChipFieldComponent', () => {
  let component: ChipFieldComponent;
  let fixture: ComponentFixture<ChipFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChipFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
