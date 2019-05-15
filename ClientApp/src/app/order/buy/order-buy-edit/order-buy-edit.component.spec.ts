import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBuyEditComponent } from './order-buy-edit.component';

describe('OrderBuyEditComponent', () => {
  let component: OrderBuyEditComponent;
  let fixture: ComponentFixture<OrderBuyEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderBuyEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBuyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
