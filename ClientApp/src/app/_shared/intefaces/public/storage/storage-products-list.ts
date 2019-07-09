export interface StorageProductsList {
  id: string;
  storageId: number;
  productId: number;
  date: Date;
  quantity: number;
  type: boolean;
  fromTo: string;

  productName: string;
}
