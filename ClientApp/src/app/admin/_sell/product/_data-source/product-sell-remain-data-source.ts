import { of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { TableSource } from "src/app/_shared/helpers/table-source";

import { ProductRemain } from "../../../../_shared/intefaces/public/product-remain";
import { PagingParams } from "src/app/_shared/intefaces/public/paging-params";
import { SortParams } from "src/app/_shared/intefaces/public/sort-params";
import { ProductSellService } from "src/app/_shared/services/sell/product-sell.service";
import { PagedProductSellRemain } from "src/app/_shared/intefaces/sell/product/PagedProductSellRemain";

export class ProductSellRemainDataSource extends TableSource<ProductRemain> {
  constructor(private productSellService: ProductSellService) {
    super();
  }

  loadData(pagingParams: PagingParams, sortParams?: SortParams, filter = "") {
    this.loadingSubject.next(true);

    this.productSellService
      .getPagedProductRemains(pagingParams, sortParams, filter)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((res: PagedProductSellRemain) => {
        this.dataSubject.next(res.items);
        this.pagingSubject.next(res.paging);
      });
  }
}
