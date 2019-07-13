import { Component, Input, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SupplierService } from 'src/app/_shared/services/buy/supplier.service';
import { SupplierProduct } from 'src/app/_shared/intefaces/buy/supplier/supplier-product';
import { PagingParams } from 'src/app/_shared/intefaces/public/paging-params';
import { SortParams } from 'src/app/_shared/intefaces/public/sort-params';
import { PagedProductsBySupplier } from 'src/app/_shared/intefaces/buy/supplier/paged-products-by-supplier';
import { Subscription, fromEvent } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { debounceTime, tap, distinctUntilChanged } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductsBySupplier } from 'src/app/_shared/intefaces/buy/supplier/products-by-supplier';

@Component({
  selector: 'app-supplier-products-not-added',
  templateUrl: './supplier-products-not-added.component.html',
  styleUrls: ['./supplier-products-not-added.component.css']
})
export class SupplierProductsNotAddedComponent implements OnInit, AfterViewInit, OnDestroy {
  // Subscriptions
  products$ = new Subscription();

  // Variables
  products: PagedProductsBySupplier;
  loading = true;

  // Output
  @Output() newProduct = new EventEmitter<ProductsBySupplier>();
  @Output() isAddProduct = new EventEmitter<boolean>();

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild('input', { static: false }) input: ElementRef;

  supplierId = +this.route.snapshot.params.supplierId;
  filter = '';

  pagingParams = <PagingParams>{
    pageIndex: 0,
    pageSize: 10
  };

  sortParams = <SortParams>{
    sortColumn: '',
    sortOrder: ''
  };

  @Input() title: string;

  constructor(private supplierService: SupplierService, private route: ActivatedRoute, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getProductsNotAdded();
  }

  ngAfterViewInit(): void {
    // Server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(250),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.filter = this.input.nativeElement.value;
          this.getProductsNotAdded();
        })
      )
      .subscribe();

    this.paginator.page
      .pipe(
        tap(() => {
          this.pagingParams.pageIndex = this.paginator.pageIndex;
          this.pagingParams.pageSize = this.paginator.pageSize;
          this.getProductsNotAdded();
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.products$.unsubscribe();
  }

  getProductsNotAdded() {
    this.supplierService.getPagedProductsNotAdded(this.supplierId, this.pagingParams, this.sortParams, this.filter).subscribe((res: PagedProductsBySupplier) => {
      this.products = res;
      this.loading = false;
    });
  }

  addProduct(product: ProductsBySupplier) {
    const productToAdd = <SupplierProduct>{
      personId: this.supplierId,
      productId: product.productId
    };

    this.supplierService.addSupplierProduct(productToAdd).subscribe((res: boolean) => {
      if (res) {
        // Remove added product
        const index = this.products.items.findIndex(p => p.productId == productToAdd.productId);
        this.products.items.splice(index, 1);

        // output new product
        this.outNewProduct(product);

        this.snackBar.open(`${product.productName} has been added`, 'Success');
      }
    });
  }

  outNewProduct(product: ProductsBySupplier) {
    this.newProduct.emit(product);
  }

  outIsAddProduct() {
    this.isAddProduct.emit(false);
  }
}
