import { of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { TableSource } from "src/app/_shared/helpers/table-source";
import { PagingParams } from "src/app/_shared/intefaces/public/paging-params";
import { SortParams } from "src/app/_shared/intefaces/public/sort-params";
import { OrderSellList } from "src/app/_shared/intefaces/sell/order/order-sell-list";
import { OrderSellQuery } from "src/app/_shared/intefaces/sell/order/query/order-sell-query";
import { PagedOrderSell } from "src/app/_shared/intefaces/sell/order/paged-order-sell";
import { OrderSellService } from "src/app/_shared/services/sell/order-sell.service";

export class OrderSellDataSource extends TableSource<OrderSellList> {
  constructor(private orderSellService: OrderSellService) {
    super();
  }

  loadData(
    pagingParams: PagingParams,
    sortParams?: SortParams,
    query?: OrderSellQuery,
    filter = ""
  ) {
    this.loadingSubject.next(true);

    this.orderSellService
      .getPagedOrders(pagingParams, sortParams, query, filter)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((res: PagedOrderSell) => {
        this.dataSubject.next(res.items);
        this.pagingSubject.next(res.paging);
      });
  }
}
