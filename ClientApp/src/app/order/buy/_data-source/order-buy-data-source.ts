import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { TableSource } from 'src/app/_shared/_helpers/table-source';
import { PagingParams } from 'src/app/_shared/_intefaces/paging-params';
import { SortParams } from 'src/app/_shared/_intefaces/sort-params';
import { OrderBuyList } from '../_interfaces/order-buy-list';
import { PagedOrderBuy } from '../_interfaces/paged-order-buy';
import { OrderBuyService } from '../_services/order-buy.service';
import { OrderBuyQuery } from '../_interfaces/_query/order-buy-query';

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
