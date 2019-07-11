import { fromEvent, merge, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
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
import { ProductsBySupplier } from 'src/app/_shared/intefaces/buy/supplier/products-by-supplier';
import { PagedProductBuy } from 'src/app/_shared/intefaces/buy/product/paged-product-buy';

@Component({
  selector: 'app-supplier-products-added',
  templateUrl: './supplier-products-added.component.html',
  styleUrls: ['./supplier-products-added.component.css']
})
export class SupplierProductsAddedComponent implements OnInit, AfterViewInit, OnDestroy {
  // Subscriptions
  products$ = new Subscription();

  // Variables
  loading = true;
  products = <PagedProductBuy>{};

  supplierId = +this.route.snapshot.params.supplierId;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('input', { static: true }) input: ElementRef;

  pagingParams = <PagingParams>{
    pageIndex: 0,
    pageSize: 8
  };

  sortParams = <SortParams>{
    sortColumn: '',
    sortOrder: ''
  };

  constructor(private supplierService: SupplierService, private route: ActivatedRoute, private snackBar: MatSnackBar, private confirmDialogService: ConfirmDialogService) {}

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.loadProductsPage();
    // // Server-side search
    // fromEvent(this.input.nativeElement, 'keyup')
    //   .pipe(
    //     debounceTime(250),
    //     distinctUntilChanged(),
    //     tap(() => {
    //       this.paginator.pageIndex = 0;
    //       this.loadProductsPage();
    //     })
    //   )
    //   .subscribe();

    // // reset the paginator after sorting
    // this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    // // on sort or paginate events, load a new page
    // merge(this.sort.sortChange, this.paginator.page)
    //   .pipe(
    //     tap(() => {
    //       this.loadProductsPage();
    //     })
    //   )
    //   .subscribe();
  }

  ngOnDestroy() {
    this.products$.unsubscribe();
  }

  loadProductsPage() {
    // this.pagingParams.pageIndex = this.paginator.pageIndex;
    // this.pagingParams.pageSize = this.paginator.pageSize;

    // this.sortParams.sortColumn = this.sort.active;
    // this.sortParams.sortOrder = this.sort.direction;

    // const filter = this.input.nativeElement.value;

    this.products$ = this.supplierService.getPagedProducts(this.supplierId, this.pagingParams, this.sortParams).subscribe((res: PagedProductBuy) => {
      this.products = res;
      this.loading = false;
    });
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
}
