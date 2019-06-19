import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBuyReportHomeComponent } from './order-buy-report-home.component';

describe('OrderBuyReportHomeComponent', () => {
  let component: OrderBuyReportHomeComponent;
  let fixture: ComponentFixture<OrderBuyReportHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderBuyReportHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBuyReportHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
