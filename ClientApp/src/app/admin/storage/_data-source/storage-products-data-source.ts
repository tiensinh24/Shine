import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { TableSource } from 'src/app/_shared/helpers/table-source';
import { StorageProductsList } from 'src/app/_shared/intefaces/public/storage/storage-products-list';
import { StorageService } from 'src/app/_shared/services/public/storage.service';
import { PagingParams } from 'src/app/_shared/intefaces/public/paging-params';
import { SortParams } from 'src/app/_shared/intefaces/public/sort-params';
import { PagedStorageProducts } from 'src/app/_shared/intefaces/public/storage/paged-storage-products';

export class StorageProductsDataSource extends TableSource<StorageProductsList> {
  constructor(private storageService: StorageService) {
    super();
  }

  loadData(storageId: number, pagingParams: PagingParams, sortParams?: SortParams, filter = '') {
    this.loadingSubject.next(true);

    this.storageService
      .getPagedStorageProducts(storageId, pagingParams, sortParams, filter)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((res: PagedStorageProducts) => {
        this.dataSubject.next(res.items);
        this.pagingSubject.next(res.paging);
      });
  }
}
