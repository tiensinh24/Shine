import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


import { ProductBuyListDto } from '../_interfaces/productBuyListDto';
import { ProductBuy } from '../_interfaces/product-buy';
import { environment } from 'src/environments/environment';
import { shareReplay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductBuyService {
  baseUrl = environment.URL;

  constructor(private http: HttpClient) { }

  getProductList(): Observable<ProductBuyListDto[]> {
    return this.http.get<ProductBuyListDto[]>(this.baseUrl + 'api/product-buy/');
  }

  getProduct(id: number): Observable<ProductBuy> {
    return this.http.get<ProductBuy>(this.baseUrl + 'api/product-buy/' + id);
  }

  addProduct(productBuy: ProductBuy): Observable<ProductBuy> {
    return this.http.post<ProductBuy>(this.baseUrl + 'api/product-buy/', productBuy);
  }

  updateProduct(productBuy: ProductBuy): Observable<ProductBuy> {
    return this.http.put<ProductBuy>(this.baseUrl + 'api/product-buy/', productBuy);
  }

  deleteProduct(id: number) {
    this.http.delete<ProductBuy>(this.baseUrl + 'api/product-buy/' + id).subscribe();
  }
}
