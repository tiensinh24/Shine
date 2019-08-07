import { CustomerOrders } from "./customer-orders";
import { Paging } from "../../public/paging";

export interface PagedCustomerOrders {
  items: CustomerOrders[];
  paging: Paging;
}
