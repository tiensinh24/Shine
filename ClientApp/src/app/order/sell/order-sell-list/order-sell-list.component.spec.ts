import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSellListComponent } from './order-sell-list.component';

describe('OrderSellListComponent', () => {
  let component: OrderSellListComponent;
  let fixture: ComponentFixture<OrderSellListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSellListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSellListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
