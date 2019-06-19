import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBuyReportComponent } from './order-buy-report.component';

describe('OrderBuyReportComponent', () => {
  let component: OrderBuyReportComponent;
  let fixture: ComponentFixture<OrderBuyReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderBuyReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBuyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
