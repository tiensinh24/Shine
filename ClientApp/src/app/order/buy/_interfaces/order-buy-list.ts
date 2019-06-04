export interface OrderBuyList {
  orderId: number;
  orderNumber: string;
  dateOfIssue: Date;
  timeForPayment: Date;
  personId: number;
  rating: number;

  supplierName: string;

  value: number;
  cost: number;
}
