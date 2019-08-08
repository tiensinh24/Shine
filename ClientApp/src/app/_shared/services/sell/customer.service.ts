import { Injectable } from "@angular/core";
import { CustomerSelect } from "../../intefaces/sell/customer/customer-select";
import { Observable } from "rxjs";

import { environment } from "src/environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { PagingParams } from "../../intefaces/public/paging-params";
import { SortParams } from "../../intefaces/public/sort-params";
import { PagedCustomer } from "../../intefaces/sell/customer/paged-customer";
import { CustomerDetail } from "../../intefaces/sell/customer/customer-detail";
import { CustomerList } from "../../intefaces/sell/customer/customer-list";
import { Customer } from "../../intefaces/sell/customer/customer";
import { CustomerOrders } from "../../intefaces/sell/customer/customer-orders";
import { PagedCustomerOrders } from "../../intefaces/sell/customer/paged-customer-orders";

@Injectable({
  providedIn: "root"
})
export class CustomerService {
  baseUrl = environment.URL;

  constructor(private http: HttpClient) {}

  getCustomersSelect(): Observable<CustomerSelect[]> {
    return this.http.get<CustomerSelect[]>(
      `${this.baseUrl}api/customer/select`
    );
  }

  getPagedCustomers(
    pagingParams: PagingParams,
    sortParams?: SortParams,
    filter = ""
  ): Observable<PagedCustomer> {
    let queryParams = new HttpParams()
      .set("pageIndex", `${pagingParams.pageIndex}`)
      .set("pageSize", `${pagingParams.pageSize}`)
      .set("filter", `${filter}`);

    if (sortParams !== undefined) {
      queryParams = queryParams.append(
        "sortColumn",
        `${sortParams.sortColumn}`
      );
      queryParams = queryParams.append("sortOrder", `${sortParams.sortOrder}`);
    }

    return this.http.get<PagedCustomer>(`${this.baseUrl}api/customer/paged`, {
      params: queryParams
    });
  }

  getCustomer(customerId: number): Observable<CustomerDetail> {
    return this.http.get<CustomerDetail>(`${this.baseUrl}api/customer/${customerId}`);
  }

  addCustomer(customer: Customer): Observable<CustomerList> {
    return this.http.post<CustomerList>(
      `${this.baseUrl}api/customer/`,
      customer
    );
  }

  updateCustomer(customer: Customer): Observable<CustomerList> {
    return this.http.put<CustomerList>(
      `${this.baseUrl}api/customer/`,
      customer
    );
  }

  deleteCustomer(id: number): Observable<number> {
    return this.http.delete<number>(`${this.baseUrl}api/customer/${id}`);
  }

  deleteCustomers(idList: string[]): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}api/customer/delete-all`, {
      headers: { ids: idList }
    });
  }

  // * Orders

  getOrders(customerId: number): Observable<CustomerOrders[]> {
    return this.http.get<CustomerOrders[]>(
      `${this.baseUrl}api/customer/${customerId}/orders`
    );
  }

  getPagedOrders(
    customerId: number,
    pagingParams: PagingParams,
    sortParams?: SortParams,
    filter = ""
  ): Observable<PagedCustomerOrders> {
    let queryParams = new HttpParams()
      .set("pageIndex", `${pagingParams.pageIndex}`)
      .set("pageSize", `${pagingParams.pageSize}`)
      .set("filter", `${filter}`);

    if (sortParams !== undefined) {
      queryParams = queryParams.append(
        "sortColumn",
        `${sortParams.sortColumn}`
      );
      queryParams = queryParams.append("sortOrder", `${sortParams.sortOrder}`);
    }

    return this.http.get<PagedCustomerOrders>(
      `${this.baseUrl}api/customer/${customerId}/paged-orders`,
      {
        params: queryParams
      }
    );
  }
}
