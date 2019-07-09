import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBuyDetailComponent } from './order-buy-detail.component';

describe('OrderBuyDetailComponent', () => {
  let component: OrderBuyDetailComponent;
  let fixture: ComponentFixture<OrderBuyDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderBuyDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBuyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});