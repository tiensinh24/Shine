import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { SupplierList } from '../_interfaces/supplier-list';
import { SupplierService } from '../_services/supplier.service';
import { PagingParams } from 'src/app/_shared/_intefaces/paging-params';
import { SortParams } from 'src/app/_shared/_intefaces/sort-params';
import { PagedSupplier } from '../_interfaces/paged-supplier';
import { TableSource } from 'src/app/_shared/_helpers/table-source';

export class SupplierDataSource extends TableSource<SupplierList> {
  constructor(private supplierService: SupplierService) {
    super();
  }

  loadData(pagingParams: PagingParams, sortParams?: SortParams, filter = '') {
    this.loadingSubject.next(true);

    this.supplierService
      .getPagedSuppliers(pagingParams, sortParams, filter)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false)),
      )
      .subscribe((res: PagedSupplier) => {
        this.dataSubject.next(res.items);
        this.pagingSubject.next(res.paging);
      });
  }
}
