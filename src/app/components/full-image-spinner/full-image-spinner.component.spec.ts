import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullImageSpinnerComponent } from './full-image-spinner.component';

describe('FullImageSpinnerComponent', () => {
  let component: FullImageSpinnerComponent;
  let fixture: ComponentFixture<FullImageSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullImageSpinnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullImageSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
