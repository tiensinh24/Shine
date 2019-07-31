import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { PagingParams } from 'src/app/_shared/intefaces/public/paging-params';
import { SortParams } from 'src/app/_shared/intefaces/public/sort-params';
import { ConfirmDialogService } from 'src/app/_shared/services/public/confirm-dialog.service';
import { EmployeeDataSource } from '../_data-source/employee-data-source';
import { EmployeeList } from 'src/app/_shared/intefaces/public/employee-list';
import { EmployeeService } from 'src/app/_shared/services/public/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, AfterViewInit {
  dataSource: EmployeeDataSource;
  displayedColumns = [
    { key: 'select', value: 'Select' },
    { key: 'photo', value: 'Photo' },
    { key: 'departmentName', value: 'Department' },
    { key: 'gender', value: 'Gender' },
    { key: 'fullName', value: 'Full Name' },
    { key: 'dateOfBirth', value: 'Birthday' },
    { key: 'telephone', value: 'Telephone' },
    { key: 'countryName', value: 'Country' },
    { key: 'email', value: 'Email' },
    { key: 'address', value: 'Address' },
    { key: 'actions', value: 'Actions' }
  ];
  columnsToDisplay = [
    'select',
    'photo',
    'departmentName',
    'gender',
    'fullName',
    'dateOfBirth',
    'telephone',
    'countryName',
    'email',
    'address',
    'actions'
  ];
  selection = new SelectionModel<EmployeeList>(true, []);
  numRows: number;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('input', { static: true }) input: ElementRef;

  // Output
  @Output() displayMode = new EventEmitter<boolean>();

  pagingParams = <PagingParams>{
    pageIndex: 0,
    pageSize: 8
  };

  sortParams = <SortParams>{
    sortColumn: '',
    sortOrder: ''
  };

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private confirmService: ConfirmDialogService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.dataSource = new EmployeeDataSource(this.employeeService);
    this.dataSource.loadData(this.pagingParams, this.sortParams);
  }

  ngAfterViewInit(): void {
    // Server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(250),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadEmployeesPage();
        })
      )
      .subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          this.loadEmployeesPage();
          setTimeout(() => this.selection.clear(), 50);
        })
      )
      .subscribe();
  }

  loadEmployeesPage() {
    this.pagingParams.pageIndex = this.paginator.pageIndex;
    this.pagingParams.pageSize = this.paginator.pageSize;

    this.sortParams.sortColumn = this.sort.active;
    this.sortParams.sortOrder = this.sort.direction;

    const filter = this.input.nativeElement.value;

    this.dataSource.loadData(this.pagingParams, this.sortParams, filter);
  }

  onCreate() {
    this.router.navigate(['/admin/employee/create']);
  }


  onEdit(employee: EmployeeList) {
    this.router.navigate([`/admin/employee/${employee.employeeId}/edit`]);
  }

  onDelete(employee: EmployeeList) {
    const dialogRef = this.confirmService.openDialog(`Are you sure to delete ${employee.fullName}?`);

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.employeeService.deleteEmployee(employee.employeeId).subscribe(() => {
          this.loadEmployeesPage();
          this.snackBar.open(`${employee.fullName} deleted`, 'Success');
          setTimeout(() => this.selection.clear(), 50);
        });
      }
    });
  }

  onDeleteSelected() {
    let employees: EmployeeList[];
    const employeesToDelete: string[] = [];
    this.dataSource.data.subscribe(data => (employees = data));

    const dialogRef = this.confirmService.openDialog(`Are you sure to delete those employees`);

    dialogRef.afterClosed().subscribe((res: boolean) => {
      if (res) {
        employees.forEach(employee => {
          if (this.selection.isSelected(employee)) {
            employeesToDelete.push(employee.employeeId.toString());
          }
        });
        this.employeeService.deleteEmployees(employeesToDelete).subscribe((resp: boolean) => {
          if (resp) {
            this.loadEmployeesPage();
            this.snackBar.open('Employees deleted', 'Success');
          } else {
            this.snackBar.open('Can not delete employees', 'Error');
          }
          setTimeout(() => this.selection.clear(), 50);
        });
      }
    });
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.paginator.pageSize;

    return numSelected === numRows;
  }

  selectAll() {
    this.dataSource.data.subscribe(rows => {
      rows.forEach(row => this.selection.select(row));
    });
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.selectAll();
    }
  }

  clearFilter() {
    this.input.nativeElement.value = null;
    this.loadEmployeesPage();
  }

  // *Output
  outDisplayMode() {
    this.displayMode.emit(false);
  }
}
