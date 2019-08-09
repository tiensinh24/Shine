import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSellDetailComponent } from './order-sell-detail.component';

describe('OrderSellDetailComponent', () => {
  let component: OrderSellDetailComponent;
  let fixture: ComponentFixture<OrderSellDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSellDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSellDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
