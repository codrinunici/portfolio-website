import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TragedyComponent } from './tragedy.component';

describe('TragedyComponent', () => {
  let component: TragedyComponent;
  let fixture: ComponentFixture<TragedyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TragedyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TragedyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
