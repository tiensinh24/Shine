import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { CategoryBuy } from '../_interfaces/category-buy';
import { BaseQueryParams } from 'src/app/_shared/_intefaces/base-query-params';
import { PagedCategoryBuy } from '../_interfaces/paged-category-buy';
import { PagingParams } from 'src/app/_shared/_intefaces/paging-params';
import { SortParams } from 'src/app/_shared/_intefaces/sort-params';
import { RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root',
})
export class CategoryBuyService {
  baseUrl = environment.URL;

  categoriesObs: Observable<CategoryBuy[]>;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<CategoryBuy[]> {
    // if (this.categoriesObs) {
    //   return this.categoriesObs;
    // } else {
    // this.categoriesObs = this.http.get<CategoryBuy[]>(`${this.baseUrl}api/categoryBuy/`).pipe(share());
    // }
    return this.http.get<CategoryBuy[]>(`${this.baseUrl}api/categoryBuy`);
  }

  getCategoriesWithBaseParams(queryParams?: BaseQueryParams): Observable<PagedCategoryBuy> {
    const headerParams = new HttpHeaders()
      .append('filter', queryParams.filter)
      .append('sortOrder', queryParams.sortOrder)
      .append('pageNumber', queryParams.pageNumber.toString())
      .append('pageSize', queryParams.pageSize.toString());

    return this.http.get<PagedCategoryBuy>(`${this.baseUrl}api/categoryBuy/WithBaseParams`, {
      headers: headerParams,
    });
  }

  getPagedCategories(pagingParams: PagingParams, sortParams?: SortParams, filter = ''): Observable<PagedCategoryBuy> {
    let queryParams = new HttpParams()
      .set('pageIndex', `${pagingParams.pageIndex}`)
      .set('pageSize', `${pagingParams.pageSize}`)
      .set('filter', `${filter}`);

    if (sortParams !== undefined) {
      queryParams = queryParams.append('sortColumn', `${sortParams.sortColumn}`);
      queryParams = queryParams.append('sortOrder', `${sortParams.sortOrder}`);
    }

    return this.http.get<PagedCategoryBuy>(`${this.baseUrl}api/categoryBuy/Paged`, { params: queryParams });
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
