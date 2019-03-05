import { SupplierDto } from './supplier-dto';

export interface ProductsBySupplierDto {
  personId: number;
  productId: number;
  name: string;
  specification: string;
  price: number;
  categoryId: number;
  categoryName: string;
}

export interface ProductsGroupBySupplier {
  supplier: SupplierDto;
  products: ProductsBySupplierDto[];
}
