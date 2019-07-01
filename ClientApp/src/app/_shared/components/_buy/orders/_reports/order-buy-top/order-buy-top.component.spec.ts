import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBuyTopComponent } from './order-buy-top.component';

describe('OrderBuyTopComponent', () => {
  let component: OrderBuyTopComponent;
  let fixture: ComponentFixture<OrderBuyTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderBuyTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBuyTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
