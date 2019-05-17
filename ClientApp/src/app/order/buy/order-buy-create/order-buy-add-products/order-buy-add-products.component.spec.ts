import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBuyAddProductsComponent } from './order-buy-add-products.component';

describe('OrderBuyAddProductsComponent', () => {
  let component: OrderBuyAddProductsComponent;
  let fixture: ComponentFixture<OrderBuyAddProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderBuyAddProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBuyAddProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
