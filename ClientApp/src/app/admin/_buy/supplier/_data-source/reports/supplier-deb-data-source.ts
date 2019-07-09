import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { TableSource } from 'src/app/_shared/helpers/table-source';
import { SupplierDebt } from 'src/app/_shared/intefaces/buy/supplier/report/supplier-debt';
import { SupplierService } from 'src/app/_shared/services/buy/supplier.service';
import { PagingParams } from 'src/app/_shared/intefaces/public/paging-params';
import { SortParams } from 'src/app/_shared/intefaces/public/sort-params';
import { PagedSupplierDebts } from 'src/app/_shared/intefaces/buy/supplier/report/paged-supplier-debt';


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
