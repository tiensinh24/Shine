import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { ProductsBySupplierDataSource } from '../../_data-source/products-by-supplier-data-source';
import { ProductBuyList } from 'src/app/_shared/intefaces/buy/product/product-buy-list';
import { PagingParams } from 'src/app/_shared/intefaces/public/paging-params';
import { SortParams } from 'src/app/_shared/intefaces/public/sort-params';
import { SupplierService } from 'src/app/_shared/services/buy/supplier.service';
import { ConfirmDialogService } from 'src/app/_shared/services/public/confirm-dialog.service';
import { SupplierProduct } from 'src/app/_shared/intefaces/buy/supplier/supplier-product';

@Component({
  selector: 'app-products-added',
  templateUrl: './products-added.component.html',
  styleUrls: ['./products-added.component.css']
})
export class ProductsAddedComponent implements OnInit, AfterViewInit {
  dataSource: ProductsBySupplierDataSource;
  displayedColumns = ['select', 'productName', 'specification', 'categoryName', 'actions'];
  selection = new SelectionModel<ProductBuyList>(true, [], false);
  supplierId: number;

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
    private supplierService: SupplierService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private confirmDialogService: ConfirmDialogService
  ) {}

  ngOnInit() {
    this.supplierId = +this.route.snapshot.params.supplierId;
    this.dataSource = new ProductsBySupplierDataSource(this.supplierService);
    this.dataSource.loadData(this.supplierId, this.pagingParams, this.sortParams);
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
          setTimeout(() => this.selection.clear(), 50);
        })
      )
      .subscribe();
  }

  loadProductsPage() {
    this.pagingParams.pageIndex = this.paginator.pageIndex;
    this.pagingParams.pageSize = this.paginator.pageSize;

    this.sortParams.sortColumn = this.sort.active;
    this.sortParams.sortOrder = this.sort.direction;

    const filter = this.input.nativeElement.value;

    this.dataSource.loadData(this.supplierId, this.pagingParams, this.sortParams, filter);
  }

  DeleteProductFromSupplier(product: ProductBuyList) {
    const dialogRef = this.confirmDialogService.openDialog(`Are you sure to delete ${product.productName}?`);

    dialogRef.afterClosed().subscribe((res: boolean) => {
      if (res) {
        const delEntity = <SupplierProduct>{
          personId: this.supplierId,
          productId: product.productId
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
