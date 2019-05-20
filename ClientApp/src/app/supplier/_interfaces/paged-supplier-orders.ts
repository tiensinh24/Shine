import { Paging } from 'src/app/_shared/_intefaces/paging';
import { SupplierOrders } from './supplier-orders';

export interface PagedSupplierOrders {
  items: SupplierOrders[];
  paging: Paging;
}
