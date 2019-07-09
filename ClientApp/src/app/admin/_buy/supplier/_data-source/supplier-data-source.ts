import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { TableSource } from 'src/app/_shared/helpers/table-source';
import { SupplierList } from 'src/app/_shared/intefaces/buy/supplier/supplier-list';
import { SupplierService } from 'src/app/_shared/services/buy/supplier.service';
import { PagingParams } from 'src/app/_shared/intefaces/public/paging-params';
import { SortParams } from 'src/app/_shared/intefaces/public/sort-params';
import { PagedSupplier } from 'src/app/_shared/intefaces/buy/supplier/paged-supplier';

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
