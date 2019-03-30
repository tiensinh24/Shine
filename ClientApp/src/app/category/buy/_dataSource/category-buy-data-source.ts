import { DataSource } from '@angular/cdk/table';
import { CollectionViewer } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { CategoryBuy } from '../_interfaces/category-buy';
import { CategoryBuyService } from '../_services/category-buy.service';
import { PagingParams } from 'src/app/_shared/_intefaces/paging-params';
import { SortParams } from 'src/app/_shared/_intefaces/sort-params';
import { PagedCategoryBuy } from '../_interfaces/paged-category-buy';
import { Paging } from 'src/app/_shared/_intefaces/paging';

export class CategoryBuyDataSource implements DataSource<CategoryBuy> {
  private categoriesSubject = new BehaviorSubject<CategoryBuy[]>([]);
  private pagingSubject = new BehaviorSubject<Paging>(null);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public isLoading = this.loadingSubject.asObservable();
  public paging = this.pagingSubject.asObservable();
  public data = this.categoriesSubject.asObservable();

  constructor(private categoryBuyService: CategoryBuyService) {}

  connect(collectionViewer: CollectionViewer): Observable<CategoryBuy[]> {
    return this.data;
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.categoriesSubject.complete();
    this.loadingSubject.complete();
  }

  loadCategories(pagingParams: PagingParams, sortParams?: SortParams, filter = '') {
    this.loadingSubject.next(true);

    this.categoryBuyService
      .getPagedCategories(pagingParams, sortParams, filter)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false)),
      )
      .subscribe((res: PagedCategoryBuy) => {
        this.categoriesSubject.next(res.items);
        this.pagingSubject.next(res.paging);
      });
  }
}
