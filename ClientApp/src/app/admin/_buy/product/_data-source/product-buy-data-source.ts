import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { TableSource } from 'src/app/_shared/helpers/table-source';
import { ProductBuyService } from '../../../../_shared/services/buy/product-buy.service';
import { ProductBuyList } from 'src/app/_shared/intefaces/buy/product/product-buy-list';
import { PagingParams } from 'src/app/_shared/intefaces/public/paging-params';
import { SortParams } from 'src/app/_shared/intefaces/public/sort-params';
import { PagedProductBuy } from 'src/app/_shared/intefaces/buy/product/paged-product-buy';

export class ProductBuyDataSource extends TableSource<ProductBuyList> {
  constructor(private productBuyService: ProductBuyService) {
    super();
  }

  loadData(pagingParams: PagingParams, sortParams?: SortParams, filter = '') {
    this.loadingSubject.next(true);

    this.productBuyService
      .getPagedProducts(pagingParams, sortParams, filter)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((res: PagedProductBuy) => {
        this.dataSubject.next(res.items);
        this.pagingSubject.next(res.paging);
      });
  }
}
