import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBuyReportEmployeeComponent } from './order-buy-report-employee.component';

describe('OrderBuyReportEmployeeComponent', () => {
  let component: OrderBuyReportEmployeeComponent;
  let fixture: ComponentFixture<OrderBuyReportEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderBuyReportEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBuyReportEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
