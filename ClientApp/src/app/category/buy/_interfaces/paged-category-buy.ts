import { CategoryBuy } from './category-buy';
import { Paging } from 'src/app/_shared/_intefaces/paging';

export interface PagedCategoryBuy {
  items: CategoryBuy[];
  paging: Paging;
}
