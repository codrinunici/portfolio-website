import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionSelectionTemplateComponent } from './collection-selection-template.component';

describe('CollectionSelectionTemplateComponent', () => {
  let component: CollectionSelectionTemplateComponent;
  let fixture: ComponentFixture<CollectionSelectionTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionSelectionTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionSelectionTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
