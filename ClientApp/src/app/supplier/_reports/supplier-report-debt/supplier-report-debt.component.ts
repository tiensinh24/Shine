import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Subscription, merge, fromEvent } from 'rxjs';
import { SupplierDebt } from '../../_interfaces/reports/supplier-debt';
import { OrderDebtBySupplier } from '../../_interfaces/reports/order-debt-by-supplier';
import { SupplierService } from '../../_services/supplier.service';
import { PagingParams } from 'src/app/_shared/_intefaces/paging-params';
import { SupplierDebtDataSource } from '../../_data-source/reports/supplier-deb-data-source';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SortParams } from 'src/app/_shared/_intefaces/sort-params';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-supplier-report-debt',
  templateUrl: './supplier-report-debt.component.html',
  styleUrls: ['./supplier-report-debt.component.scss']
})
export class SupplierReportDebtComponent implements OnInit, AfterViewInit, OnDestroy {
  // Subscription
  subscription: Subscription;

  // mat-table
  dataSource: SupplierDebtDataSource;
  displayedColumns = ['supplierName', 'debt'];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('input', { static: false }) input: ElementRef;

  supplierDebts: SupplierDebt[];
  orderDebtsBySupplier: OrderDebtBySupplier;

  // Paging
  pagingParams = <PagingParams>{
    pageIndex: 0,
    pageSize: 8
  };

  sortParams = <SortParams>{
    sortColumn: '',
    sortOrder: ''
  };

  constructor(private supplierService: SupplierService) { }

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

  ngOnDestroy() {
    
  }

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

}
