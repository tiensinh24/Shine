import { of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { TableSource } from "src/app/_shared/helpers/table-source";
import { PagingParams } from "src/app/_shared/intefaces/public/paging-params";
import { SortParams } from "src/app/_shared/intefaces/public/sort-params";
import { ProductSellList } from "src/app/_shared/intefaces/sell/product/ProductSellList";
import { ProductSellService } from "src/app/_shared/services/sell/product-sell.service";
import { PagedProductSell } from "src/app/_shared/intefaces/sell/product/PagedProductSell";

export class ProductSellDataSource extends TableSource<ProductSellList> {
  constructor(private productSellService: ProductSellService) {
    super();
  }

  loadData(pagingParams: PagingParams, sortParams?: SortParams, filter = "") {
    this.loadingSubject.next(true);

    this.productSellService
      .getPagedProducts(pagingParams, sortParams, filter)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((res: PagedProductSell) => {
        this.dataSubject.next(res.items);
        this.pagingSubject.next(res.paging);
      });
  }
}
