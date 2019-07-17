export interface Cost {
  costId: number;
  costDate: Date;
  description: string;
  amount: number;
  currency: boolean;
  rate: number;
  orderId: number;
}
