import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { CategoryBuy } from '../_interfaces/category-buy';

@Injectable({
  providedIn: 'root',
})
export class CategoryBuyService {
  baseUrl = environment.URL;
  catsObs: Observable<CategoryBuy[]>;

  constructor(private http: HttpClient) {}

  getCategoryList(): Observable<CategoryBuy[]> {
    // *Use this to get rid of duplicate request
    if (this.catsObs) {
      return this.catsObs;
    } else {
      this.catsObs = this.http
        .get<CategoryBuy[]>(`${this.baseUrl}api/categoryBuy`)
        .pipe(share());
      return this.catsObs;
    }
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
    return this.http.delete<number>(this.baseUrl + 'api/categoryBuy/' + id);
  }
}
