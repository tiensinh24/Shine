import { ProductRemain } from '../../public/product-remain';
import { Paging } from '../../public/paging';

export interface PagedProductBuyRemain {
  items: ProductRemain[];
  paging: Paging;
}
