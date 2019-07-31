import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { fromEvent, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, finalize, tap } from 'rxjs/operators';
import { Paging } from 'src/app/_shared/intefaces/public/paging';
import { PagingParams } from 'src/app/_shared/intefaces/public/paging-params';
import { SortParams } from 'src/app/_shared/intefaces/public/sort-params';
import { EmployeeList } from 'src/app/_shared/intefaces/public/employee-list';
import { EmployeeService } from 'src/app/_shared/services/public/employee.service';
import { PagedEmployee } from 'src/app/_shared/intefaces/public/storage/paged-employee';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss'],
  animations: [
    trigger('flyInVez', [
      transition(':enter', [
        query(
          '.card, mat-card',
          [
            style({ opacity: 0, transform: 'translateY(100px)' }),
            stagger(30, [animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))])
          ],
          { optional: true }
        )
      ])
    ])
  ]
})
export class EmployeeCardComponent implements OnInit, AfterViewInit {
  mainPhotoUrl = 'assets/default.jpg';

  employees: EmployeeList[];
  paging: Paging;
  loading: boolean;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('input', { static: true }) input: ElementRef;
  @ViewChild('mainSection', { static: true }) mainSection: ElementRef;

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

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.loadData(this.pagingParams, this.sortParams);
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

    this.paginator.page
      .pipe(
        tap(() => {
          this.loadEmployeesPage();
        })
      )
      .subscribe();
  }

  loadData(pagingParams: PagingParams, sortParams?: SortParams, filter = '') {
    this.loading = true;

    this.employeeService
      .getPagedEmployees(pagingParams, sortParams, filter)
      .pipe(
        catchError(() => of([])),
        finalize(() => (this.loading = false))
      )
      .subscribe((res: PagedEmployee) => {
        this.employees = res.items;
        this.paging = res.paging;
      });
  }

  loadEmployeesPage() {
    this.pagingParams.pageIndex = this.paginator.pageIndex;
    this.pagingParams.pageSize = this.paginator.pageSize;

    const filter = this.input.nativeElement.value;

    this.loadData(this.pagingParams, this.sortParams, filter);
  }

  OnPageChange(event: PageEvent) {
    this.pagingParams.pageIndex = event.pageIndex;
    this.pagingParams.pageSize = event.pageSize;
    const filter = this.input.nativeElement.value;
    this.loadData(this.pagingParams, this.sortParams, filter);

    // Scroll to top when goto other page
    this.mainSection.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  clearFilter() {
    this.input.nativeElement.value = null;
    this.loadEmployeesPage();
  }

  // *Output
  outDisplayMode() {
    this.displayMode.emit(true);
  }
}
