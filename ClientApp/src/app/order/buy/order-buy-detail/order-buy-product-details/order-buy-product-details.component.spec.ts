import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBuyProductDetailsComponent } from './order-buy-product-details.component';

describe('OrderBuyProductDetailsComponent', () => {
  let component: OrderBuyProductDetailsComponent;
  let fixture: ComponentFixture<OrderBuyProductDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderBuyProductDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBuyProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
