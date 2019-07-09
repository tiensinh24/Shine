import { ProductBuyList } from './product-buy-list';
import { Paging } from '../../public/paging';

export interface PagedProductBuy {
  items: ProductBuyList[];
  paging: Paging;
}
