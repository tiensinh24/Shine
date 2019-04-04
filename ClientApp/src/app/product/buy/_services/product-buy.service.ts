import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


import { ProductBuyDto } from '../_interfaces/product-buy-dto';
import { ProductBuy } from '../_interfaces/product-buy';
import { environment } from 'src/environments/environment';
import { PagingParams } from 'src/app/_shared/_intefaces/paging-params';
import { SortParams } from 'src/app/_shared/_intefaces/sort-params';
import { PagedProductBuy } from '../_interfaces/paged-product-buy';



@Injectable({
  providedIn: 'root'
})
export class ProductBuyService {
  baseUrl = environment.URL;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<ProductBuyDto[]> {
    return this.http.get<ProductBuyDto[]>(this.baseUrl + 'api/productBuy/');
  }

  getProduct(id: number): Observable<ProductBuy> {
    return this.http.get<ProductBuy>(this.baseUrl + 'api/productBuy/' + id);
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

    return this.http.get<PagedProductBuy>(`${this.baseUrl}api/productBuy/Paged`, { params: queryParams });
  }

  addProduct(productBuy: ProductBuy): Observable<ProductBuy> {
    return this.http.post<ProductBuy>(this.baseUrl + 'api/productBuy/', productBuy);
  }

  updateProduct(productBuy: ProductBuy): Observable<ProductBuy> {
    return this.http.put<ProductBuy>(this.baseUrl + 'api/productBuy/', productBuy);
  }

  deleteProduct(id: number): Observable<number> {
    return this.http.delete<number>(this.baseUrl + 'api/productBuy/' + id);
  }
}
