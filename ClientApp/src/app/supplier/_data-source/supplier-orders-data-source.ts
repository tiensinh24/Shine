import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { TableSource } from 'src/app/_shared/_helpers/table-source';
import { PagingParams } from 'src/app/_shared/_intefaces/paging-params';
import { SortParams } from 'src/app/_shared/_intefaces/sort-params';
import { PagedSupplierOrders } from '../_interfaces/paged-supplier-orders';
import { SupplierOrders } from '../_interfaces/supplier-orders';
import { SupplierService } from '../_services/supplier.service';


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
