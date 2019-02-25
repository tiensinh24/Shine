import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { CategoryBuy } from '../_interfaces/categoryBuy';
import { share, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryBuyService {
  baseUrl = environment.URL;

  constructor(private http: HttpClient) {}

  getCategoryList(): Observable<CategoryBuy[]> {
    return this.http.get<CategoryBuy[]>(this.baseUrl + 'api/categoryBuy');
  }

  getCategory(id: number): Observable<CategoryBuy> {
    return this.http.get<CategoryBuy>(this.baseUrl + 'api/categoryBuy/' + id);
  }

  addCategory(categoryBuy: CategoryBuy): Observable<CategoryBuy> {
    return this.http.post<CategoryBuy>(
      this.baseUrl + 'api/categoryBuy',
      categoryBuy,
    );
  }

  updateCategory(categoryBuy: CategoryBuy): Observable<CategoryBuy> {
    return this.http.put<CategoryBuy>(
      this.baseUrl + 'api/categoryBuy',
      categoryBuy,
    );
  }

  deleteCategory(id: number): Observable<number> {
    return this.http
      .delete<number>(this.baseUrl + 'api/categoryBuy/' + id);
  }
}
