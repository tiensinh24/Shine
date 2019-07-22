import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { TableSource } from 'src/app/_shared/helpers/table-source';
import { PagingParams } from 'src/app/_shared/intefaces/public/paging-params';
import { SortParams } from 'src/app/_shared/intefaces/public/sort-params';
import { EmployeeList } from 'src/app/_shared/intefaces/public/employee-list';
import { EmployeeService } from 'src/app/_shared/services/public/employee.service';
import { PagedEmployee } from 'src/app/_shared/intefaces/public/storage/paged-employee';

export class EmployeeDataSource extends TableSource<EmployeeList> {
  constructor(private employeeService: EmployeeService) {
    super();
  }

  loadData(pagingParams: PagingParams, sortParams?: SortParams, filter = '') {
    this.loadingSubject.next(true);

    this.employeeService
      .getPagedEmployees(pagingParams, sortParams, filter)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((res: PagedEmployee) => {
        this.dataSubject.next(res.items);
        this.pagingSubject.next(res.paging);
      });
  }
}
