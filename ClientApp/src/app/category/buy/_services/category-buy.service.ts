import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { CategoryBuy } from '../_interfaces/category-buy';
import { PaginationService } from 'src/app/_shared/_services/pagination.service';
import { BaseQueryParams } from 'src/app/_shared/_interfaces/base-query-params';

@Injectable({
  providedIn: 'root',
})
export class CategoryBuyService {
  baseUrl = environment.URL;
  categoriesObs: Observable<CategoryBuy[]>;

  constructor(private http: HttpClient, private paginationService: PaginationService) {}

  getCategoryList(queryParams?: BaseQueryParams): Observable<CategoryBuy[]> {
    // *Use this to get rid of duplicate request
    if (this.categoriesObs) {
      return this.categoriesObs;
    } else {
      this.categoriesObs = this.http
        .get<CategoryBuy[]>(`${this.baseUrl}api/categoryBuy`, {
          headers: this.paginationService.getBaseQueryParams(queryParams),
        })
        .pipe(share());
      return this.categoriesObs;
    }
  }

  getCategory(id: number): Observable<CategoryBuy> {
    return this.http.get<CategoryBuy>(this.baseUrl + 'api/categoryBuy/' + id);
  }

  addCategory(categoryBuy: CategoryBuy): Observable<CategoryBuy> {
    return this.http.post<CategoryBuy>(this.baseUrl + 'api/categoryBuy', categoryBuy);
  }

  updateCategory(categoryBuy: CategoryBuy): Observable<CategoryBuy> {
    return this.http.put<CategoryBuy>(this.baseUrl + 'api/categoryBuy', categoryBuy);
  }

  deleteCategory(id: number): Observable<number> {
    return this.http.delete<number>(this.baseUrl + 'api/categoryBuy/' + id);
  }
}
