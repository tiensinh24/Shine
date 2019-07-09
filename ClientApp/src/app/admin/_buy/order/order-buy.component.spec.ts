import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBuyComponent } from './order-buy.component';

describe('OrderBuyComponent', () => {
  let component: OrderBuyComponent;
  let fixture: ComponentFixture<OrderBuyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderBuyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
