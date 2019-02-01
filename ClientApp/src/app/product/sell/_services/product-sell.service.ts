import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductsSellDto } from '../_interfaces/productsSellDto';
import { ProductSell } from '../_interfaces/product-sell';

@Injectable({
  providedIn: 'root'
})
export class ProductSellService {
  baseUrl = environment.URL;

  constructor(private http: HttpClient) {}

  getProductList(): Observable<ProductsSellDto[]> {
    return this.http.get<ProductsSellDto[]>(this.baseUrl + 'api/product-sell/');
  }

  getProduct(id: number): Observable<ProductSell> {
    return this.http.get<ProductSell>(this.baseUrl + 'api/product-sell/' + id);
  }

  onSubmit(productSell: ProductSell): Observable<ProductSell> {
    return this.http.post<ProductSell>(
      this.baseUrl + 'api/product-sell/',
      productSell
    );
  }

}
