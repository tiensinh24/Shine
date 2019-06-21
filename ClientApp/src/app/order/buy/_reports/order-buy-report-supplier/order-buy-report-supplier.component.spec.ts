import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBuyReportSupplierComponent } from './order-buy-report-supplier.component';

describe('OrderBuyReportSupplierComponent', () => {
  let component: OrderBuyReportSupplierComponent;
  let fixture: ComponentFixture<OrderBuyReportSupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderBuyReportSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBuyReportSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
