import { Component, Input, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ProductBuy } from 'src/app/_shared/intefaces/buy/product/product-buy';
import { SupplierService } from 'src/app/_shared/services/buy/supplier.service';
import { ConfirmDialogService } from 'src/app/_shared/services/public/confirm-dialog.service';
import { SupplierProduct } from 'src/app/_shared/intefaces/buy/supplier/supplier-product';
import { PagingParams } from 'src/app/_shared/intefaces/public/paging-params';
import { SortParams } from 'src/app/_shared/intefaces/public/sort-params';
import { PagedProductsBySupplier } from 'src/app/_shared/intefaces/buy/supplier/paged-products-by-supplier';
import { ProductsBySupplier } from 'src/app/_shared/intefaces/buy/supplier/products-by-supplier';
import { Subscription, fromEvent, merge } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { debounceTime, tap, distinctUntilChanged } from 'rxjs/operators';

interface ProductsNotAdded {
  category: string;
  products?: ProductBuy[];
}

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

  constructor(private supplierService: SupplierService, private route: ActivatedRoute, private confirmService: ConfirmDialogService, private snackBar: MatSnackBar) {}

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

  onAdd(product: ProductBuy) {}
}
