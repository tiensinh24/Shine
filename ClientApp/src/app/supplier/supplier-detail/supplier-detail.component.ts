import {
    SupplierEditDialogComponent
} from 'src/app/_shared/components/supplier-edit-dialog/supplier-edit-dialog.component';

import { AfterViewInit, Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { SupplierList } from '../_interfaces/supplier-list';
import { SupplierService } from '../_services/supplier.service';

@Component({
  selector: 'app-supplier-detail',
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['./supplier-detail.component.css'],
})
export class SupplierDetailComponent implements AfterViewInit {
  supplier: SupplierList;
  isAddProducts = false;
  title: string;

  constructor(
    private supplierService: SupplierService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) {}

  ngAfterViewInit(): void {
    const id = +this.route.snapshot.params.supplierId;
    this.supplierService.getSupplier(id).subscribe(res => {
      this.supplier = res;
      this.title = `Add products for ${res.fullName}`;
    });
  }

  // Open supplier-edit dialog
  openDialog() {
    const dialogConfig = <MatDialogConfig>{
      disableClose: true,
      autoFocus: true,
      width: '100vw',
      height: '100vh',
    };

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
      dialogRef.afterClosed().subscribe((res: SupplierList) => {
        if (res) {
          this.supplier = res;
        }
      });
    }
  }

  toggleAddProduct() {
    this.isAddProducts = !this.isAddProducts;
  }
}
