import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductSelect } from '../../intefaces/public/product-select';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment.URL;

  constructor(private http: HttpClient) {}

  getProductsSelect(): Observable<ProductSelect[]> {
    return this.http.get<ProductSelect[]>(`${this.baseUrl}api/product/select`);
  }
}
