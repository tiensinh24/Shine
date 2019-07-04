import {
  animate,
  state,
  style,
  transition,
  trigger
  } from '@angular/animations';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  fromEvent,
  merge,
  Observable,
  Subscription
  } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { PagingParams } from 'src/app/_shared/_intefaces/paging-params';
import { SortParams } from 'src/app/_shared/_intefaces/sort-params';
import { SupplierDebtDataSource } from 'src/app/supplier/_data-source/reports/supplier-deb-data-source';
import { OrderDebt } from 'src/app/supplier/_interfaces/reports/order-debt';
import { SupplierDebt } from 'src/app/supplier/_interfaces/reports/supplier-debt';
import { SupplierService } from 'src/app/supplier/_services/supplier.service';


@Component({
  selector: 'app-supplier-report-debt',
  templateUrl: './supplier-report-debt.component.html',
  styleUrls: ['./supplier-report-debt.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      )
    ])
  ]
})
export class SupplierReportDebtComponent
  implements OnInit, AfterViewInit, OnDestroy {
  // Subscription
  subscription: Subscription;

  expandedElement: SupplierDebt | null;

  // mat-table
  dataSource: SupplierDebtDataSource;
  displayedColumns = ['photo', 'supplierName', 'debt', 'actions'];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('input', { static: false }) input: ElementRef;

  orderDebtsBySupplier: OrderDebt;

  // boolean

  // Paging
  pagingParams = <PagingParams>{
    pageIndex: 0,
    pageSize: 5
  };

  sortParams = <SortParams>{
    sortColumn: '',
    sortOrder: ''
  };

  constructor(private supplierService: SupplierService) {}

  ngOnInit() {
    this.initialize();
  }

  ngAfterViewInit() {
    // Server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(250),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadSupplierDebtsPage();
        })
      )
      .subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          this.loadSupplierDebtsPage();
        })
      )
      .subscribe();
  }

  ngOnDestroy() {}

  initialize() {
    this.dataSource = new SupplierDebtDataSource(this.supplierService);
    this.dataSource.loadData(this.pagingParams, this.sortParams);
  }

  loadSupplierDebtsPage() {
    this.pagingParams.pageIndex = this.paginator.pageIndex;
    this.pagingParams.pageSize = this.paginator.pageSize;

    this.sortParams.sortColumn = this.sort.active;
    this.sortParams.sortOrder = this.sort.direction;

    const filter = this.input.nativeElement.value;

    this.dataSource.loadData(this.pagingParams, this.sortParams, filter);
  }

  getOrderDebtsBySupplier(supplierId: number) {
    this.subscription = this.supplierService
      .getOrderDebtsBySupplier(supplierId)
      .subscribe((order: OrderDebt) => {
        this.orderDebtsBySupplier = order;
      });
  }

  onExpandSupplier(supplierId: number) {
    if (supplierId > 0) {
      this.getOrderDebtsBySupplier(supplierId);
    }
  }
}
