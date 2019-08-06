import { ProductRemain } from '../../public/product-remain';
import { Paging } from '../../public/paging';

export interface PagedProductSellRemain {
  items: ProductRemain[];
  paging: Paging;
}
