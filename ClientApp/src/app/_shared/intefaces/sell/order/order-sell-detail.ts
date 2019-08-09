import { Cost } from "../../public/cost";
import { Payment } from "../../public/payment";
import { EmployeeList } from "../../public/employee-list";
import { CustomerList } from "../customer/customer-list";
import { OrderSellProducts } from "./order-sell-products";

export interface OrderSellDetail {
  orderId: number;
  orderNumber: string;
  dateOfIssue: Date;
  timeForPayment: Date;
  personId: number;
  customer: CustomerList;
  employeeId: number;
  employee: EmployeeList;
  rating: number;

  orderTotal: number;
  paymentTotal: number;
  costTotal: number;
  debt: number;

  products: OrderSellProducts[];
  payments: Payment[];
  costs: Cost[];
}
