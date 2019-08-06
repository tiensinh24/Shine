import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "src/environments/environment";
import { CategorySell } from "../../intefaces/sell/category/category-sell";
import { PagingParams } from "../../intefaces/public/paging-params";
import { SortParams } from "../../intefaces/public/sort-params";
import { PagedCategorySell } from "../../intefaces/sell/category/PagedCategorySell";

@Injectable({
  providedIn: "root"
})
export class CategorySellService {
  baseUrl = environment.URL;

  categoriesObs: Observable<CategorySell[]>;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<CategorySell[]> {
    return this.http.get<CategorySell[]>(`${this.baseUrl}api/categorySell`);
  }

  getPagedCategories(
    pagingParams: PagingParams,
    sortParams?: SortParams,
    filter = ""
  ): Observable<PagedCategorySell> {
    let queryParams = new HttpParams()
      .set("pageIndex", `${pagingParams.pageIndex}`)
      .set("pageSize", `${pagingParams.pageSize}`)
      .set("filter", `${filter}`);

    if (sortParams !== undefined) {
      queryParams = queryParams.append(
        "sortColumn",
        `${sortParams.sortColumn}`
      );
      queryParams = queryParams.append("sortOrder", `${sortParams.sortOrder}`);
    }

    return this.http.get<PagedCategorySell>(
      `${this.baseUrl}api/categorySell/paged`,
      { params: queryParams }
    );
  }

  getCategory(id: number): Observable<CategorySell> {
    return this.http.get<CategorySell>(this.baseUrl + "api/categorySell/" + id);
  }

  addCategory(categorySell: CategorySell): Observable<CategorySell> {
    return this.http.post<CategorySell>(
      this.baseUrl + "api/categorySell",
      categorySell
    );
  }

  updateCategory(categorySell: CategorySell): Observable<CategorySell> {
    return this.http.put<CategorySell>(
      this.baseUrl + "api/categorySell",
      categorySell
    );
  }

  deleteCategory(id: number): Observable<number> {
    return this.http.delete<number>(this.baseUrl + "api/categorySell/" + id);
  }

  deleteCategories(idList: string[]): Observable<boolean> {
    return this.http.delete<boolean>(
      `${this.baseUrl}api/categorySell/delete-all`,
      { headers: { ids: idList } }
    );
  }
}
