import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSellComponent } from './order-sell.component';

describe('OrderSellComponent', () => {
  let component: OrderSellComponent;
  let fixture: ComponentFixture<OrderSellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
