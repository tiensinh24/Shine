import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SupplierService } from '../_services/supplier.service';

export interface Category {
  categoryName: string;
}
export interface Products {
  productId: number;
  name: string;
  specification: string;
}
export interface ProductsAdded {
  category: Category;
  products: Products[];
}

@Component({
  selector: 'app-add-products-for-supplier',
  templateUrl: './add-products-for-supplier.component.html',
  styleUrls: ['./add-products-for-supplier.component.css']
})
export class AddProductsForSupplierComponent implements OnInit {
  productsNotAdded: ProductsAdded[];

  constructor(private supplierService: SupplierService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const id = +this.route.snapshot.params.supplierId;
    if (id > 0) {
      this.supplierService.getProductsNotAdded(id).subscribe(res => {
        this.productsNotAdded = res;
      })
    }
  }

}
