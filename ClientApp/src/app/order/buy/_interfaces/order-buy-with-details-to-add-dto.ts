import { OrderBuy } from './order-buy';
import { ProductOrder } from './product-order';
import { Payment } from '../../_interfaces/payment';
import { Cost } from '../../_interfaces/cost';

export interface OrderBuyWithDetailsToAddDto {
  orderBuy: OrderBuy;
  productOrders: ProductOrder[];
  payments: Payment[];
  costs: Cost[];
}
