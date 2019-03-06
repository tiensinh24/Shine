import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SupplierService } from '../_services/supplier.service';
import { SupplierProduct } from '../_interfaces/supplier-product';

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
  selector: 'app-products-not-added',
  templateUrl: './products-not-added.component.html',
  styleUrls: ['./products-not-added.component.css']
})
export class ProductsNotAddedComponent implements OnInit {
  productsNotAdded?: ProductsNotAdded;

  @Input() title: string;

  constructor(private supplierService: SupplierService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.params.supplierId;
    this.getProductsNotAdded(id);
  }

  private getProductsNotAdded(supplierId: number) {
    if (supplierId > 0) {
      this.supplierService.getProductsNotAdded(supplierId).subscribe((res: ProductsNotAdded) => {
        this.productsNotAdded = res;
      });
    }
  }

  onAdd(productId: number) {
    const supplierId = +this.route.snapshot.params.supplierId;
    const entity = <SupplierProduct>{
      personId: supplierId,
      productId: productId
    };
    this.supplierService.addSupplierProduct(entity).subscribe();

  }

}
