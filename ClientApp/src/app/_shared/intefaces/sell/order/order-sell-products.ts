export interface OrderSellProducts {
  orderId: number;
  productId: number;
  productName: string;
  productPhotoUrl: string;
  specification: string;
  quantity: number;
  price: number;
  tax: number;
  rate: number;
  unit: string;
  total: number;
}
