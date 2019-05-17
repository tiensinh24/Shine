import { OrderBuy } from './order-buy';
import { ProductOrder } from './product-order';
import { Cost } from '../../_interfaces/cost';
import { Payment } from '../../_interfaces/payment';

export interface OrderBuyWithNavigations {
  orderId: number;
  orderNumber: string;
  dateOfIssue: Date;
  timeForPayment: Date;
  personId: number;
  productOrders: ProductOrder[];
  payments: Payment[];
  costs: Cost[];
}
