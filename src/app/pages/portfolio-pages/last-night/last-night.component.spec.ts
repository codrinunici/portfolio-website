import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastNightComponent } from './last-night.component';

describe('LastNightComponent', () => {
  let component: LastNightComponent;
  let fixture: ComponentFixture<LastNightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastNightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LastNightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
