import { of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { TableSource } from "src/app/_shared/helpers/table-source";
import { PagingParams } from "src/app/_shared/intefaces/public/paging-params";
import { SortParams } from "src/app/_shared/intefaces/public/sort-params";
import { CustomerList } from "src/app/_shared/intefaces/sell/customer/customer-list";
import { CustomerService } from "src/app/_shared/services/sell/customer.service";
import { PagedCustomer } from "src/app/_shared/intefaces/sell/customer/paged-customer";

export class CustomerDataSource extends TableSource<CustomerList> {
  constructor(private customerService: CustomerService) {
    super();
  }

  loadData(pagingParams: PagingParams, sortParams?: SortParams, filter = "") {
    this.loadingSubject.next(true);

    this.customerService
      .getPagedCustomers(pagingParams, sortParams, filter)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((res: PagedCustomer) => {
        this.dataSubject.next(res.items);
        this.pagingSubject.next(res.paging);
      });
  }
}
