import { fromEvent, merge, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { PagingParams } from 'src/app/_shared/_intefaces/paging-params';
import { SortParams } from 'src/app/_shared/_intefaces/sort-params';
import { ConfirmDialogService } from 'src/app/_shared/_services/confirm-dialog.service';
import {
    ProductBuyEditDialogComponent
} from 'src/app/_shared/components/product-buy-edit-dialog/product-buy-edit-dialog.component';
import { CategoryBuy } from 'src/app/category/buy/_interfaces/category-buy';
import { CategoryBuyService } from 'src/app/category/buy/_services/category-buy.service';

import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
    MatDialog, MatDialogConfig, MatPaginator, MatSnackBar, MatSort, MatTableDataSource
} from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductBuyDataSource } from '../_data-source/product-buy-data-source';
import { ProductBuy } from '../_interfaces/product-buy';
import { ProductBuyList } from '../_interfaces/product-buy-list';
import { ProductBuyService } from '../_services/product-buy.service';

@Component({
  selector: 'app-product-buy-list',
  templateUrl: './product-buy-list.component.html',
  styleUrls: ['./product-buy-list.component.css'],
})
export class ProductBuyListComponent implements OnInit, AfterViewInit {
  dataSource: ProductBuyDataSource;
  displayedColumns = [
    'select',
    'productName',
    'specification',
    'categoryName',
    'actions',
  ];
  selection = new SelectionModel<ProductBuyList>(true, [], false);

  title = 'Products List';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  pagingParams = <PagingParams>{
    pageIndex: 0,
    pageSize: 8,
  };

  sortParams = <SortParams>{
    sortColumn: '',
    sortOrder: '',
  };

  constructor(
    private productBuyService: ProductBuyService,
    private router: Router,
    private dialog: MatDialog,
    private confirmService: ConfirmDialogService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.dataSource = new ProductBuyDataSource(this.productBuyService);
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
        }),
      )
      .subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          this.loadProductsPage();
          setTimeout(() => this.selection.clear(), 50);
        }),
      )
      .subscribe();
  }

  loadProductsPage() {
    this.pagingParams.pageIndex = this.paginator.pageIndex;
    this.pagingParams.pageSize = this.paginator.pageSize;

    this.sortParams.sortColumn = this.sort.active;
    this.sortParams.sortOrder = this.sort.direction;

    const filter = this.input.nativeElement.value;

    this.dataSource.loadData(this.pagingParams, this.sortParams, filter);
  }

  onCreate() {
    this.openDialog(0);
  }

  onDetail(productBuy: ProductBuy) {
    this.router.navigate(['product-buy', productBuy.productId]);
  }

  onEdit(productBuy: ProductBuy) {
    this.openDialog(productBuy.productId);
  }

  onDelete(productBuy: ProductBuy) {
    const dialogRef = this.confirmService.openDialog(
      `Are you sure to delete ${productBuy.productName}?`,
    );

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.productBuyService
          .deleteProduct(productBuy.productId)
          .subscribe(() => {
            this.loadProductsPage();
          });
        this.snackBar.open(`${productBuy.productName} deleted`, 'Success');
      }
    });
  }

  // Open product-buy-edit-dialog
  openDialog(productId?: number) {
    // Find product in dataSource
    let prodEdit: ProductBuyList = null;

    this.dataSource.data.subscribe(res => {
      prodEdit = res.find(c => c.productId === productId);
    });

    const dialogConfig = <MatDialogConfig>{
      disableClose: true,
      autoFocus: true,
      width: '100vw',
      height: '100vh',
    };

    // Send data to product edit component
    if (prodEdit) {
      dialogConfig.data = {
        productId: prodEdit.productId,
        productName: prodEdit.productName,
        specification: prodEdit.specification,
        categoryId: prodEdit.categoryId,
      };
    }

    // Open dialog with config & passed data
    const dialogRef = this.dialog.open(
      ProductBuyEditDialogComponent,
      dialogConfig,
    );

    // Pass data from dialog in to main component
    dialogRef.afterClosed().subscribe((data: ProductBuyList) => {
      if (data) {
        this.loadProductsPage();
      }

      this.selection.clear();
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
}
