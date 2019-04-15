import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { CategoryBuy } from '../_interfaces/category-buy';
import { CategoryBuyService } from '../_services/category-buy.service';
import { PagingParams } from 'src/app/_shared/_intefaces/paging-params';
import { SortParams } from 'src/app/_shared/_intefaces/sort-params';
import { PagedCategoryBuy } from '../_interfaces/paged-category-buy';
import { TableSource } from 'src/app/_shared/_helpers/table-source';

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