import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


import { ProductBuyDto } from '../_interfaces/product-buy-dto';
import { ProductBuy } from '../_interfaces/product-buy';
import { environment } from 'src/environments/environment';



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
