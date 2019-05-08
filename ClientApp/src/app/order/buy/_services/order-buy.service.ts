import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagingParams } from 'src/app/_shared/_intefaces/paging-params';
import { SortParams } from 'src/app/_shared/_intefaces/sort-params';
import { environment } from 'src/environments/environment';
import { OrderBuy } from '../_interfaces/order-buy';
import { OrderBuyDetail } from '../_interfaces/order-buy-detail';
import { OrderBuyList } from '../_interfaces/order-buy-list';
import { OrderBuyProducts } from '../_interfaces/order-buy-products';
import { OrderBuyWithDetailsToAddDto } from '../_interfaces/order-buy-with-details-to-add-dto';
import { PagedOrderBuy } from '../_interfaces/paged-order-buy';
import { ProductOrder } from '../_interfaces/product-order';

@Injectable({
  providedIn: 'root'
})
export class OrderBuyService {
  baseUrl = environment.URL;

  constructor(private http: HttpClient) {}

  getOrders(): Observable<OrderBuyList[]> {
    return this.http.get<OrderBuyList[]>(`${this.baseUrl}api/orderBuy/`);
  }

  getOrderDetail(orderId: number): Observable<OrderBuyDetail> {
    return this.http.get<OrderBuyDetail>(`${this.baseUrl}api/orderBuy/${orderId}`);
  }

  getPagedOrders(pagingParams: PagingParams, sortParams?: SortParams, filter = ''): Observable<PagedOrderBuy> {
    let queryParams = new HttpParams()
      .set('pageIndex', `${pagingParams.pageIndex}`)
      .set('pageSize', `${pagingParams.pageSize}`)
      .set('filter', `${filter}`);

    if (sortParams !== undefined) {
      queryParams = queryParams.append('sortColumn', `${sortParams.sortColumn}`);
      queryParams = queryParams.append('sortOrder', `${sortParams.sortOrder}`);
    }

    return this.http.get<PagedOrderBuy>(`${this.baseUrl}api/orderBuy/paged`, { params: queryParams });
  }

  addOrder(orderBuy: OrderBuy): Observable<OrderBuyList> {
    return this.http.post<OrderBuyList>(`${this.baseUrl}api/orderBuy/`, orderBuy);
  }

  updateOrder(orderbuy: OrderBuy): Observable<OrderBuyList> {
    return this.http.put<OrderBuyList>(`${this.baseUrl}api/orderBuy/`, orderbuy);
  }

  deleteOrder(orderId: number): Observable<number> {
    return this.http.delete<number>(this.baseUrl + 'api/orderBuy/' + orderId);
  }

  deleteOrders(idList: string[]): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}api/orderBuy/delete-all`, { headers: { ids: idList } });
  }

  // *ProductOrder
  getProductDetailByOrder(orderId: number): Observable<OrderBuyProducts[]> {
    return this.http.get<OrderBuyProducts[]>(`${this.baseUrl}api/orderBuy/${orderId}/details`);
  }

  addOrderWithDetails(orderWithDetails: OrderBuyWithDetailsToAddDto) {
    return this.http.post(`${this.baseUrl}api/orderBuy/addWithDetails/`, orderWithDetails);
  }

  addProductOrder(productOrder: ProductOrder): Observable<OrderBuyProducts> {
    return this.http.post<OrderBuyProducts>(`${this.baseUrl}api/orderBuy/addProduct/`, productOrder);
  }

  addProductsOrder(productsOrder: OrderBuyProducts[]): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}api/orderBuy/addProducts/`, productsOrder);
  }

  deleteProductOrder(orderId: number, productId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}api/orderBuy/${orderId}/delete/${productId}`);
  }
}
