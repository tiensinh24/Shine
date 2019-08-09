import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSellEditComponent } from './order-sell-edit.component';

describe('OrderSellEditComponent', () => {
  let component: OrderSellEditComponent;
  let fixture: ComponentFixture<OrderSellEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSellEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSellEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
