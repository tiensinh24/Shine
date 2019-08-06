import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { ProductSell } from "../../intefaces/sell/product/product-sell";
import { PagedProductSell } from "../../intefaces/sell/product/PagedProductSell";
import { ProductSellDetail } from "../../intefaces/sell/product/ProductSellDetail";
import { PagingParams } from "../../intefaces/public/paging-params";
import { SortParams } from "../../intefaces/public/sort-params";
import { PagedProductSellRemain } from "../../intefaces/sell/product/PagedProductSellRemain";
import { ProductStorageRemain } from "../../intefaces/public/product-storage-remain";

@Injectable({
  providedIn: "root"
})
export class ProductSellService {
  baseUrl = environment.URL;

  constructor(private http: HttpClient) {}

  getProduct(productId: number): Observable<ProductSellDetail> {
    return this.http.get<ProductSellDetail>(
      this.baseUrl + "api/productSell/" + productId
    );
  }

  getPagedProducts(
    pagingParams: PagingParams,
    sortParams?: SortParams,
    filter = ""
  ): Observable<PagedProductSell> {
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

    return this.http.get<PagedProductSell>(
      `${this.baseUrl}api/productSell/paged`,
      { params: queryParams }
    );
  }

  addProduct(productSell: ProductSell): Observable<ProductSell> {
    return this.http.post<ProductSell>(
      this.baseUrl + "api/productSell/",
      productSell
    );
  }

  updateProduct(productSell: ProductSell): Observable<ProductSell> {
    return this.http.put<ProductSell>(
      this.baseUrl + "api/productSell/",
      productSell
    );
  }

  deleteProduct(productId: number): Observable<number> {
    return this.http.delete<number>(
      this.baseUrl + "api/productSell/" + productId
    );
  }

  deleteProducts(idList: string[]): Observable<boolean> {
    return this.http.delete<boolean>(
      `${this.baseUrl}api/productSell/delete-all`,
      { headers: { ids: idList } }
    );
  }

  // *ProductStorage

  getPagedProductRemains(
    pagingParams: PagingParams,
    sortParams?: SortParams,
    filter = ""
  ): Observable<PagedProductSellRemain> {
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

    return this.http.get<PagedProductSellRemain>(
      `${this.baseUrl}api/productSell/remain/paged`,
      { params: queryParams }
    );
  }

  getProductRemainPerStorages(
    productId: number
  ): Observable<ProductStorageRemain[]> {
    return this.http.get<ProductStorageRemain[]>(
      `${this.baseUrl}api/productSell/${productId}/storage/remain`
    );
  }
}
