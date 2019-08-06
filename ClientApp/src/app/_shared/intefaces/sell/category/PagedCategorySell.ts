import { CategorySell } from "./category-sell";
import { Paging } from "../../public/paging";

export interface PagedCategorySell {
  items: CategorySell[];
  paging: Paging;
}
