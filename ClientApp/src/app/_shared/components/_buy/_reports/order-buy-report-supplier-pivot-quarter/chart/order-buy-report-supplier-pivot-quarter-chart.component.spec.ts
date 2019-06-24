import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBuyReportSupplierPivotQuarterChartComponent } from './order-buy-report-supplier-pivot-quarter-chart.component';

describe('OrderBuyReportSupplierPivotQuarterChartComponent', () => {
  let component: OrderBuyReportSupplierPivotQuarterChartComponent;
  let fixture: ComponentFixture<OrderBuyReportSupplierPivotQuarterChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderBuyReportSupplierPivotQuarterChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBuyReportSupplierPivotQuarterChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
