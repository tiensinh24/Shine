import { SupplierEditDialogComponent } from 'src/app/_shared/components/supplier-edit-dialog/supplier-edit-dialog.component';

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { SupplierService } from '../_services/supplier.service';
import { SupplierDetail } from '../_interfaces/supplier-detail';
import { PhotoForPerson } from 'src/app/photo/_interfaces/photo-for-person';
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation,
  NgxGalleryLayout,
  NgxGalleryImageSize,
  NgxGalleryOrder
} from 'ngx-gallery';

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
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];

  constructor(private supplierService: SupplierService, private route: ActivatedRoute, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getSupplier();
  }

  getImage(photos?: PhotoForPerson[]) {
    this.galleryOptions = [
      {
        width: '100%',
        height: '220px',

        imageArrows: false,
        imageArrowsAutoHide: true,
        imageSize: NgxGalleryImageSize.Contain,
        imageInfinityMove: true,
        imageBullets: true,
        imageAutoPlay: true,
        imageAutoPlayPauseOnHover: true,
        previewCloseOnClick: true,
        previewCloseOnEsc: true,
        thumbnails: false,
        imageAnimation: NgxGalleryAnimation.Slide
      }
    ];

    photos.forEach(photo => {
      const image = <NgxGalleryImage>{
        small: photo.photoUrl,
        medium: photo.photoUrl,
        big: photo.photoUrl,
        description: photo.description
      };
      this.galleryImages.push(image);
    });
  }

  getSupplier() {
    this.supplierId = +this.route.snapshot.params.supplierId;

    this.supplierService.getSupplier(this.supplierId).subscribe(res => {
      if (res) {
        this.supplier = res;
        this.mainPhotoUrl = res.photos.find(p => p.isMain === true).photoUrl;
        this.title = `Add products for ${res.fullName}`;
        this.getImage(res.photos);
      }
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
