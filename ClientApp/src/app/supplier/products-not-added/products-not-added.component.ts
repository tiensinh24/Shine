import { ProductBuy } from 'src/app/product/buy/_interfaces/product-buy';

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SupplierProduct } from '../_interfaces/supplier-product';
import { SupplierService } from '../_services/supplier.service';
import { ConfirmDialogService } from 'src/app/_shared/_services/confirm-dialog.service';
import { MatSnackBar } from '@angular/material';

interface ProductsNotAdded {
  category: string;
  products?: ProductBuy[];
}

@Component({
  selector: 'app-products-not-added',
  templateUrl: './products-not-added.component.html',
  styleUrls: ['./products-not-added.component.css']
})
export class ProductsNotAddedComponent implements OnInit {
  productsNotAdded?: ProductsNotAdded;
  supplierId = +this.route.snapshot.params.supplierId;

  @Input() title: string;

  constructor(
    private supplierService: SupplierService,
    private route: ActivatedRoute,
    private confirmService: ConfirmDialogService,
    private snackBar: MatSnackBar
  ) {}

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
    const entity = <SupplierProduct>{
      personId: this.supplierId,
      productId: productId
    };

    const dialogRef = this.confirmService.openDialog(`Are you sure to add this product?`);

    // TODO remove newly add product
    dialogRef.afterClosed().subscribe(dialogRes => {
      if (dialogRes) {
        this.supplierService.addSupplierProduct(entity).subscribe((res: SupplierProduct) => {
          if (res) {
            this.snackBar.open(`Product Added`, 'Succes');
            // Find index of newly add product
            const index = this.productsNotAdded.products.findIndex(p => p.productId === res.productId);

            // Remove newly add product from products list
            if (index > -1) {
              this.productsNotAdded.products.splice(index, 1);
            }
          }
        });
      }
    });
  }
}
