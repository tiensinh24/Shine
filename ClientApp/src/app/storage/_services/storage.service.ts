import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
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
}
