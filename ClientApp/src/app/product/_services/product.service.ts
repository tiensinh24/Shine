import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductsDto } from '../_interfaces/productsDto';
import { Observable } from 'rxjs';
import { Product } from '../_interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) { }

  getProductList(): Observable<ProductsDto[]> {
    return this.http.get<ProductsDto[]>(this.baseUrl + 'api/product');
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.baseUrl + 'api/product/' + id);
  }

  onSubmit(product: Product) {
    this.http.post<Product>(this.baseUrl + 'api/product', product);
  }
}
