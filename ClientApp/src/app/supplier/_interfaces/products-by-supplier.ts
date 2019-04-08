import { SupplierList } from './supplier-list';
import { ProductBuyList } from 'src/app/product/buy/_interfaces/product-buy-list';

// export interface ProductsBySupplierDto {
//   personId: number;
//   productId: number;
//   productName: string;
//   specification: string;
//   price: number;
//   categoryId: number;
//   categoryName: string;
// }

export interface ProductsGroupBySupplier {
  supplier: SupplierList;
  products: ProductBuyList[];
}
