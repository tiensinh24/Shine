import { PhotoForProduct } from '../../public/photo-for-product';

export interface ProductSellDetail {
  productId: number;
  productName: string;
  specification: string;
  categoryId: number;
  categoryName: string;

  photos: PhotoForProduct[];
}
