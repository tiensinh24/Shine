import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBuyDebtCardComponent } from './order-buy-debt-card.component';

describe('OrderBuyDebtCardComponent', () => {
  let component: OrderBuyDebtCardComponent;
  let fixture: ComponentFixture<OrderBuyDebtCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderBuyDebtCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBuyDebtCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
