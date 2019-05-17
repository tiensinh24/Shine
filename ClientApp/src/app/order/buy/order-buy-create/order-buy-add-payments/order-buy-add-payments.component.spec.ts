import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBuyAddPaymentsComponent } from './order-buy-add-payments.component';

describe('OrderBuyAddPaymentsComponent', () => {
  let component: OrderBuyAddPaymentsComponent;
  let fixture: ComponentFixture<OrderBuyAddPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderBuyAddPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBuyAddPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
