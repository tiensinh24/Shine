import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { TableSource } from 'src/app/_shared/_helpers/table-source';
import { PagingParams } from 'src/app/_shared/_intefaces/paging-params';
import { SortParams } from 'src/app/_shared/_intefaces/sort-params';
import { PagedStorageProducts } from '../_interfaces/paged-storage-products';
import { StorageProductsList } from '../_interfaces/storage-products-list';
import { StorageService } from '../_services/storage.service';

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
