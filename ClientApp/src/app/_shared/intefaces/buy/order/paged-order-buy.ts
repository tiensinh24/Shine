import { OrderBuyList } from './order-buy-list';
import { Paging } from '../../public/paging';

export interface PagedOrderBuy {
  items: OrderBuyList[];
  paging: Paging;
}
