
import { SupplierOrders } from './supplier-orders';
import { Paging } from '../../public/paging';

export interface PagedSupplierOrders {
  items: SupplierOrders[];
  paging: Paging;
}
