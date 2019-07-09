import { TestBed } from '@angular/core/testing';

import { ProductBuyService } from './product-buy.service';

describe('ProductService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductBuyService = TestBed.get(ProductBuyService);
    expect(service).toBeTruthy();
  });
});
