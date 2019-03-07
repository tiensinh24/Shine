import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderBuyDto } from '../_interfaces/order-buy-dto';
import { OrderBuy } from '../_interfaces/order-buy';
import { ProductOrder } from '../_interfaces/product-order';

@Injectable({
  providedIn: 'root'
})
export class OrderBuyService {
  baseUrl = environment.URL;

  constructor(private http: HttpClient) { }

  getOrders(): Observable<OrderBuyDto[]> {
    return this.http.get<OrderBuyDto[]>(`${this.baseUrl}api/orderBuy/`);
  }

  getOrder(id: number): Observable<OrderBuyDto> {
    return this.http.get<OrderBuyDto>(`${this.baseUrl}api/orderBuy/${id}`);
  }

  addOrder(orderBuy: OrderBuy): Observable<OrderBuyDto> {
    return this.http.post<OrderBuyDto>(`${this.baseUrl}api/orderBuy/`, orderBuy);
  }

  updateOrder(orderbuy: OrderBuy): Observable<OrderBuyDto> {
    return this.http.put<OrderBuyDto>(`${this.baseUrl}api/orderBuy/`, orderbuy);
  }



  // *ProductOrder
  addProductOrder(productOrder: ProductOrder): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}api/orderBuy/addProduct`, productOrder);
  }

  addProductsOrder(productsOrder: ProductOrder[]): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}api/orderBuy/addProducts/`, productsOrder);
  }
}
