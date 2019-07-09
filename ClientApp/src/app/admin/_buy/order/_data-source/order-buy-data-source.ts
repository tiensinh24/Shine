import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { TableSource } from 'src/app/_shared/helpers/table-source';
import { OrderBuyList } from '../../../../_shared/intefaces/buy/order/order-buy-list';
import { PagedOrderBuy } from '../../../../_shared/intefaces/buy/order/paged-order-buy';
import { OrderBuyService } from '../../../../_shared/services/buy/order-buy.service';
import { PagingParams } from 'src/app/_shared/intefaces/public/paging-params';
import { SortParams } from 'src/app/_shared/intefaces/public/sort-params';
import { OrderBuyQuery } from 'src/app/_shared/intefaces/buy/order/query/order-buy-query';


export class OrderBuyDataSource extends TableSource<OrderBuyList> {
  constructor(private orderBuyService: OrderBuyService) {
    super();
  }

  loadData(pagingParams: PagingParams, sortParams?: SortParams, query?: OrderBuyQuery, filter = '') {
    this.loadingSubject.next(true);

    this.orderBuyService
      .getPagedOrders(pagingParams, sortParams, query, filter)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((res: PagedOrderBuy) => {
        this.dataSubject.next(res.items);
        this.pagingSubject.next(res.paging);
      });
  }
}
