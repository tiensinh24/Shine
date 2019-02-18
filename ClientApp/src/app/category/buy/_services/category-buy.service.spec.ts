import { TestBed } from '@angular/core/testing';

import { CategoryBuyService } from './category-buy.service';

describe('CategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoryBuyService = TestBed.get(CategoryBuyService);
    expect(service).toBeTruthy();
  });
});
