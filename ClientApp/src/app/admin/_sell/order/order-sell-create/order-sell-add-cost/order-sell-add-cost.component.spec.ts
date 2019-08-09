import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSellAddCostComponent } from './order-sell-add-cost.component';

describe('OrderSellAddCostComponent', () => {
  let component: OrderSellAddCostComponent;
  let fixture: ComponentFixture<OrderSellAddCostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSellAddCostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSellAddCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
