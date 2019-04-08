import { Paging } from 'src/app/_shared/_intefaces/paging';
import { ProductBuyList } from './product-buy-list';

export interface PagedProductBuy {
  items: ProductBuyList[];
  paging: Paging;
}
