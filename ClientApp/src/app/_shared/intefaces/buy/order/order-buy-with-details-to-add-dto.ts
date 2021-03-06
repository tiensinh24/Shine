import { ProductOrder } from '../../public/order/product-order';
import { Cost } from '../../public/cost';
import { Payment } from '../../public/payment';

export interface OrderBuyWithNavigations {
  orderId: number;
  orderNumber: string;
  dateOfIssue: Date;
  timeForPayment: Date;
  personId: number;
  employeeId: number;
  rating: number;

  productOrders: ProductOrder[];
  payments: Payment[];
  costs: Cost[];
}
