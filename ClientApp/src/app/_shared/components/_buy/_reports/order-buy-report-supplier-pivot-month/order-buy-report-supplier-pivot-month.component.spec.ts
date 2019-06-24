import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBuyReportSupplierPivotMonthComponent } from './order-buy-report-supplier-pivot-month.component';

describe('OrderBuyReportSupplierComponent', () => {
  let component: OrderBuyReportSupplierPivotMonthComponent;
  let fixture: ComponentFixture<OrderBuyReportSupplierPivotMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderBuyReportSupplierPivotMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBuyReportSupplierPivotMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
