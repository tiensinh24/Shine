import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { PagingParams } from 'src/app/_shared/_intefaces/paging-params';
import { SortParams } from 'src/app/_shared/_intefaces/sort-params';

import { TableSource } from 'src/app/_shared/_helpers/table-source';
import { SupplierDebt } from '../../_interfaces/reports/supplier-debt';
import { SupplierService } from '../../_services/supplier.service';
import { PagedSupplierDebts } from '../../_interfaces/reports/paged-supplier-debt';

export class SupplierDebtDataSource extends TableSource<SupplierDebt> {
  constructor(private supplierService: SupplierService) {
    super();
  }

  loadData(pagingParams: PagingParams, sortParams?: SortParams, filter = '') {
    this.loadingSubject.next(true);

    this.supplierService
      .getPagedSupplierDebts(pagingParams, sortParams, filter)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false)),
      )
      .subscribe((res: PagedSupplierDebts) => {
        this.dataSubject.next(res.items);
        this.pagingSubject.next(res.paging);
      });
  }
}
