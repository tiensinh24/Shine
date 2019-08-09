import { OrderSellList } from "./order-sell-list";
import { Paging } from "../../public/paging";

export interface PagedOrderSell {
  items: OrderSellList[];
  paging: Paging;
}
