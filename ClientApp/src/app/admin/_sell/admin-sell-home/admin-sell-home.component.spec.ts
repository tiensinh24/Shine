import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSellHomeComponent } from './admin-sell-home.component';

describe('AdminSellHomeComponent', () => {
  let component: AdminSellHomeComponent;
  let fixture: ComponentFixture<AdminSellHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSellHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSellHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
