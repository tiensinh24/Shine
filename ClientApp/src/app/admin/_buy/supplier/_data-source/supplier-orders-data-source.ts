import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { TableSource } from 'src/app/_shared/helpers/table-source';
import { SupplierOrders } from 'src/app/_shared/intefaces/buy/supplier/supplier-orders';
import { SupplierService } from 'src/app/_shared/services/buy/supplier.service';
import { PagingParams } from 'src/app/_shared/intefaces/public/paging-params';
import { SortParams } from 'src/app/_shared/intefaces/public/sort-params';
import { PagedSupplierOrders } from 'src/app/_shared/intefaces/buy/supplier/paged-supplier-orders';


export class SupplierOrdersDataSource extends TableSource<SupplierOrders> {
  constructor(private supplierService: SupplierService) {
    super();
  }

  loadData(supplierId: number, pagingParams: PagingParams, sortParams?: SortParams, filter = '') {
    this.loadingSubject.next(true);

    this.supplierService
      .getPagedOrders(supplierId, pagingParams, sortParams, filter)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((res: PagedSupplierOrders) => {
        this.dataSubject.next(res.items);
        this.pagingSubject.next(res.paging);

        if (res.items.length === 0) {
          this.isNull = true;
        }
      });
  }
}
