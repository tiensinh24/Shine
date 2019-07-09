import { TableSource } from 'src/app/_shared/helpers/table-source';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

import { SupplierService } from 'src/app/_shared/services/buy/supplier.service';
import { ProductBuyList } from 'src/app/_shared/intefaces/buy/product/product-buy-list';
import { PagingParams } from 'src/app/_shared/intefaces/public/paging-params';
import { SortParams } from 'src/app/_shared/intefaces/public/sort-params';
import { PagedProductBuy } from 'src/app/_shared/intefaces/buy/product/paged-product-buy';

export class ProductsBySupplierDataSource extends TableSource<ProductBuyList> {
  constructor(private supplierService: SupplierService) {
    super();
  }

  loadData(supplierId: number, pagingParams: PagingParams, sortParams?: SortParams, filter = '') {
    this.loadingSubject.next(true);

    this.supplierService
      .getPagedProducts(supplierId, pagingParams, sortParams, filter)
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
