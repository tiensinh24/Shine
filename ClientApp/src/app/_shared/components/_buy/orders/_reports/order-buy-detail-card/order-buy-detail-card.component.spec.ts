import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBuyDetailCardComponent } from './order-buy-detail-card.component';

describe('OrderBuyDetailCardComponent', () => {
  let component: OrderBuyDetailCardComponent;
  let fixture: ComponentFixture<OrderBuyDetailCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderBuyDetailCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBuyDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
