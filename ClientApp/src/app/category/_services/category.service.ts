import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../_interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) { }

  getCategories(): Observable<Category[]> {

    return this.http.get<Category[]>(this.baseUrl + 'api/category');
  }

  getCategory(id: number): Observable<Category> {

    return this.http.get<Category>(this.baseUrl + 'api/category/' + 'id');
  }

  addCategory(category: Category) {
    this.http.post<Category>(this.baseUrl + 'api/category', category);
  }
}
