import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { TableSource } from 'src/app/_shared/_helpers/table-source';
import { PagingParams } from 'src/app/_shared/_intefaces/paging-params';
import { SortParams } from 'src/app/_shared/_intefaces/sort-params';
import { PagedProductBuyRemain } from '../_interfaces/paged-product-buy-remain';
import { ProductBuyService } from '../_services/product-buy.service';
import { ProductRemain } from '../../_interfaces/product-remain';


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
