import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBuyAddCostsComponent } from './order-buy-add-costs.component';

describe('OrderBuyAddCostsComponent', () => {
  let component: OrderBuyAddCostsComponent;
  let fixture: ComponentFixture<OrderBuyAddCostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderBuyAddCostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBuyAddCostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
