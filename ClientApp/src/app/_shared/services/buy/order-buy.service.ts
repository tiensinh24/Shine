
import { OrderBuy } from '../../intefaces/buy/order/order-buy';
import { OrderBuyDetail } from '../../intefaces/buy/order/order-buy-detail';
import { OrderBuyList } from '../../intefaces/buy/order/order-buy-list';
import { OrderBuyProducts } from '../../intefaces/buy/order/order-buy-products';
import { OrderBuyWithNavigations } from '../../intefaces/buy/order/order-buy-with-details-to-add-dto';
import { PagedOrderBuy } from '../../intefaces/buy/order/paged-order-buy';
import { ProductOrder } from '../../intefaces/buy/order/product-order';
import { OrderValue } from '../../intefaces/public/order-value';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductSelect } from 'src/app/_shared/intefaces/public/product-select';
import { environment } from 'src/environments/environment';
import { PagingParams } from '../../intefaces/public/paging-params';
import { SortParams } from '../../intefaces/public/sort-params';
import { OrderBuyQuery } from '../../intefaces/buy/order/query/order-buy-query';
import { OrderAndCostPerMonth } from '../../intefaces/buy/order/report/order-and-cost-per-month';
import { OrderAndCostPerQuarter } from '../../intefaces/buy/order/report/order-and-cost-per-quarter';
import { OrderBuyLatest } from '../../intefaces/buy/order/report/order-buy-latest';

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

  getOrderAndCostPerQuarter(year: number): Observable<OrderAndCostPerQuarter[]> {
    const url = `${this.baseUrl}api/orderBuy/order-and-cost-per-quarter?year=${year}`;

    return this.http.get<OrderAndCostPerQuarter[]>(url);
  }

  getLatestOrder(): Observable<OrderBuyLatest> {
    return this.http.get<OrderBuyLatest>(`${this.baseUrl}api/orderBuy/latest`);
  }

  getTotalOrderDebt(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}api/orderBuy/total-debt`);
  }

  getTopOrderValue(numRows: number, year: number, month: number, type: string): Observable<OrderValue[]> {
    const queryParams = new HttpParams()
      .set('numRows', `${numRows}`)
      .set('year', `${year}`)
      .set('month', `${month}`)
      .set('type', `${type}`);

    return this.http.get<OrderValue[]>(`${this.baseUrl}api/orderBuy/top-value`, { params: queryParams });
  }
}
