import { SupplierEditDialogComponent } from 'src/app/_shared/components/supplier-edit-dialog/supplier-edit-dialog.component';

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { SupplierService } from '../_services/supplier.service';
import { SupplierDetail } from '../_interfaces/supplier-detail';

@Component({
  selector: 'app-supplier-detail',
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['./supplier-detail.component.css']
})
export class SupplierDetailComponent implements OnInit, AfterViewInit {
  supplier: SupplierDetail;
  mainPhotoUrl: string;
  isAddProducts = false;
  supplierId: number;
  title: string;

  constructor(private supplierService: SupplierService, private route: ActivatedRoute, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.supplierId = +this.route.snapshot.params.supplierId;
  }

  ngAfterViewInit(): void {
    this.getSupplier();
  }

  getSupplier() {
    this.supplierService.getSupplier(this.supplierId).subscribe(res => {
      this.supplier = res;
      this.mainPhotoUrl = res.PhotosUrl.slice(1, 1).toString();
      this.title = `Add products for ${res.fullName}`;
      console.log(this.mainPhotoUrl);
    });
  }

  // Open supplier-edit dialog
  openDialog() {
    const dialogConfig = <MatDialogConfig>{
      disableClose: true,
      autoFocus: true,
      maxWidth: '100vw',
      width: '100vw',
      height: '100vh'
    };

    // Send data to supplier edit dialog component
    if (this.supplier) {
      dialogConfig.data = {
        personId: this.supplier.personId,
        personNumber: this.supplier.personNumber,
        gender: this.supplier.gender,
        firstName: this.supplier.firstName,
        lastName: this.supplier.lastName,
        fullName: this.supplier.fullName,
        dateOfBirth: this.supplier.dateOfBirth,
        telephone: this.supplier.telephone,
        fax: this.supplier.fax,
        countryId: this.supplier.countryId
      };

      const dialogRef = this.dialog.open(SupplierEditDialogComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          this.getSupplier();
        }
      });
    }
  }

  toggleAddProduct() {
    this.isAddProducts = !this.isAddProducts;
  }
}
