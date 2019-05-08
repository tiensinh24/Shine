export interface Payment {
  paymentId: number;
  orderId: number;
  paymentDate: Date;
  amount: number;
  currency: boolean;
  rate: number;
}
