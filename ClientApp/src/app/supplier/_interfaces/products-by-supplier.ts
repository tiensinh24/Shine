export interface SupplierListDto {
  personId: number;
  personNumber: string;
  gender: boolean;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  telephone: string;
  fax: string;
  countryId: number;
  countryName: string;
  continentName: string;
}

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
  supplier: SupplierListDto;
  products: ProductsBySupplierDto[];
}
