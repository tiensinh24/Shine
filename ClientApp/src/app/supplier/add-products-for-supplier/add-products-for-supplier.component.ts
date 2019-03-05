import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SupplierService } from '../_services/supplier.service';
import { SupplierProduct } from '../_interfaces/supplierProduct';
import { SupplierDto } from '../_interfaces/supplierDto';

interface Products {
  productId: number;
  name: string;
  specification: string;
  price: number;
}
interface ProductsNotAdded {
  category: string;
  products?: Products[];
}

@Component({
  selector: 'app-add-products-for-supplier',
  templateUrl: './add-products-for-supplier.component.html',
  styleUrls: ['./add-products-for-supplier.component.css']
})
export class AddProductsForSupplierComponent implements OnInit {
  productsNotAdded: ProductsNotAdded;
  supplier: SupplierDto;
  title: string;

  constructor(private supplierService: SupplierService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const id = +this.route.snapshot.params.supplierId;
    this.getProductsNotAdded(id);
    this.getSupplier(id);
  }

  getProductsNotAdded(supplierId: number) {
    if (supplierId > 0) {
      this.supplierService.getProductsNotAdded(supplierId).subscribe((res: ProductsNotAdded) => {
        this.productsNotAdded = res;
      });
    }
  }

  getSupplier(supplierId: number) {
    if (supplierId > 0) {
      this.supplierService.getSupplier(supplierId).subscribe((res: SupplierDto) => {
        this.supplier = res;
        this.title = `Add new products for ${res.firstName} ${res.lastName}`;
      });
    }
  }

  onAdd(productId: number) {
    const supplierId = +this.route.snapshot.params.supplierId;
    const entity =  <SupplierProduct>{
      personId: supplierId,
      productId: productId
    };
    this.supplierService.addSupplierProduct(entity).subscribe();
  }

}
