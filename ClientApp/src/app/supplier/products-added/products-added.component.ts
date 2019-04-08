import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { PagingParams } from 'src/app/_shared/_intefaces/paging-params';
import { SortParams } from 'src/app/_shared/_intefaces/sort-params';
import { ConfirmDialogService } from 'src/app/_shared/_services/confirm-dialog.service';
import { ProductBuyDataSource } from 'src/app/product/buy/_data-source/product-buy-data-source';
import { ProductBuyList } from 'src/app/product/buy/_interfaces/product-buy-list';
import { ProductBuyService } from 'src/app/product/buy/_services/product-buy.service';

import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSnackBar, MatSort } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { SupplierProduct } from '../_interfaces/supplier-product';
import { SupplierService } from '../_services/supplier.service';

@Component({
  selector: 'app-products-added',
  templateUrl: './products-added.component.html',
  styleUrls: ['./products-added.component.css'],
})
export class ProductsAddedComponent implements OnInit, AfterViewInit {
  dataSource: ProductBuyDataSource;
  displayedColumns = [
    'select',
    'productName',
    'specification',
    'categoryName',
    'actions',
  ];
  selection = new SelectionModel<ProductBuyList>(true, [], false);

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
    private supplierService: SupplierService,
    private productBuyService: ProductBuyService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private confirmDialogService: ConfirmDialogService,
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

  DeleteProductFromSupplier(product: ProductBuyList) {
    const dialogRef = this.confirmDialogService.openDialog(
      `Are you sure to delete ${product.productName}?`,
    );

    dialogRef.afterClosed().subscribe((res: boolean) => {
      if (res) {
        const supplierId = this.route.snapshot.params.id;
        const delEntity = <SupplierProduct>{
          personId: supplierId,
          productId: product.productId,
        };
        this.supplierService.deleteSupplierProduct(delEntity).subscribe(() => {
          this.loadProductsPage();
        });
        this.snackBar.open(`${product.productName} deleted`, 'Success');
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
}
