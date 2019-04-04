import { DataSource } from '@angular/cdk/table';
import { CollectionViewer } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { PagingParams } from 'src/app/_shared/_intefaces/paging-params';
import { SortParams } from 'src/app/_shared/_intefaces/sort-params';
import { Paging } from 'src/app/_shared/_intefaces/paging';
import { ProductBuyService } from '../_services/product-buy.service';
import { PagedProductBuy } from '../_interfaces/paged-product-buy';
import { ProductBuyDto } from '../_interfaces/product-buy-dto';

export class ProductBuyDataSource implements DataSource<ProductBuyDto> {
  private productsSubject = new BehaviorSubject<ProductBuyDto[]>([]);
  private pagingSubject = new BehaviorSubject<Paging>(null);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public isLoading = this.loadingSubject.asObservable();
  public paging = this.pagingSubject.asObservable();
  public data = this.productsSubject.asObservable();

  constructor(private productBuyService: ProductBuyService) {}

  connect(collectionViewer: CollectionViewer): Observable<ProductBuyDto[]> {
    return this.data;
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.productsSubject.complete();
    this.pagingSubject.complete();
    this.loadingSubject.complete();
  }

  loadProducts(pagingParams: PagingParams, sortParams?: SortParams, filter = '') {
    this.loadingSubject.next(true);

    this.productBuyService
      .getPagedProducts(pagingParams, sortParams, filter)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false)),
      )
      .subscribe((res: PagedProductBuy) => {
        this.productsSubject.next(res.items);
        this.pagingSubject.next(res.paging);
      });
  }
}
