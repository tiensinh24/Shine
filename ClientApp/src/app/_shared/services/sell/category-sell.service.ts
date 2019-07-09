import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { CategorySell } from '../../intefaces/sell/category/category-sell';

@Injectable({
  providedIn: 'root'
})
export class CategorySellService {
  baseUrl = environment.URL;

  constructor(private http: HttpClient) {}

  getCategoryList(): Observable<CategorySell[]> {
    return this.http.get<CategorySell[]>(this.baseUrl + 'api/categorySell');
  }

  getCategory(id: number): Observable<CategorySell> {
    return this.http.get<CategorySell>(this.baseUrl + 'api/categorySell/' + id);
  }

  addCategory(categorySell: CategorySell): Observable<CategorySell> {
    return this.http.post<CategorySell>(this.baseUrl + 'api/categorySell', categorySell);
  }

  updateCategory(categorySell: CategorySell): Observable<CategorySell> {
    return this.http.put<CategorySell>(this.baseUrl + 'api/categorySell', categorySell);
  }

  deleteCategory(id: number) {
    this.http.delete<CategorySell>(this.baseUrl + 'api/categorySell/' + id).subscribe();
  }
}
