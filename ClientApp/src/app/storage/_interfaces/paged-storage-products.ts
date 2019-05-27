import { Paging } from 'src/app/_shared/_intefaces/paging';
import { StorageProductsList } from './storage-products-list';

export interface PagedStorageProducts {
  items: StorageProductsList[];
  paging: Paging;
}
