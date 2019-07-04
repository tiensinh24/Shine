import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBuyQuarterChartComponent } from './order-buy-quarter-chart.component';

describe('OrderBuyQuarterChartComponent', () => {
  let component: OrderBuyQuarterChartComponent;
  let fixture: ComponentFixture<OrderBuyQuarterChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderBuyQuarterChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBuyQuarterChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
