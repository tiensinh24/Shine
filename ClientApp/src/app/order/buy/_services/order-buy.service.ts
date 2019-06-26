import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagingParams } from 'src/app/_shared/_intefaces/paging-params';
import { SortParams } from 'src/app/_shared/_intefaces/sort-params';
import { ProductSelect } from 'src/app/product/_interfaces/product-select';
import { environment } from 'src/environments/environment';
import { OrderBuy } from '../_interfaces/order-buy';
import { OrderBuyDetail } from '../_interfaces/order-buy-detail';
import { OrderBuyList } from '../_interfaces/order-buy-list';
import { OrderBuyProducts } from '../_interfaces/order-buy-products';
import { OrderBuyWithNavigations } from '../_interfaces/order-buy-with-details-to-add-dto';
import { PagedOrderBuy } from '../_interfaces/paged-order-buy';
import { ProductOrder } from '../_interfaces/product-order';
import { OrderBuyQuery } from '../_interfaces/_query/order-buy-query';
import { OrderAndCostPerMonth } from '../_interfaces/_reports/order-and-cost-per-month';

function isEmpty(obj) {
  for (const x in obj) {
    return false;
  }
  return true;
}

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
    return this.http.get<OrderBuyDetail>(`${this.baseUrl}api/orderBuy/${orderId}/detail`);
  }

  getPagedOrders(pagingParams: PagingParams, sortParams?: SortParams, queryParams?: OrderBuyQuery, filter = ''): Observable<PagedOrderBuy> {
    let httpParams = new HttpParams()
      .set('pageIndex', `${pagingParams.pageIndex}`)
      .set('pageSize', `${pagingParams.pageSize}`)
      .set('filter', `${filter}`);

    if (!isEmpty(sortParams)) {
      httpParams = httpParams.append('sortColumn', `${sortParams.sortColumn}`);
      httpParams = httpParams.append('sortOrder', `${sortParams.sortOrder}`);
    }

    if (!isEmpty(queryParams)) {
      httpParams = httpParams.append('supplierId', `${queryParams.supplierId}`);
      httpParams = httpParams.append('employeeId', `${queryParams.employeeId}`);
      httpParams = httpParams.append('fromDate', `${queryParams.fromDate}`);
      httpParams = httpParams.append('toDate', `${queryParams.toDate}`);
    }

    return this.http.get<PagedOrderBuy>(`${this.baseUrl}api/orderBuy/paged`, {
      params: httpParams
    });
  }

  addOrder(orderWithDetails: OrderBuyWithNavigations): Observable<HttpResponse<OrderBuyWithNavigations>> {
    return this.http.post<HttpResponse<OrderBuyWithNavigations>>(`${this.baseUrl}api/orderBuy/`, orderWithDetails);
  }

  updateOrder(orderbuy: OrderBuy): Observable<OrderBuyList> {
    return this.http.put<OrderBuyList>(`${this.baseUrl}api/orderBuy/`, orderbuy);
  }

  deleteOrder(orderId: number): Observable<number> {
    return this.http.delete<number>(this.baseUrl + 'api/orderBuy/' + orderId);
  }

  deleteOrders(idList: string[]): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}api/orderBuy/delete-all`, {
      headers: { ids: idList }
    });
  }

  // *LineItems

  getProductsNotAddedToOrderBySupplierSelect(orderId: number, supplierId: number): Observable<ProductSelect[]> {
    return this.http.get<ProductSelect[]>(`${this.baseUrl}api/orderBuy/${orderId}/products-not-added-by-supplier-${supplierId}/select`);
  }

  addOrderProduct(productOrder: ProductOrder): Observable<OrderBuyProducts> {
    return this.http.post<OrderBuyProducts>(`${this.baseUrl}api/orderBuy/${productOrder.orderId}/add-item/`, productOrder);
  }

  addOrderProducts(productsOrder: ProductOrder[]): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}api/orderBuy/${productsOrder[0].orderId}/add-items/`, productsOrder);
  }

  updateOrderProduct(productOrder: ProductOrder): Observable<OrderBuyProducts> {
    return this.http.put<OrderBuyProducts>(
      `${this.baseUrl}api/orderBuy/${productOrder.orderId}/products/${productOrder.productId}`,
      productOrder
    );
  }

  deleteOrderProduct(orderId: number, productId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}api/orderBuy/${orderId}/delete/${productId}`);
  }

  // *Reports
  getOrdersSum(year: number, month?: number): Observable<number> {
    let url = `${this.baseUrl}api/orderBuy/value-total?year=${year}`;

    if (month > 0) {
      url += `&month=${month}`;
    }

    return this.http.get<number>(url);
  }

  getOrdersCostSum(year: number, month?: number): Observable<number> {
    let url = `${this.baseUrl}api/orderBuy/cost-total?year=${year}`;

    if (month > 0) {
      url += `&month=${month}`;
    }

    return this.http.get<number>(url);
  }

  getOrdersCount(year: number, month?: number): Observable<number> {
    let url = `${this.baseUrl}api/orderBuy/count?year=${year}`;

    if (month > 0) {
      url += `&month=${month}`;
    }

    return this.http.get<number>(url);
  }

  getOrderAndCostPerMonth(year: number): Observable<OrderAndCostPerMonth[]> {
    const url = `${this.baseUrl}api/orderBuy/order-and-cost-per-month?year=${year}`;

    return this.http.get<OrderAndCostPerMonth[]>(url);
  }
}
