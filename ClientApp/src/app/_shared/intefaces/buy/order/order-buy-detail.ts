import { OrderBuyProducts } from './order-buy-products';
import { Cost } from '../../public/cost';
import { Payment } from '../../public/payment';
import { SupplierList } from '../supplier/supplier-list';
import { EmployeeList } from '../../public/employee-list';

export interface OrderBuyDetail {
  orderId: number;
  orderNumber: string;
  dateOfIssue: Date;
  timeForPayment: Date;
  personId: number;
  supplier: SupplierList;
  employeeId: number;
  employee: EmployeeList;
  rating: number;

  orderTotal: number;
  paymentTotal: number;
  costTotal: number;
  debt: number;

  products: OrderBuyProducts[];
  payments: Payment[];
  costs: Cost[];
}
