export interface ProductOrder {
    orderId: number;
    productId: number;
    quantity: number;
    price: number;
    tax: number;
    rate: number;
    unit: string;

    productName: string;
}
