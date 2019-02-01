import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ProductsBuyDto } from '../_interfaces/productsBuyDto';
import { Observable } from 'rxjs';
import { ProductSell } from '../../sell/_interfaces/product-sell';
import { ProductBuy } from '../_interfaces/product-buy';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductBuyService {
  baseUrl = environment.URL;

  constructor(private http: HttpClient) { }

  getProductList(): Observable<ProductsBuyDto[]> {
    return this.http.get<ProductsBuyDto[]>(this.baseUrl + 'api/product-buy/');
  }

  getProduct(id: number): Observable<ProductBuy> {
    return this.http.get<ProductBuy>(this.baseUrl + 'api/product-buy/' + id);
  }

  addProduct(productBuy: ProductBuy): Observable<ProductBuy> {
    return this.http.post<ProductBuy>(this.baseUrl + 'api/product-buy/', productBuy);
  }
}
