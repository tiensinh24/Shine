/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBuyReportSupplierPivotMonthChartComponent } from './order-buy-report-supplier-pivot-month-chart.component';

describe('OrderBuyReportSupplierChartComponent', () => {
  let component: OrderBuyReportSupplierPivotMonthChartComponent;
  let fixture: ComponentFixture<OrderBuyReportSupplierPivotMonthChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderBuyReportSupplierPivotMonthChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBuyReportSupplierPivotMonthChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
