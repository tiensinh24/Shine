import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductsDto } from '../_interfaces/productsDto';
import { Observable } from 'rxjs';
import { ProductSell } from '../_interfaces/product-sell';
import { ProductBuy } from '../_interfaces/product-buy';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) { }

  getProductList(): Observable<ProductsDto[]> {
    return this.http.get<ProductsDto[]>(this.baseUrl + 'api/product/');
  }

  getProductSell(id: number): Observable<ProductSell> {
    return this.http.get<ProductSell>(this.baseUrl + 'api/product/buy/' + id);
  }

  getProductBuy(id: number): Observable<ProductBuy> {
    return this.http.get<ProductBuy>(this.baseUrl + 'api/product/sell/' + id);
  }

  onSubmitSell(product: ProductSell) {
    this.http.post<ProductSell>(this.baseUrl + 'api/product/sell/', product);
  }

  onSubmitBuy(product: ProductBuy) {
    this.http.post<ProductBuy>(this.baseUrl + 'api/product/buy/', product);
  }
}
