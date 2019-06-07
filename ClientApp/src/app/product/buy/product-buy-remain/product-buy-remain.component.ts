import { fromEvent, merge, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { PagingParams } from 'src/app/_shared/_intefaces/paging-params';
import { SortParams } from 'src/app/_shared/_intefaces/sort-params';
import { ConfirmDialogService } from 'src/app/_shared/_services/confirm-dialog.service';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

import { ProductRemain } from '../../_interfaces/product-remain';
import { ProductStorageRemain } from '../../_interfaces/product-storage-remain';
import { ProductBuyRemainDataSource } from '../_data-source/product-buy-remain-data-source';
import { ProductBuyService } from '../_services/product-buy.service';

@Component({
  selector: 'app-product-buy-remain',
  templateUrl: './product-buy-remain.component.html',
  styleUrls: ['./product-buy-remain.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})
export class ProductBuyRemainComponent implements OnInit, AfterViewInit, OnDestroy {
  dataSource: ProductBuyRemainDataSource;
  displayedColumns = ['productName', 'specification', 'remain', 'actions'];
  productStorageRemains: ProductStorageRemain[];
  expandedElement: ProductRemain | null;

  subscription = new Subscription();

  title = 'Products Remain';

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('input', { static: true }) input: ElementRef;

  pagingParams = <PagingParams>{
    pageIndex: 0,
    pageSize: 8
  };

  sortParams = <SortParams>{
    sortColumn: '',
    sortOrder: ''
  };

  constructor(
    private productBuyService: ProductBuyService,
    private router: Router,
    private dialog: MatDialog,
    private confirmService: ConfirmDialogService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.dataSource = new ProductBuyRemainDataSource(this.productBuyService);
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
          this.loadProductsPage();
        })
      )
      .subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          this.loadProductsPage();
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadProductsPage() {
    this.pagingParams.pageIndex = this.paginator.pageIndex;
    this.pagingParams.pageSize = this.paginator.pageSize;

    this.sortParams.sortColumn = this.sort.active;
    this.sortParams.sortOrder = this.sort.direction;

    const filter = this.input.nativeElement.value;

    this.dataSource.loadData(this.pagingParams, this.sortParams, filter);
  }

  getProductRemainPerStorages(productId: number) {
    this.subscription = this.productBuyService
      .getProductRemainPerStorages(productId)
      .subscribe((res: ProductStorageRemain[]) => {
        this.productStorageRemains = res;
      });
  }

  onExpandStorages(productId: number) {
    if (productId > 0) {
      this.getProductRemainPerStorages(productId);
    }
  }
}
