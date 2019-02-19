import { TestBed } from '@angular/core/testing';

import { CategorySellService } from './category-sell.service';

describe('CategorySellService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategorySellService = TestBed.get(CategorySellService);
    expect(service).toBeTruthy();
  });
});
