import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBuyListComponent } from './order-buy-list.component';

describe('OrderBuyListComponent', () => {
  let component: OrderBuyListComponent;
  let fixture: ComponentFixture<OrderBuyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderBuyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBuyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
