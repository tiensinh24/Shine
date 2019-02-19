import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CategorySell } from '../_interfaces/category-sell';

@Injectable({
  providedIn: 'root'
})
export class CategorySellService {

  constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) { }

  getCategoryList(): Observable<CategorySell[]> {
    return this.http.get<CategorySell[]>(this.baseUrl + 'api/categorySell');
  }

  getCategory(id: number): Observable<CategorySell> {
    return this.http.get<CategorySell>(this.baseUrl + 'api/categorySell/' + id);
  }

  addCategory(category: CategorySell): Observable<CategorySell> {
    return this.http.post<CategorySell>(this.baseUrl + 'api/categorySell', category);
  }
}
