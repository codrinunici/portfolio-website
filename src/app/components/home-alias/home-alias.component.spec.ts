import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAliasComponent } from './home-alias.component';

describe('HomeAliasComponent', () => {
  let component: HomeAliasComponent;
  let fixture: ComponentFixture<HomeAliasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeAliasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeAliasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
