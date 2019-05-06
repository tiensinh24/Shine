import { Paging } from 'src/app/_shared/_intefaces/paging';
import { OrderBuyList } from './order-buy-list';

export interface PagedOrderBuy {
  items: OrderBuyList[];
  paging: Paging;
}
