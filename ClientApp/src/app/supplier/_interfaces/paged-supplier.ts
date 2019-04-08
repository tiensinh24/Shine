import { SupplierList } from './supplier-list';
import { Paging } from 'src/app/_shared/_intefaces/paging';

export class PagedSupplier {
  items: SupplierList[];
  paging: Paging;
}
