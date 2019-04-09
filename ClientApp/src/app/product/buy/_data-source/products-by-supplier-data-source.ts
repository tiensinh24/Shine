import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

import { TableSource } from 'src/app/_shared/_helpers/table-source';
import { ProductBuyList } from '../_interfaces/product-buy-list';
import { PagingParams } from 'src/app/_shared/_intefaces/paging-params';
import { SortParams } from 'src/app/_shared/_intefaces/sort-params';
import { PagedProductBuy } from '../_interfaces/paged-product-buy';
import { SupplierService } from 'src/app/supplier/_services/supplier.service';

export class ProductsBySupplierDataSource extends TableSource<ProductBuyList> {
  constructor(private supplierService: SupplierService) {
    super();
  }

  loadData(supplierId: number, pagingParams: PagingParams, sortParams?: SortParams, filter = '') {
    this.loadingSubject.next(true);

    this.supplierService
      .getPagedProductsBySupplier(supplierId, pagingParams, sortParams, filter)
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
