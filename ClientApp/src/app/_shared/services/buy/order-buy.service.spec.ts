import { TestBed } from '@angular/core/testing';

import { OrderBuyService } from './order-buy.service';

describe('OrderBuyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderBuyService = TestBed.get(OrderBuyService);
    expect(service).toBeTruthy();
  });
});
