import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ProductsDto } from '../_interfaces/productsDto';
import { Observable } from 'rxjs';
import { ProductSell } from '../_interfaces/product-sell';
import { ProductBuy } from '../_interfaces/product-buy';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment.URL;

  constructor(private http: HttpClient) { }

  getProductList(): Observable<ProductsDto[]> {
    return this.http.get<ProductsDto[]>(this.baseUrl + 'api/product/');
  }

  getProductSell(id: number): Observable<ProductSell> {
    return this.http.get<ProductSell>(this.baseUrl + 'api/product/buy/' + id);
  }

  getProductBuy(id: number): Observable<ProductBuy> {
    return this.http.get<ProductBuy>(this.baseUrl + 'api/product/sell/' + id);
  }

  onSubmitSell(productSell: ProductSell): Observable<ProductSell> {
    return this.http.post<ProductSell>(this.baseUrl + 'api/product/sell/', productSell);
  }

  onSubmitBuy(productBuy: ProductBuy): Observable<ProductBuy> {
    return this.http.post<ProductBuy>(this.baseUrl + 'api/product/buy/', productBuy);
  }
}
