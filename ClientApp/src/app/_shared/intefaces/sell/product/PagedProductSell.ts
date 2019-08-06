import { ProductSellList } from "./ProductSellList";
import { Paging } from "../../public/paging";

export interface PagedProductSell {
  items: ProductSellList[];
  paging: Paging;
}
