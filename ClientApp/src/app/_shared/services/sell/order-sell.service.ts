import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { OrderSellList } from "../../intefaces/sell/order/order-sell-list";
import { Observable } from "rxjs";
import { OrderSellDetail } from "../../intefaces/sell/order/order-sell-detail";
import { PagingParams } from "../../intefaces/public/paging-params";
import { SortParams } from "../../intefaces/public/sort-params";
import { OrderSellQuery } from "../../intefaces/sell/order/query/order-sell-query";
import { PagedOrderSell } from "../../intefaces/sell/order/paged-order-sell";
import { OrderSellWithNavigations } from "../../intefaces/sell/order/order-sell-with-details-to-add-dto";
import { OrderSell } from "../../intefaces/sell/order/order-sell";
import { ProductOrder } from "../../intefaces/public/order/product-order";
import { OrderSellProducts } from "../../intefaces/sell/order/order-sell-products";
import { OrderAndCostPerMonth } from "../../intefaces/public/order/order-and-cost-per-month";
import { OrderAndCostPerQuarter } from "../../intefaces/public/order/order-and-cost-per-quarter";
import { OrderSellLatest } from "../../intefaces/sell/order/report/order-sell-latest";
import { OrderValue } from "../../intefaces/public/order-value";

function isEmpty(obj) {
  for (const i in obj) {
    return false;
  }
  return true;
}

@Injectable({
  providedIn: "root"
})
export class OrderSellService {
  baseUrl = environment.URL;

  constructor(private http: HttpClient) {}

  getOrders(): Observable<OrderSellList[]> {
    return this.http.get<OrderSellList[]>(`${this.baseUrl}api/orderSell/`);
  }

  getOrderDetail(orderId: number): Observable<OrderSellDetail> {
    return this.http.get<OrderSellDetail>(
      `${this.baseUrl}api/orderSell/${orderId}/detail`
    );
  }

  getPagedOrders(
    pagingParams: PagingParams,
    sortParams?: SortParams,
    queryParams?: OrderSellQuery,
    filter = ""
  ): Observable<PagedOrderSell> {
    let httpParams = new HttpParams()
      .set("pageIndex", `${pagingParams.pageIndex}`)
      .set("pageSize", `${pagingParams.pageSize}`)
      .set("filter", `${filter}`);

    if (!isEmpty(sortParams)) {
      httpParams = httpParams.append("sortColumn", `${sortParams.sortColumn}`);
      httpParams = httpParams.append("sortOrder", `${sortParams.sortOrder}`);
    }

    if (!isEmpty(queryParams)) {
      httpParams = httpParams.append("customerId", `${queryParams.customerId}`);
      httpParams = httpParams.append("employeeId", `${queryParams.employeeId}`);
      httpParams = httpParams.append("fromDate", `${queryParams.fromDate}`);
      httpParams = httpParams.append("toDate", `${queryParams.toDate}`);
    }

    return this.http.get<PagedOrderSell>(`${this.baseUrl}api/orderSell/paged`, {
      params: httpParams
    });
  }

  isOrderNumberExist(orderNumber: string): Observable<boolean> {
    const httpParams = new HttpParams().set("orderNumber", `${orderNumber}`);

    return this.http.get<boolean>(
      `${this.baseUrl}api/orderSell/is-order-number-exist`,
      { params: httpParams }
    );
  }

  addOrder(
    orderWithDetails: OrderSellWithNavigations
  ): Observable<OrderSellWithNavigations> {
    return this.http.post<OrderSellWithNavigations>(
      `${this.baseUrl}api/orderSell/`,
      orderWithDetails
    );
  }

  updateOrder(orderSell: OrderSell): Observable<OrderSell> {
    return this.http.put<OrderSell>(`${this.baseUrl}api/orderSell/`, orderSell);
  }

  deleteOrder(orderId: number): Observable<number> {
    return this.http.delete<number>(this.baseUrl + "api/orderSell/" + orderId);
  }

  deleteOrders(idList: string[]): Observable<boolean> {
    return this.http.delete<boolean>(
      `${this.baseUrl}api/orderSell/delete-all`,
      {
        headers: { ids: idList }
      }
    );
  }

  // *LineItems

  addOrderProduct(productOrder: ProductOrder): Observable<OrderSellProducts> {
    return this.http.post<OrderSellProducts>(
      `${this.baseUrl}api/orderSell/${productOrder.orderId}/add-item/`,
      productOrder
    );
  }

  addOrderProducts(productsOrder: ProductOrder[]): Observable<void> {
    return this.http.post<void>(
      `${this.baseUrl}api/orderSell/${productsOrder[0].orderId}/add-items/`,
      productsOrder
    );
  }

  updateOrderProduct(
    productOrder: ProductOrder
  ): Observable<OrderSellProducts> {
    return this.http.put<OrderSellProducts>(
      `${this.baseUrl}api/orderSell/${productOrder.orderId}/products/${
        productOrder.productId
      }`,
      productOrder
    );
  }

  deleteOrderProduct(orderId: number, productId: number): Observable<boolean> {
    return this.http.delete<boolean>(
      `${this.baseUrl}api/orderSell/${orderId}/delete/${productId}`
    );
  }

  // *Reports
  getOrdersSum(year: number, month?: number): Observable<number> {
    let url = `${this.baseUrl}api/orderSell/value-total?year=${year}`;

    if (month > 0) {
      url += `&month=${month}`;
    }

    return this.http.get<number>(url);
  }

  getOrdersCostSum(year: number, month?: number): Observable<number> {
    let url = `${this.baseUrl}api/orderSell/cost-total?year=${year}`;

    if (month > 0) {
      url += `&month=${month}`;
    }

    return this.http.get<number>(url);
  }

  getOrdersCount(year: number, month?: number): Observable<number> {
    let url = `${this.baseUrl}api/orderSell/count?year=${year}`;

    if (month > 0) {
      url += `&month=${month}`;
    }

    return this.http.get<number>(url);
  }

  getOrderAndCostPerMonth(year: number): Observable<OrderAndCostPerMonth[]> {
    const url = `${
      this.baseUrl
    }api/orderSell/order-and-cost-per-month?year=${year}`;

    return this.http.get<OrderAndCostPerMonth[]>(url);
  }

  getOrderAndCostPerQuarter(
    year: number
  ): Observable<OrderAndCostPerQuarter[]> {
    const url = `${
      this.baseUrl
    }api/orderSell/order-and-cost-per-quarter?year=${year}`;

    return this.http.get<OrderAndCostPerQuarter[]>(url);
  }

  getLatestOrder(): Observable<OrderSellLatest> {
    return this.http.get<OrderSellLatest>(
      `${this.baseUrl}api/orderSell/latest`
    );
  }

  getTotalOrderDebt(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}api/orderSell/total-debt`);
  }

  getTopOrderValue(
    numRows: number,
    year: number,
    month: number,
    type: string
  ): Observable<OrderValue[]> {
    const queryParams = new HttpParams()
      .set("numRows", `${numRows}`)
      .set("year", `${year}`)
      .set("month", `${month}`)
      .set("type", `${type}`);

    return this.http.get<OrderValue[]>(
      `${this.baseUrl}api/orderSell/top-value`,
      { params: queryParams }
    );
  }
}
