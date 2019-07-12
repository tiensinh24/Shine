import { ProductsBySupplier } from './products-by-supplier';
import { Paging } from '../../public/paging';

export interface PagedProductsBySupplier {
  items: ProductsBySupplier[];
  paging: Paging;
}
