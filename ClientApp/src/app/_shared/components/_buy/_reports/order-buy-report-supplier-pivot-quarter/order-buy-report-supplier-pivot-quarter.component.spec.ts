import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBuyReportSupplierPivotQuarterComponent } from './order-buy-report-supplier-pivot-quarter.component';

describe('OrderBuyReportSupplierPivotQuarterComponent', () => {
  let component: OrderBuyReportSupplierPivotQuarterComponent;
  let fixture: ComponentFixture<OrderBuyReportSupplierPivotQuarterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderBuyReportSupplierPivotQuarterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBuyReportSupplierPivotQuarterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
