import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsPortraitsTemplateComponent } from './events-portraits-template.component';

describe('EventsPortraitsTemplateComponent', () => {
  let component: EventsPortraitsTemplateComponent;
  let fixture: ComponentFixture<EventsPortraitsTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsPortraitsTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsPortraitsTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
