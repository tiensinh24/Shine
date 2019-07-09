import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBuyHomeComponent } from './order-buy-home.component';

describe('OrderBuyHomeComponent', () => {
  let component: OrderBuyHomeComponent;
  let fixture: ComponentFixture<OrderBuyHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderBuyHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBuyHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
