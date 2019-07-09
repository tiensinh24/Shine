import { SupplierDebt } from './supplier-debt';
import { Paging } from '../../../public/paging';

export interface PagedSupplierDebts {
  items: SupplierDebt[];
  paging: Paging;
}
