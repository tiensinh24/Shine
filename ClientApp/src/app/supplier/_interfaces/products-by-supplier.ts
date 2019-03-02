interface Supplier {
  personId: number;
  fullName: string;
}

interface Product {
  productName: string;
  specification: string;
}

export interface ProductsBySupplier {
  supplier: Supplier;
  products: Product[];
}
