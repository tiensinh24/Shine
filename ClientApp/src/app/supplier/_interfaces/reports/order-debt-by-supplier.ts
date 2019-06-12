export interface OrderDebtBySupplier {
    supplierId: number;
    supplierName: string;
    Orders: OrderDebt[];
}

interface OrderDebt {
    orderId: number;
    debt: number;
}
