import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSnackBar, MatSort } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { PagingParams } from 'src/app/_shared/_intefaces/paging-params';
import { SortParams } from 'src/app/_shared/_intefaces/sort-params';
import { ConfirmDialogService } from 'src/app/_shared/_services/confirm-dialog.service';
import { ProductBuyList } from 'src/app/product/buy/_interfaces/product-buy-list';
import { ProductsBySupplierDataSource } from 'src/app/supplier/_data-source/products-by-supplier-data-source';
import { SupplierProduct } from '../../_interfaces/supplier-product';
import { SupplierService } from '../../_services/supplier.service';



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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

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
