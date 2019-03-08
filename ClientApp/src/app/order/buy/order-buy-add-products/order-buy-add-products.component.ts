import { Component, OnInit, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { ProductBuy } from 'src/app/product/buy/_interfaces/product-buy';
import { Subscription } from 'rxjs';
import { ProductBuyService } from 'src/app/product/buy/_services/product-buy.service';
import { SupplierService } from 'src/app/supplier/_services/supplier.service';
import { ProductsBySupplierDto } from 'src/app/supplier/_interfaces/products-by-supplier';

@Component({
  selector: 'app-order-buy-add-products',
  templateUrl: './order-buy-add-products.component.html',
  styleUrls: ['./order-buy-add-products.component.css']
})
export class OrderBuyAddProductsComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() supplierId: number;

  products: ProductsBySupplierDto[];

  productsSub: Subscription;

  constructor(private supplierService: SupplierService) { }

  ngOnInit() {
    
  }

  ngAfterViewInit(): void {
    this.getProductsBySupplier(this.supplierId);
  }

  ngOnDestroy(): void {
    this.productsSub.unsubscribe();
  }

  getProductsBySupplier(supplierId: number) {
    this.productsSub = this.supplierService.getProductsBySupplier(supplierId).subscribe(res => {
      this.products = res;
      console.log(this.products);
    });
  }

}
