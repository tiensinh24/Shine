import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SupplierList } from '../../intefaces/buy/supplier/supplier-list';
import { SupplierSelect } from '../../intefaces/buy/supplier/supplier-select';
import { PagingParams } from '../../intefaces/public/paging-params';
import { SortParams } from '../../intefaces/public/sort-params';
import { PagedSupplier } from '../../intefaces/buy/supplier/paged-supplier';
import { SupplierDetail } from '../../intefaces/buy/supplier/supplier-detail';
import { Supplier } from '../../intefaces/buy/supplier/supplier';
import { ProductSelect } from '../../intefaces/public/product-select';
import { PagedProductBuy } from '../../intefaces/buy/product/paged-product-buy';
import { SupplierProduct } from '../../intefaces/buy/supplier/supplier-product';
import { SupplierOrders } from '../../intefaces/buy/supplier/supplier-orders';
import { PagedSupplierOrders } from '../../intefaces/buy/supplier/paged-supplier-orders';
import { PagedSupplierDebts } from '../../intefaces/buy/supplier/report/paged-supplier-debt';
import { OrderDebt } from '../../intefaces/buy/supplier/report/order-debt';
import { OrderBySupplierPivotMonth } from '../../intefaces/buy/supplier/report/order-by-supplier-pivot-month';
import { OrderBySupplierPivotQuarter } from '../../intefaces/buy/supplier/report/order-by-supplier-pivot-quarter';
import { SupplierDebt } from '../../intefaces/buy/supplier/report/supplier-debt';
import { PagedProductsBySupplier } from '../../intefaces/buy/supplier/paged-products-by-supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  baseUrl = environment.URL;

  constructor(private http: HttpClient) {}

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

    return this.http.get<PagedSupplier>(`${this.baseUrl}api/supplier/paged`, {
      params: queryParams
    });
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
    return this.http.delete<boolean>(`${this.baseUrl}api/supplier/delete-all`, {
      headers: { ids: idList }
    });
  }

  // *SupplierProduct

  getProductsForSelect(supplierId: number): Observable<ProductSelect[]> {
    return this.http.get<ProductSelect[]>(`${this.baseUrl}api/supplier/${supplierId}/products-for-select`);
  }

  getPagedProducts(supplierId: number, pagingParams: PagingParams, sortParams?: SortParams, filter = ''): Observable<PagedProductBuy> {
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

  getPagedProductsNotAdded(supplierId: number, pagingParams: PagingParams, sortParams?: SortParams, filter = ''): Observable<PagedProductsBySupplier> {
    let queryParams = new HttpParams()

      .set('pageIndex', `${pagingParams.pageIndex}`)
      .set('pageSize', `${pagingParams.pageSize}`)
      .set('filter', `${filter}`);

    if (sortParams !== undefined) {
      queryParams = queryParams.append('sortColumn', `${sortParams.sortColumn}`);
      queryParams = queryParams.append('sortOrder', `${sortParams.sortOrder}`);
    }

    return this.http.get<PagedProductsBySupplier>(`${this.baseUrl}api/supplier/${supplierId}/paged-products-not-added`, {
      params: queryParams
    });
  }

  addSupplierProduct(suppro: SupplierProduct): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}api/supplier/product/`, suppro);
  }

  deleteSupplierProduct(supprod: SupplierProduct): Observable<SupplierProduct> {
    return this.http.request<SupplierProduct>('delete', `${this.baseUrl}api/supplier/product/`, { body: supprod });
  }

  // * Orders

  getOrders(supplierId: number): Observable<SupplierOrders[]> {
    return this.http.get<SupplierOrders[]>(`${this.baseUrl}api/supplier/${supplierId}/orders`);
  }

  getPagedOrders(supplierId: number, pagingParams: PagingParams, sortParams?: SortParams, filter = ''): Observable<PagedSupplierOrders> {
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

  getPagedSupplierDebts(pagingParams: PagingParams, sortParams?: SortParams, filter = ''): Observable<PagedSupplierDebts> {
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

  getOrderDebtsBySupplier(supplierId: number): Observable<OrderDebt> {
    return this.http.get<OrderDebt>(`${this.baseUrl}api/supplier/${supplierId}/debt`);
  }

  getOrderBySupplierPivotMonth(year: number): Observable<OrderBySupplierPivotMonth[]> {
    return this.http.get<OrderBySupplierPivotMonth[]>(`${this.baseUrl}api/supplier/report/pivot-month`, { params: { year: year.toString() } });
  }

  getOrderBySupplierPivotQuarter(year: number): Observable<OrderBySupplierPivotQuarter[]> {
    return this.http.get<OrderBySupplierPivotQuarter[]>(`${this.baseUrl}api/supplier/report/pivot-quarter`, { params: { year: year.toString() } });
  }

  getTopSupplierDebt(numRows: number): Observable<SupplierDebt[]> {
    const url = `${this.baseUrl}api/supplier/top-debt?numRows=${numRows}`;

    return this.http.get<SupplierDebt[]>(url);
  }
}
