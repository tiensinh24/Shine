import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CategoryBuy } from '../_interfaces/categoryBuy';

@Injectable({
  providedIn: 'root'
})
export class CategoryBuyService {

  constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) { }

  getCategoryList(): Observable<CategoryBuy[]> {
    return this.http.get<CategoryBuy[]>(this.baseUrl + 'api/categoryBuy');
  }

  getCategory(id: number): Observable<CategoryBuy> {
    return this.http.get<CategoryBuy>(this.baseUrl + 'api/categoryBuy/' + id);
  }

  addCategory(category: CategoryBuy): Observable<CategoryBuy> {
    return this.http.post<CategoryBuy>(this.baseUrl + 'api/categoryBuy', category);
  }
}
