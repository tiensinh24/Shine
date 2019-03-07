export interface OrderBuyDto {
    orderId: number;
    orderNumber: string;
    dateOfIssue: Date;
    timeForPayment: Date;
    personId: number;

    supplierName: string;
}
