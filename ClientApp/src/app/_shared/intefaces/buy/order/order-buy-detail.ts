import { OrderBuyProducts } from './order-buy-products';
import { Cost } from '../../public/cost';
import { Payment } from '../../public/payment';

export interface OrderBuyDetail {
  orderId: number;
  orderNumber: string;
  dateOfIssue: Date;
  timeForPayment: Date;
  personId: number;
  employeeId: number;
  rating: number;

  supplierName: string;
  employeeName: string;
  orderTotal: number;
  paymentTotal: number;
  products: OrderBuyProducts[];
  payments: Payment[];
  totalPayment: number;
  costs: Cost[];
  totalCost: number;
  debt: number;
}
