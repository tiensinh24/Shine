import { PhotoForProduct } from 'src/app/_shared/intefaces/public/photo-for-product';

export interface ProductBuyDetail {
  productId: number;
  productName: string;
  specification: string;
  categoryId: number;
  categoryName: string;

  photos: PhotoForProduct[];
}
