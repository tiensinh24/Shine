import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBuyMonthChartComponent } from './order-buy-month-chart.component';

describe('OrderBuyMonthChartComponent', () => {
  let component: OrderBuyMonthChartComponent;
  let fixture: ComponentFixture<OrderBuyMonthChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderBuyMonthChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBuyMonthChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
