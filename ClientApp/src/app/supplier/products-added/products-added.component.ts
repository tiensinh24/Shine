import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { SupplierDto } from '../_interfaces/supplier-dto';
import { ProductsBySupplierDto } from '../_interfaces/products-by-supplier';
import { SupplierService } from '../_services/supplier.service';
import { SupplierProduct } from '../_interfaces/supplier-product';

@Component({
  selector: 'app-products-added',
  templateUrl: './products-added.component.html',
  styleUrls: ['./products-added.component.css']
})
export class ProductsAddedComponent implements AfterViewInit {
  displayedcolumn = ['name', 'specification', 'categoryName', 'actions'];
  supplier: SupplierDto;
  products = new MatTableDataSource<ProductsBySupplierDto>([]);
  isAddProducts = false;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private supplierService: SupplierService,
    private route: ActivatedRoute) { }

  ngAfterViewInit(): void {
    const id = +this.route.snapshot.params.supplierId;
    this.supplierService.getProductsGroupBySupplier(id).subscribe(res => {
      this.supplier = res.supplier;
      this.products = new MatTableDataSource<ProductsBySupplierDto>(res.products);
      setTimeout(() => (this.products.sort = this.sort));
      setTimeout(() => (this.products.paginator = this.paginator));
    });

    this.supplierService.getSupplier(id).subscribe(res => {
      this.supplier = res;
    });
  }

  DeleteProductFromSupplier(productId: number) {
    const supplierId = this.supplier.personId;
    const delEntity = <SupplierProduct>{
      personId: supplierId,
      productId: productId
    };
    this.supplierService.deleteSupplierProduct(delEntity).subscribe(() => {
      this.refreshProducts(productId);
    });
  }

  refreshProducts(productId: number) {
    const index = this.products.data.findIndex(p => p.productId === productId);

    if (index > -1) {
      this.products.data.splice(index, 1);
      this.products._updateChangeSubscription();
    }
  }
}
