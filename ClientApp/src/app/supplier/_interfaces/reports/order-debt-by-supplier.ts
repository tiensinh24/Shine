export interface OrderDebtBySupplier {
    supplierId: number;
    supplierName: string;
    orders: OrderDebt[];
}

interface OrderDebt {
    orderId: number;
    debt: number;
}
