import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { CategoryBuy } from '../_interfaces/categoryBuy';

@Injectable({
  providedIn: 'root'
})
export class CategoryBuyService {
  baseUrl = environment.URL;

  constructor(private http: HttpClient) { }

  getCategoryList(): Observable<CategoryBuy[]> {
    return this.http.get<CategoryBuy[]>(this.baseUrl + 'api/categoryBuy');
  }

  getCategory(id: number): Observable<CategoryBuy> {
    return this.http.get<CategoryBuy>(this.baseUrl + 'api/categoryBuy/' + id);
  }

  addCategory(categoryBuy: CategoryBuy): Observable<CategoryBuy> {
    return this.http.post<CategoryBuy>(this.baseUrl + 'api/categoryBuy', categoryBuy);
  }

  updateCategory(categoryBuy: CategoryBuy): Observable<CategoryBuy> {
    return this.http.put<CategoryBuy>(this.baseUrl + 'api/categoryBuy/', categoryBuy);
  }

  deleteCategory(id: number) {
    this.http.delete<CategoryBuy>(this.baseUrl + 'api/categoryBuy' + id).subscribe();
  }

}
