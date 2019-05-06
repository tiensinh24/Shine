export interface Payment {
  orderId: number;
  paymentDate: Date;
  amount: number;
  currency: boolean;
  rate: number;
}
