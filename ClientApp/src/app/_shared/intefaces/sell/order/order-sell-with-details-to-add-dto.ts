import { Cost } from "../../public/cost";
import { Payment } from "../../public/payment";
import { ProductOrder } from "../../public/order/product-order";

export interface OrderSellWithNavigations {
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
