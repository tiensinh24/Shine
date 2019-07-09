import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { TableSource } from 'src/app/_shared/helpers/table-source';

import { PagedProductBuyRemain } from '../../../../_shared/intefaces/buy/product/paged-product-buy-remain';
import { ProductBuyService } from '../../../../_shared/services/buy/product-buy.service';
import { ProductRemain } from '../../../../_shared/intefaces/public/product-remain';
import { PagingParams } from 'src/app/_shared/intefaces/public/paging-params';
import { SortParams } from 'src/app/_shared/intefaces/public/sort-params';

export class ProductBuyRemainDataSource extends TableSource<ProductRemain> {
  constructor(private productBuyService: ProductBuyService) {
    super();
  }

  loadData(pagingParams: PagingParams, sortParams?: SortParams, filter = '') {
    this.loadingSubject.next(true);

    this.productBuyService
      .getPagedProductRemains(pagingParams, sortParams, filter)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((res: PagedProductBuyRemain) => {
        this.dataSubject.next(res.items);
        this.pagingSubject.next(res.paging);
      });
  }
}
