import {
  animate,
  style,
  transition,
  trigger
  } from '@angular/animations';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild
  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { PagingParams } from 'src/app/_shared/_intefaces/paging-params';
import { SortParams } from 'src/app/_shared/_intefaces/sort-params';
import { OrderBuyDataSource } from 'src/app/order/buy/_data-source/order-buy-data-source';
import { OrderBuyQuery } from 'src/app/order/buy/_interfaces/_query/order-buy-query';
import { OrderBuyService } from 'src/app/order/buy/_services/order-buy.service';

@Component({
  selector: 'app-order-buy-list-report',
  templateUrl: './order-buy-list-report.component.html',
  styleUrls: ['./order-buy-list-report.component.css'],
  animations: [
    trigger('flyInOutHoz', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(100px)' }),
        animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))
      ]),
      transition(':leave', [animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 0, transform: 'translateX(100px)' }))])
    ])
  ]
})
export class OrderBuyListReportComponent implements OnInit, AfterViewInit {
  dataSource: OrderBuyDataSource;
  displayedColumns = [
    { key: 'orderNumber', value: 'Order Number' },
    { key: 'dateOfIssue', value: 'Order Date' },
    { key: 'timeForPayment', value: `Payment's Time` },
    { key: 'supplierName', value: 'Supplier' },
    { key: 'employeeName', value: 'Employee' },
    { key: 'value', value: 'Values' },
    { key: 'cost', value: 'Cost' },
    { key: 'rating', value: 'Rating' },
  ];
  columnsToDisplay = ['orderNumber', 'dateOfIssue', 'timeForPayment', 'supplierName', 'employeeName', 'value', 'cost', 'rating'];

  title = 'Order List';

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('input', { static: false }) private input: ElementRef;

  pagingParams = <PagingParams>{
    pageIndex: 0,
    pageSize: 5
  };

  sortParams = <SortParams>{
    sortColumn: '',
    sortOrder: ''
  };

  queryParams = <OrderBuyQuery>{};

  // boolean
  showFilter = false;

  // Formgroup
  filterForm: FormGroup;

  constructor(private orderBuyService: OrderBuyService, private fb: FormBuilder) {}

  ngOnInit() {
    this.dataSource = new OrderBuyDataSource(this.orderBuyService);
    this.dataSource.loadData(this.pagingParams, this.sortParams, this.queryParams);

    this.createFilterForm();
  }

  ngAfterViewInit(): void {
    // Server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(250),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadOrdersPage();
        })
      )
      .subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          this.loadOrdersPage();
        })
      )
      .subscribe();
  }

  createFilterForm() {
    this.filterForm = this.fb.group({
      fromDate: [''],
      toDate: ['']
    });
  }

  loadOrdersPage() {
    this.pagingParams.pageIndex = this.paginator.pageIndex;
    this.pagingParams.pageSize = this.paginator.pageSize;

    this.sortParams.sortColumn = this.sort.active;
    this.sortParams.sortOrder = this.sort.direction;

    if (this.filterForm.value.fromDate) {
      this.queryParams.fromDate = this.filterForm.value.fromDate.format('YYYY-MM-DD');

      if (this.queryParams.supplierId === undefined) {
        this.queryParams.supplierId = 0;
      }

      if (this.queryParams.employeeId === undefined) {
        this.queryParams.employeeId = 0;
      }
    }

    if (this.filterForm.value.toDate) {
      this.queryParams.toDate = this.filterForm.value.toDate.format('YYYY-MM-DD');
    }

    const filter = this.input.nativeElement.value;

    this.dataSource.loadData(this.pagingParams, this.sortParams, this.queryParams, filter);
  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  clearFilter() {
    this.filterForm.reset();
    this.queryParams = {};
    this.loadOrdersPage();
  }

  clearFilterControl(control: string) {
    this.filterForm.controls[control].reset();
  }
}