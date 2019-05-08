export interface OrderBuyProducts {
  orderId: number;
  productId: number;
  productName: string;
  specification: string;
  quantity: number;
  price: number;
  tax: number;
  rate: number;
  unit: string;
  total: number;
}
