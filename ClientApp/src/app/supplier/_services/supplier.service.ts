import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SupplierList } from '../_interfaces/supplier-list';
import { Supplier } from '../_interfaces/supplier';
import { ProductsBySupplier } from '../_interfaces/supplier-products-list';
import { SupplierProduct } from '../_interfaces/supplier-product';
import { ProductBuyList } from 'src/app/product/buy/_interfaces/product-buy-list';
import { PagingParams } from 'src/app/_shared/_intefaces/paging-params';
import { SortParams } from 'src/app/_shared/_intefaces/sort-params';
import { PagedSupplier } from '../_interfaces/paged-supplier';
import { PagedProductBuy } from 'src/app/product/buy/_interfaces/paged-product-buy';
import { SupplierDetail } from '../_interfaces/supplier-detail';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  baseUrl = environment.URL;

  constructor(private http: HttpClient) {}

  getSuppliers(): Observable<SupplierList[]> {
    return this.http.get<SupplierList[]>(`${this.baseUrl}api/supplier/`);
  }

  getPagedSuppliers(pagingParams: PagingParams, sortParams?: SortParams, filter = ''): Observable<PagedSupplier> {
    let queryParams = new HttpParams()
      .set('pageIndex', `${pagingParams.pageIndex}`)
      .set('pageSize', `${pagingParams.pageSize}`)
      .set('filter', `${filter}`);

    if (sortParams !== undefined) {
      queryParams = queryParams.append('sortColumn', `${sortParams.sortColumn}`);
      queryParams = queryParams.append('sortOrder', `${sortParams.sortOrder}`);
    }

    return this.http.get<PagedSupplier>(`${this.baseUrl}api/supplier/paged`, { params: queryParams });
  }

  getSupplier(id: number): Observable<SupplierDetail> {
    return this.http.get<SupplierDetail>(`${this.baseUrl}api/supplier/${id}`);
  }

  addSupplier(supplier: Supplier): Observable<SupplierList> {
    return this.http.post<SupplierList>(`${this.baseUrl}api/supplier/`, supplier);
  }

  updateSupplier(supplier: Supplier): Observable<SupplierList> {
    return this.http.put<SupplierList>(`${this.baseUrl}api/supplier/`, supplier);
  }

  deleteSupplier(id: number): Observable<number> {
    return this.http.delete<number>(`${this.baseUrl}api/supplier/${id}`);
  }

  deleteSuppliers(idList: string[]): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}api/supplier/delete-all`, { headers: { ids: idList } });
  }

  // *SupplierProduct

  getProductsBySupplier(supplierId: number): Observable<ProductBuyList[]> {
    return this.http.get<ProductBuyList[]>(`${this.baseUrl}api/supplier/${supplierId}/products/`);
  }

  getSupplierProducts(): Observable<ProductsBySupplier[]> {
    return this.http.get<ProductsBySupplier[]>(`${this.baseUrl}api/supplier/products/`);
  }

  getPagedProductsBySupplier(
    supplierId: number,
    pagingParams: PagingParams,
    sortParams?: SortParams,
    filter = ''
  ): Observable<PagedProductBuy> {
    let queryParams = new HttpParams()
      .set('supplierId', `${supplierId}`)
      .set('pageIndex', `${pagingParams.pageIndex}`)
      .set('pageSize', `${pagingParams.pageSize}`)
      .set('filter', `${filter}`);

    if (sortParams !== undefined) {
      queryParams = queryParams.append('sortColumn', `${sortParams.sortColumn}`);
      queryParams = queryParams.append('sortOrder', `${sortParams.sortOrder}`);
    }

    return this.http.get<PagedProductBuy>(`${this.baseUrl}api/supplier/${supplierId}/paged-products`, {
      params: queryParams
    });
  }

  getProductsNotAdded(supplierId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}api/supplier/${supplierId}/products-not-added`);
  }

  addSupplierProduct(suppro: SupplierProduct): Observable<SupplierProduct> {
    return this.http.post<SupplierProduct>(`${this.baseUrl}api/supplier/product/`, suppro);
  }

  deleteSupplierProduct(supprod: SupplierProduct): Observable<SupplierProduct> {
    return this.http.request<SupplierProduct>('delete', `${this.baseUrl}api/supplier/product/`, { body: supprod });
  }
}
