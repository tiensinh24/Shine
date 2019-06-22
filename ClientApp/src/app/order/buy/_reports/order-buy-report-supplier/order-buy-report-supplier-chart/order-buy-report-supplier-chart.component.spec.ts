/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBuyReportSupplierChartComponent } from './order-buy-report-supplier-chart.component';

describe('OrderBuyReportSupplierChartComponent', () => {
  let component: OrderBuyReportSupplierChartComponent;
  let fixture: ComponentFixture<OrderBuyReportSupplierChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderBuyReportSupplierChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBuyReportSupplierChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
