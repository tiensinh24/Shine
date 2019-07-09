import { TestBed } from '@angular/core/testing';

import { ProductSellService } from './product-sell.service';

describe('ProductSellService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductSellService = TestBed.get(ProductSellService);
    expect(service).toBeTruthy();
  });
});
