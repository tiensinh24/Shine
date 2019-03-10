export interface ProductOrderDto {
    orderId: number;
    productId: number;
    quantity: number;
    price: number;
    tax: number;
    rate: number;
    unit: string;

    productName: string;
}
