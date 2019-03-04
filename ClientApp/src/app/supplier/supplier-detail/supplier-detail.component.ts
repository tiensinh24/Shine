import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort, MatPaginator, MatTableDataSource, MatDialogConfig, MatDialog } from '@angular/material';

import { SupplierService } from '../_services/supplier.service';
import { SupplierListDto, ProductsBySupplierDto } from '../_interfaces/products-by-supplier';
import { SupplierProduct } from '../_interfaces/supplierProduct';
import { SupplierProductsDto } from '../_interfaces/supplierProductsDto';
import { SupplierEditDialogComponent } from 'src/app/_shared/components/supplier-edit-dialog/supplier-edit-dialog.component';
import { SupplierDto } from '../_interfaces/supplierDto';

@Component({
  selector: 'app-supplier-detail',
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['./supplier-detail.component.css']
})
export class SupplierDetailComponent implements AfterViewInit {
  displayedcolumn = ['name', 'specification', 'price', 'categoryName', 'actions'];
  supplier: SupplierListDto;
  products = new MatTableDataSource<ProductsBySupplierDto>([]);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private supplierService: SupplierService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog) { }

  ngAfterViewInit(): void {
    const id = +this.route.snapshot.params.supplierId;
    this.supplierService.getProductsGroupBySupplier(id).subscribe(res => {
      this.supplier = res.supplier;
      this.products = new MatTableDataSource<ProductsBySupplierDto>(res.products);
      setTimeout(() => (this.products.sort = this.sort));
      setTimeout(() => (this.products.paginator = this.paginator));
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

  addProducts() {
    this.router.navigate([`/supplier/${this.supplier.personId}/add-products`]);
  }

  // Open supplier-edit dialog
  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    // Width & height
    dialogConfig.maxWidth = '100vw';
    dialogConfig.maxHeight = '100vh';
    dialogConfig.minWidth = '100%';
    dialogConfig.height = '100%';

    // Send data to supplier edit dialog component
    if (this.supplier) {
      dialogConfig.data = {
        personId: this.supplier.personId,
        personNumber: this.supplier.personNumber,
        gender: this.supplier.gender,
        firstName: this.supplier.firstName,
        lastName: this.supplier.lastName,
        dateOfBirth: this.supplier.dateOfBirth,
        telephone: this.supplier.telephone,
        fax: this.supplier.fax,
        countryId: this.supplier.countryId,
      };

      const dialogRef = this.dialog.open(
        SupplierEditDialogComponent,
        dialogConfig,
      );

      // Get data returned from supplier-edit dialog
      dialogRef.afterClosed().subscribe((res: SupplierDto) => {
        if (res) {
          this.supplier = res;
        }
      });
    }

  }
}
