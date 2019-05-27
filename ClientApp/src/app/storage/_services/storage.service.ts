import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagingParams } from 'src/app/_shared/_intefaces/paging-params';
import { SortParams } from 'src/app/_shared/_intefaces/sort-params';
import { environment } from 'src/environments/environment';
import { PagedStorageProducts } from '../_interfaces/paged-storage-products';
import { StorageProduct } from '../_interfaces/storage-product';
import { StorageProductsList } from '../_interfaces/storage-products-list';
import { Storages } from '../_interfaces/storages';

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
