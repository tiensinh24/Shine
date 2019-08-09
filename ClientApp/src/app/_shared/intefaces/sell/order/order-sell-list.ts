export interface OrderSellList {
  orderId: number;
  orderNumber: string;
  dateOfIssue: Date;
  timeForPayment: Date;
  rating: number;
  personId: number;
  customerName: string;
  employeeId: number;
  employeeName: string;

  value: number;
  cost: number;
}
