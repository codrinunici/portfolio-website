import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioPageTemplateComponent } from './portfolio-page-template.component';

describe('PortfolioPageTemplateComponent', () => {
  let component: PortfolioPageTemplateComponent;
  let fixture: ComponentFixture<PortfolioPageTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioPageTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioPageTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
