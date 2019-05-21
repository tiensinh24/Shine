import { Payment } from 'src/app/order/_interfaces/payment';
import { OrderBuyProducts } from './order-buy-products';

export interface OrderBuyDetail {
  orderId: number;
  orderNumber: string;
  dateOfIssue: Date;
  timeForPayment: Date;
  personId: number;
  rating: number;

  supplierName: string;
  orderTotal: number;
  paymentTotal: number;
  products: OrderBuyProducts[];
  payments: Payment[];
}
