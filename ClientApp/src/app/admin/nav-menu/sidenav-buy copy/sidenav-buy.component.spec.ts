import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavBuyComponent } from './sidenav-buy.component';

describe('SidenavBuyComponent', () => {
  let component: SidenavBuyComponent;
  let fixture: ComponentFixture<SidenavBuyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavBuyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
