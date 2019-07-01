import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBuyLatestComponent } from './order-buy-latest.component';

describe('OrderBuyLatestComponent', () => {
  let component: OrderBuyLatestComponent;
  let fixture: ComponentFixture<OrderBuyLatestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderBuyLatestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBuyLatestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
