import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomageComponent } from './homage.component';

describe('HomageComponent', () => {
  let component: HomageComponent;
  let fixture: ComponentFixture<HomageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
