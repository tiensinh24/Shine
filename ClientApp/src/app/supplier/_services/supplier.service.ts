import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagingParams } from 'src/app/_shared/_intefaces/paging-params';
import { SortParams } from 'src/app/_shared/_intefaces/sort-params';
import { ProductSelect } from 'src/app/product/_interfaces/product-select';
import { PagedProductBuy } from 'src/app/product/buy/_interfaces/paged-product-buy';
import { environment } from 'src/environments/environment';
import { PagedSupplier } from '../_interfaces/paged-supplier';
import { PagedSupplierOrders } from '../_interfaces/paged-supplier-orders';
import { Supplier } from '../_interfaces/supplier';
import { SupplierDetail } from '../_interfaces/supplier-detail';
import { SupplierList } from '../_interfaces/supplier-list';
import { SupplierOrders } from '../_interfaces/supplier-orders';
import { SupplierProduct } from '../_interfaces/supplier-product';
import { ProductsBySupplier } from '../_interfaces/supplier-products-list';
import { SupplierSelect } from '../_interfaces/supplier-select';
import { PagedSupplierDebts } from '../_interfaces/reports/paged-supplier-debt';
import { OrderDebtBySupplier } from '../_interfaces/reports/order-debt-by-supplier';


@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  baseUrl = environment.URL;

  constructor(private http: HttpClient) { }

  getSuppliers(): Observable<SupplierList[]> {
    return this.http.get<SupplierList[]>(`${this.baseUrl}api/supplier/`);
  }

  getSuppliersSelect(): Observable<SupplierSelect[]> {
    return this.http.get<SupplierSelect[]>(`${this.baseUrl}api/supplier/select`);
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

  getProductsForSelect(supplierId: number): Observable<ProductSelect[]> {
    return this.http.get<ProductSelect[]>(`${this.baseUrl}api/supplier/${supplierId}/products-for-select`);
  }

  getPagedProducts(
    supplierId: number,
    pagingParams: PagingParams,
    sortParams?: SortParams,
    filter = ''
  ): Observable<PagedProductBuy> {
    let queryParams = new HttpParams()

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

  // * Orders

  getOrders(supplierId: number): Observable<SupplierOrders[]> {
    return this.http.get<SupplierOrders[]>(`${this.baseUrl}api/supplier/${supplierId}/orders`);
  }

  getPagedOrders(
    supplierId: number,
    pagingParams: PagingParams,
    sortParams?: SortParams,
    filter = ''
  ): Observable<PagedSupplierOrders> {
    let queryParams = new HttpParams()
      .set('pageIndex', `${pagingParams.pageIndex}`)
      .set('pageSize', `${pagingParams.pageSize}`)
      .set('filter', `${filter}`);

    if (sortParams !== undefined) {
      queryParams = queryParams.append('sortColumn', `${sortParams.sortColumn}`);
      queryParams = queryParams.append('sortOrder', `${sortParams.sortOrder}`);
    }

    return this.http.get<PagedSupplierOrders>(`${this.baseUrl}api/supplier/${supplierId}/paged-orders`, {
      params: queryParams
    });
  }



  // *Reports

  getPagedSupplierDebts(
    pagingParams: PagingParams,
    sortParams?: SortParams,
    filter = ''
  ): Observable<PagedSupplierDebts> {
    let queryParams = new HttpParams()
      .set('pageIndex', `${pagingParams.pageIndex}`)
      .set('pageSize', `${pagingParams.pageSize}`)
      .set('filter', `${filter}`);

    if (sortParams !== undefined) {
      queryParams = queryParams.append('sortColumn', `${sortParams.sortColumn}`);
      queryParams = queryParams.append('sortOrder', `${sortParams.sortOrder}`);
    }

    return this.http.get<PagedSupplierDebts>(`${this.baseUrl}api/supplier/debt`, {
      params: queryParams
    });
  }

  getOrderDebtsBySupplier(supplierId: number): Observable<OrderDebtBySupplier> {
    return this.http.get<OrderDebtBySupplier>(`${this.baseUrl}api/supplier/${supplierId}/debt`);
  }
}
