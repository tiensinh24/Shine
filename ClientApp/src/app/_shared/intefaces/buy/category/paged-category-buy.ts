import { CategoryBuy } from './category-buy';
import { Paging } from '../../public/paging';

export interface PagedCategoryBuy {
  items: CategoryBuy[];
  paging: Paging;
}
