import { EmployeeList } from '../employee-list';
import { Paging } from '../paging';

export interface PagedEmployee {
  items: EmployeeList[];
  paging: Paging;
}
