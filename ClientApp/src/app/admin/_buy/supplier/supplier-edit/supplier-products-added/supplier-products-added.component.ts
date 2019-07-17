import { Subscription, fromEvent } from 'rxjs';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ProductBuyList } from 'src/app/_shared/intefaces/buy/product/product-buy-list';
import { PagingParams } from 'src/app/_shared/intefaces/public/paging-params';
import { SortParams } from 'src/app/_shared/intefaces/public/sort-params';
import { SupplierService } from 'src/app/_shared/services/buy/supplier.service';
import { ConfirmDialogService } from 'src/app/_shared/services/public/confirm-dialog.service';
import { SupplierProduct } from 'src/app/_shared/intefaces/buy/supplier/supplier-product';
import { PagedProductBuy } from 'src/app/_shared/intefaces/buy/product/paged-product-buy';
import { debounceTime, tap, distinctUntilChanged } from 'rxjs/operators';
import { ProductsBySupplier } from 'src/app/_shared/intefaces/buy/supplier/products-by-supplier';

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
  filter = '';

  // boolean
  isAddProduct = false;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild('input', { static: false }) input: ElementRef;

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
    this.getProducts();
  }

  ngAfterViewInit(): void {
    this.getProducts();
    // Server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(250),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.filter = this.input.nativeElement.value;
          this.getProducts();
        })
      )
      .subscribe();

    this.paginator.page
      .pipe(
        tap(() => {
          this.pagingParams.pageIndex = this.paginator.pageIndex;
          this.pagingParams.pageSize = this.paginator.pageSize;
          this.getProducts();
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.products$.unsubscribe();
  }

  getProducts() {
    this.products$ = this.supplierService
      .getPagedProducts(this.supplierId, this.pagingParams, this.sortParams, this.filter)
      .subscribe((res: PagedProductBuy) => {
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
          this.getProducts();
        });
        this.snackBar.open(`${product.productName} deleted`, 'Success');
      }
    });
  }

  addProduct(product: ProductsBySupplier) {
    this.products.items.unshift(product);
  }

  removeProduct(product: ProductsBySupplier) {
    const productToRemove = <SupplierProduct>{
      personId: this.supplierId,
      productId: product.productId
    };

    this.supplierService.deleteSupplierProduct(productToRemove).subscribe((res: SupplierProduct) => {
      if (res) {
        // Remove product
        const index = this.products.items.findIndex(p => p.productId === product.productId);

        this.products.items.splice(index, 1);

        this.snackBar.open(`${product.productName} has been removed`, 'Success');
      } else {
        this.snackBar.open(`Can't remove ${product.productName}, please try again`, 'Error');
      }
    });
  }

  toggleAddProduct() {
    this.isAddProduct = !this.isAddProduct;
    console.log(this.isAddProduct);
  }

  closeAddProduct(event: boolean) {
    this.isAddProduct = event;
  }
}
