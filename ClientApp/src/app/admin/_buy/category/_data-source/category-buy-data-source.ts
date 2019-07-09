import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { TableSource } from 'src/app/_shared/helpers/table-source';
import { CategoryBuy } from 'src/app/_shared/intefaces/buy/category/category-buy';
import { CategoryBuyService } from 'src/app/_shared/services/buy/category-buy.service';
import { PagingParams } from 'src/app/_shared/intefaces/public/paging-params';
import { SortParams } from 'src/app/_shared/intefaces/public/sort-params';
import { PagedCategoryBuy } from 'src/app/_shared/intefaces/buy/category/paged-category-buy';

export class CategoryBuyDataSource extends TableSource<CategoryBuy> {

  constructor(private categoryBuyService: CategoryBuyService) {
    super();
  }

  loadData(pagingParams: PagingParams, sortParams?: SortParams, filter = '') {
    this.loadingSubject.next(true);

    this.categoryBuyService
      .getPagedCategories(pagingParams, sortParams, filter)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false)),
      )
      .subscribe((res: PagedCategoryBuy) => {
        this.dataSubject.next(res.items);
        this.pagingSubject.next(res.paging);
      });
  }
}
