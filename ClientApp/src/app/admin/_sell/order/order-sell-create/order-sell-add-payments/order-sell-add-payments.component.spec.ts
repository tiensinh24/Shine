import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSellAddPaymentsComponent } from './order-sell-add-payments.component';

describe('OrderSellAddPaymentsComponent', () => {
  let component: OrderSellAddPaymentsComponent;
  let fixture: ComponentFixture<OrderSellAddPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSellAddPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSellAddPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
