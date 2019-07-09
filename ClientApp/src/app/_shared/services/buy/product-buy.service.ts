import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { PagedProductBuyRemain } from '../../intefaces/buy/product/paged-product-buy-remain';
import { ProductBuy } from '../../intefaces/buy/product/product-buy';
import { ProductBuyDetail } from '../../intefaces/buy/product/product-buy-detail';
import { ProductStorageRemain } from '../../intefaces/public/product-storage-remain';
import { ProductBuyList } from '../../intefaces/buy/product/product-buy-list';
import { PagingParams } from '../../intefaces/public/paging-params';
import { SortParams } from '../../intefaces/public/sort-params';
import { PagedProductBuy } from '../../intefaces/buy/product/paged-product-buy';

@Injectable({
  providedIn: 'root'
})
export class ProductBuyService {
  baseUrl = environment.URL;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<ProductBuyList[]> {
    return this.http.get<ProductBuyList[]>(this.baseUrl + 'api/productBuy/');
  }

  getProduct(productId: number): Observable<ProductBuyDetail> {
    return this.http.get<ProductBuyDetail>(this.baseUrl + 'api/productBuy/' + productId);
  }

  getPagedProducts(pagingParams: PagingParams, sortParams?: SortParams, filter = ''): Observable<PagedProductBuy> {
    let queryParams = new HttpParams()
      .set('pageIndex', `${pagingParams.pageIndex}`)
      .set('pageSize', `${pagingParams.pageSize}`)
      .set('filter', `${filter}`);

    if (sortParams !== undefined) {
      queryParams = queryParams.append('sortColumn', `${sortParams.sortColumn}`);
      queryParams = queryParams.append('sortOrder', `${sortParams.sortOrder}`);
    }

    return this.http.get<PagedProductBuy>(`${this.baseUrl}api/productBuy/paged`, { params: queryParams });
  }

  addProduct(productBuy: ProductBuy): Observable<ProductBuy> {
    return this.http.post<ProductBuy>(this.baseUrl + 'api/productBuy/', productBuy);
  }

  updateProduct(productBuy: ProductBuy): Observable<ProductBuy> {
    return this.http.put<ProductBuy>(this.baseUrl + 'api/productBuy/', productBuy);
  }

  deleteProduct(productId: number): Observable<number> {
    return this.http.delete<number>(this.baseUrl + 'api/productBuy/' + productId);
  }

  deleteProducts(idList: string[]): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}api/productBuy/delete-all`, { headers: { ids: idList } });
  }

  // *ProductStorage

  getPagedProductRemains(
    pagingParams: PagingParams,
    sortParams?: SortParams,
    filter = ''
  ): Observable<PagedProductBuyRemain> {
    let queryParams = new HttpParams()
      .set('pageIndex', `${pagingParams.pageIndex}`)
      .set('pageSize', `${pagingParams.pageSize}`)
      .set('filter', `${filter}`);

    if (sortParams !== undefined) {
      queryParams = queryParams.append('sortColumn', `${sortParams.sortColumn}`);
      queryParams = queryParams.append('sortOrder', `${sortParams.sortOrder}`);
    }

    return this.http.get<PagedProductBuyRemain>(`${this.baseUrl}api/productBuy/remain/paged`, { params: queryParams });
  }

  getProductRemainPerStorages(productId: number): Observable<ProductStorageRemain[]> {
    return this.http.get<ProductStorageRemain[]>(`${this.baseUrl}api/productBuy/${productId}/storage/remain`);
  }
}
