import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSellHomeComponent } from './order-sell-home.component';

describe('OrderSellHomeComponent', () => {
  let component: OrderSellHomeComponent;
  let fixture: ComponentFixture<OrderSellHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSellHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSellHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
