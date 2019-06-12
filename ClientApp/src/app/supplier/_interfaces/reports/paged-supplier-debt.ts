import { SupplierDebt } from './supplier-debt';
import { Paging } from 'src/app/_shared/_intefaces/paging';

export interface PagedSupplierDebts {
    items: SupplierDebt[];
    paging: Paging;
}