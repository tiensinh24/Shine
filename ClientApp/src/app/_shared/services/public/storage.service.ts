import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PagedStorageProducts } from '../../intefaces/public/storage/paged-storage-products';
import { StorageProduct } from '../../intefaces/public/storage/storage-product';
import { StorageProductsList } from '../../intefaces/public/storage/storage-products-list';
import { Storages } from '../../intefaces/public/storage/storages';
import { PagingParams } from '../../intefaces/public/paging-params';
import { SortParams } from '../../intefaces/public/sort-params';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  baseUrl = environment.URL;

  constructor(private http: HttpClient) {}

  getStorages(): Observable<Storages[]> {
    return this.http.get<Storages[]>(`${this.baseUrl}api/storage`);
  }

  getStorage(storageId: number): Observable<Storages> {
    return this.http.get<Storages>(`${this.baseUrl}api/storage/${storageId}`);
  }

  // * StorageProducts

  getLatestImportProducts(storageId: number): Observable<StorageProductsList[]> {
    return this.http.get<StorageProductsList[]>(`${this.baseUrl}api/storage/${storageId}/products/latest-import`);
  }

  getLatestExportProducts(storageId: number): Observable<StorageProductsList[]> {
    return this.http.get<StorageProductsList[]>(`${this.baseUrl}api/storage/${storageId}/products/latest-export`);
  }

  getPagedStorageProducts(
    storageId: number,
    pagingParams: PagingParams,
    sortParams?: SortParams,
    filter = ''
  ): Observable<PagedStorageProducts> {
    let queryParams = new HttpParams()
      .set('pageIndex', `${pagingParams.pageIndex}`)
      .set('pageSize', `${pagingParams.pageSize}`)
      .set('filter', `${filter}`);

    if (sortParams !== undefined) {
      queryParams = queryParams.append('sortColumn', `${sortParams.sortColumn}`);
      queryParams = queryParams.append('sortOrder', `${sortParams.sortOrder}`);
    }

    return this.http.get<PagedStorageProducts>(`${this.baseUrl}api/storage/${storageId}/storage-products/paged`, {
      params: queryParams
    });
  }

  addStorageProduct(storageProduct: StorageProduct): Observable<StorageProduct> {
    return this.http.post<StorageProduct>(
      `${this.baseUrl}api/storage/${storageProduct.storageId}/add-import`,
      storageProduct
    );
  }

  updateStorageProduct(storageProduct: StorageProduct): Observable<StorageProduct> {
    return this.http.put<StorageProduct>(
      `${this.baseUrl}api/storage/${storageProduct.storageId}/storage-products/${storageProduct.id}`,
      storageProduct
    );
  }

  deleteStorageProduct(storageId: number, id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}api/storage/${storageId}/storage-products/${id}`);
  }

  deleteStorageProducts(storageId: number, ids: string[]): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}api/storage/${storageId}/storage-products/list`, {
      headers: { ids: ids }
    });
  }
}
