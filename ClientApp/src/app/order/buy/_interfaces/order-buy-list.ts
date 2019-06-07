export interface OrderBuyList {
  orderId: number;
  orderNumber: string;
  dateOfIssue: Date;
  timeForPayment: Date;
  rating: number;
  personId: number;
  supplierName: string;
  employeeId: number;
  employeeName: string;

  value: number;
  cost: number;
}
