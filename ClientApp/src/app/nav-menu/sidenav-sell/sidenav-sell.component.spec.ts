import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavSellComponent } from './sidenav-sell.component';

describe('SidenavSellComponent', () => {
  let component: SidenavSellComponent;
  let fixture: ComponentFixture<SidenavSellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavSellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
