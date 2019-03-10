import { OrderBuy } from './order-buy';
import { ProductOrder } from './product-order';

export interface OrderBuyWithDetailsToAddDto {
  orderBuy: OrderBuy;
  productOrders: ProductOrder[];
}
