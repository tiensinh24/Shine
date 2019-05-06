import { Payment } from 'src/app/payment/_interfaces/payment';
import { ProductBuy } from 'src/app/product/buy/_interfaces/product-buy';

export interface OrderBuyDetail {
  orderId: number;
  orderNumber: string;
  dateOfIssue: Date;
  timeForPayment: Date;
  personId: number;

  supplierName: string;
  products: ProductBuy[];
  payments: Payment[];
}
