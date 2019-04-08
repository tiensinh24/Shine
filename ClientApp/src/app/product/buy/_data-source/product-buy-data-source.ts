import { DataSource } from '@angular/cdk/table';
import { CollectionViewer } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { PagingParams } from 'src/app/_shared/_intefaces/paging-params';
import { SortParams } from 'src/app/_shared/_intefaces/sort-params';
import { Paging } from 'src/app/_shared/_intefaces/paging';
import { ProductBuyService } from '../_services/product-buy.service';
import { PagedProductBuy } from '../_interfaces/paged-product-buy';
import { ProductBuyList } from '../_interfaces/product-buy-list';
import { TableSource } from 'src/app/_shared/_helpers/table-source';

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
        finalize(() => this.loadingSubject.next(false)),
      )
      .subscribe((res: PagedProductBuy) => {
        this.dataSubject.next(res.items);
        this.pagingSubject.next(res.paging);
      });
  }
}
