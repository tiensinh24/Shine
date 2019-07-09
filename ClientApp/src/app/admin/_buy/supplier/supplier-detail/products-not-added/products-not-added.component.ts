import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ProductBuy } from 'src/app/_shared/intefaces/buy/product/product-buy';
import { SupplierService } from 'src/app/_shared/services/buy/supplier.service';
import { ConfirmDialogService } from 'src/app/_shared/services/public/confirm-dialog.service';
import { SupplierProduct } from 'src/app/_shared/intefaces/buy/supplier/supplier-product';

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
  dataSource?: ProductsNotAdded[];
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
      this.supplierService.getProductsNotAdded(supplierId).subscribe((res: ProductsNotAdded[]) => {
        this.dataSource = res;
      });
    }
  }

  onAdd(product: ProductBuy) {
    const entity = <SupplierProduct>{
      personId: this.supplierId,
      productId: product.productId
    };

    const dialogRef = this.confirmService.openDialog(`Are you sure to add this product?`);

    dialogRef.afterClosed().subscribe(dialogRes => {
      if (dialogRes) {
        this.supplierService.addSupplierProduct(entity).subscribe(() => {
          this.snackBar.open(`${product.productName} added`, 'Success');

          // Array.some break when return true
          this.dataSource.some(pna => {
            const proIndex = pna.products.findIndex(p => p.productId === product.productId);

            // Remove newly add product
            if (proIndex !== -1) {
              pna.products.splice(proIndex, 1);

              // Remove category without any products
              if (pna.products.length === 0) {
                const catIndex = this.dataSource.findIndex(pn => pn.category === pna.category);

                this.dataSource.splice(catIndex, 1);
              }

              return true;
            }
          });
        });
      }
    });
  }
}
