export interface OrderDebtBySupplier {
    supplierId: number;
    supplierName: string;
    orders: OrderDebt[];
}

interface OrderDebt {
    orderId: number;
    orderNumber: string;
    dateOfIssue: Date;
    timeForPayment: Date;
    debt: number;
}
