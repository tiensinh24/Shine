import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSellAddProductsComponent } from './order-sell-add-products.component';

describe('OrderSellAddProductsComponent', () => {
  let component: OrderSellAddProductsComponent;
  let fixture: ComponentFixture<OrderSellAddProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSellAddProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSellAddProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
