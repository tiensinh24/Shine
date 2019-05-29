import { ProductRemain } from '../../_interfaces/product-remain';

import { Paging } from 'src/app/_shared/_intefaces/paging';

export interface PagedProductBuyRemain {
  items: ProductRemain[];
  paging: Paging;
}
