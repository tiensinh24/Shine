import { SupplierEditDialogComponent } from 'src/app/_shared/components/supplier-edit-dialog/supplier-edit-dialog.component';

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { SupplierService } from '../_services/supplier.service';
import { SupplierDetail } from '../_interfaces/supplier-detail';
import { PhotoForPerson } from 'src/app/photo/_interfaces/photo-for-person';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-supplier-detail',
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['./supplier-detail.component.css']
})
export class SupplierDetailComponent implements OnInit {
  supplier = <SupplierDetail>{};
  photos = <PhotoForPerson[]>{};
  mainPhotoUrl = '';
  isAddProducts = false;
  supplierId: number;
  title: string;

  // Ngx-Gallery
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private supplierService: SupplierService, private route: ActivatedRoute, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getSupplier();
  }

  getImage() {
    this.galleryOptions = [
      {
        width: '400px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    this.galleryImages = [
      {
        small: 'assets/1-small.jpg',
        medium: 'assets/1-medium.jpg',
        big: 'assets/1-big.jpg'
        // url: `${this.mainPhotoUrl}`
      },
      {
        small: 'assets/1-small.jpg',
        medium: 'assets/1-medium.jpg',
        big: 'assets/1-big.jpg'
      }
      // {
      //   small: 'assets/3-small.jpg',
      //   medium: 'assets/3-medium.jpg',
      //   big: 'assets/3-big.jpg'
      // }
    ];
  }

  getSupplier() {
    this.supplierId = +this.route.snapshot.params.supplierId;

    this.supplierService.getSupplier(this.supplierId).subscribe(res => {
      this.supplier = res;
      this.mainPhotoUrl = res.photos.find(p => p.isMain === true).photoUrl;
      this.title = `Add products for ${res.fullName}`;
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
