import { TestBed } from '@angular/core/testing';

import { OrderSellService } from './order-sell.service';

describe('OrderSellService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderSellService = TestBed.get(OrderSellService);
    expect(service).toBeTruthy();
  });
});
