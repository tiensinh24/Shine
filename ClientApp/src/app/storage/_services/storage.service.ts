import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
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

  addStorageProduct(storageProduct: StorageProduct): Observable<StorageProduct> {
    return this.http.post<StorageProduct>(
      `${this.baseUrl}api/storage/${storageProduct.storageId}/product`,
      storageProduct
    );
  }

  addStorageProducts(storageProducts: StorageProduct[]): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(
      `${this.baseUrl}api/storage/${storageProducts[0].storageId}/products`,
      storageProducts
    );
  }
}
