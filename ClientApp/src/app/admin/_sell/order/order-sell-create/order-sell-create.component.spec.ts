import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSellCreateComponent } from './order-sell-create.component';

describe('OrderSellCreateComponent', () => {
  let component: OrderSellCreateComponent;
  let fixture: ComponentFixture<OrderSellCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSellCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSellCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
