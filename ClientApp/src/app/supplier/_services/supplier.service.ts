import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SupplierDto } from '../_interfaces/supplier-dto';
import { Supplier } from '../_interfaces/supplier';
import { SupplierProductsDto } from '../_interfaces/supplier-products-dto';
import { SupplierProduct } from '../_interfaces/supplier-product';
import { ProductsGroupBySupplier } from '../_interfaces/products-by-supplier';
import { ProductBuyDto } from 'src/app/product/buy/_interfaces/product-buy-dto';


@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  baseUrl = environment.URL;

  constructor(private http: HttpClient) { }

  getSupplierList(): Observable<SupplierDto[]> {
    return this.http.get<SupplierDto[]>(`${this.baseUrl}api/supplier/`);
  }

  getSupplier(id: number): Observable<SupplierDto> {
    return this.http.get<SupplierDto>(`${this.baseUrl}api/supplier/${id}`);
  }

  addSupplier(supplier: Supplier): Observable<SupplierDto> {
    return this.http.post<SupplierDto>(`${this.baseUrl}api/supplier/`, supplier);
  }

  updateSupplier(supplier: Supplier): Observable<SupplierDto> {
    return this.http.put<SupplierDto>(`${this.baseUrl}api/supplier/`, supplier);
  }

  deleteSupplier(id: number): Observable<number> {
    return this.http.delete<number>(`${this.baseUrl}api/supplier/${id}`);
  }




  getSupplierProducts(): Observable<SupplierProductsDto[]> {
    return this.http.get<SupplierProductsDto[]>(`${this.baseUrl}api/supplierProduct/`);
  }

  getProductsGroupBySupplier(supplierId: number): Observable<ProductsGroupBySupplier> {
    return this.http.get<ProductsGroupBySupplier>(`${this.baseUrl}api/supplierProduct/${supplierId}`);
  }

  getProductsNotAdded(supplierId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}api/supplierProduct/not/${supplierId}`);
  }

  addSupplierProduct(suppro: SupplierProduct): Observable<SupplierProduct> {
    return this.http.post<SupplierProduct>(`${this.baseUrl}api/supplierProduct/`, suppro);
  }

  deleteSupplierProduct(supprod: SupplierProduct): Observable<SupplierProduct> {
    return this.http.request<SupplierProduct>
      ('delete', `${this.baseUrl}api/supplierProduct/`, { body: supprod });
  }
}
