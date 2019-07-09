
import { StorageProductsList } from './storage-products-list';
import { Paging } from '../paging';

export interface PagedStorageProducts {
  items: StorageProductsList[];
  paging: Paging;
}
