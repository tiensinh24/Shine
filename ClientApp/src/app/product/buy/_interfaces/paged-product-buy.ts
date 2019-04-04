import { Paging } from 'src/app/_shared/_intefaces/paging';
import { ProductBuyDto } from './product-buy-dto';

export interface PagedProductBuy {
  items: ProductBuyDto[];
  paging: Paging;
}
