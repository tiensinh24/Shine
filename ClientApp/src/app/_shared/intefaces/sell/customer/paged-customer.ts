import { CustomerList } from "./customer-list";
import { Paging } from "../../public/paging";

export interface PagedCustomer {
  items: CustomerList[];
  paging: Paging;
}
