import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryImageSize, NgxGalleryOptions } from 'ngx-gallery';
import { SupplierEditDialogComponent } from 'src/app/_shared/components/supplier-edit-dialog/supplier-edit-dialog.component';
import { PhotoForPerson } from 'src/app/photo/_interfaces/photo-for-person';
import { SupplierDetail } from '../_interfaces/supplier-detail';
import { SupplierService } from '../_services/supplier.service';

@Component({
  selector: 'app-supplier-detail',
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['./supplier-detail.component.css']
})
export class SupplierDetailComponent implements OnInit {
  supplier = <SupplierDetail>{};
  photos = <PhotoForPerson[]>{};
  mainPhotoUrl = 'assets/default.jpg';
  supplierId: number;
  title: string;
  multiButton = false;
  isGallery = false;
  isUpload = false;
  isList = true;
  isAdd = false;
  isNoPhoto = false;

  // Ngx-Gallery
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];

  constructor(private supplierService: SupplierService, private route: ActivatedRoute, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getSupplier();
  }

  getImagesForGallery(photos: PhotoForPerson[]) {
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

    if (photos.length > 0) {
      photos.forEach(photo => {
        const image = <NgxGalleryImage>{
          small: photo.photoUrl,
          medium: photo.photoUrl,
          big: photo.photoUrl
        };
        this.galleryImages.push(image);
      });
    } else {
      this.isNoPhoto = true;

      const image = <NgxGalleryImage>{
        small: 'assets/default.jpg',
        medium: 'assets/default.jpg',
        big: 'assets/default.jpg'
      };
      this.galleryImages.push(image);
    }
  }

  getSupplier() {
    this.supplierId = +this.route.snapshot.params.supplierId;

    this.supplierService.getSupplier(this.supplierId).subscribe(res => {
      if (res) {
        this.supplier = res;
        if (res.photos.length > 0) {
          this.mainPhotoUrl = this.supplier.photos.find(p => p.isMain === true).photoUrl;
        }
        this.getImagesForGallery(res.photos);

        this.title = `Add products for ${res.fullName}`;
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

  // Get from @Output
  refreshPhotoUpload(photo: PhotoForPerson) {
    this.supplier.photos.push(photo);

    const image = <NgxGalleryImage>{
      small: photo.photoUrl,
      medium: photo.photoUrl,
      big: photo.photoUrl
    };

    if (this.isNoPhoto) {
      this.galleryImages.shift();
      this.isNoPhoto = false;
    }

    this.galleryImages.push(image);

    if (photo.isMain) {
      this.mainPhotoUrl = photo.photoUrl;
    }
  }

  // Get from @Output
  refreshSetMainPhoto(photo: PhotoForPerson) {
    this.mainPhotoUrl = photo.photoUrl;
  }

  toggleMultiButton() {
    this.multiButton = !this.multiButton;
  }

  toggleGallery() {
    this.isGallery = !this.isGallery;
    this.isList = false;
    this.isAdd = false;
    this.isUpload = false;
  }

  toggleUpload() {
    this.isUpload = !this.isUpload;
    this.isGallery = false;
    this.isList = false;
    this.isAdd = false;
  }

  toggleList() {
    this.isList = !this.isList;
    this.isGallery = false;
    this.isAdd = false;
    this.isUpload = false;
  }

  toggleAdd() {
    this.isAdd = !this.isAdd;
    this.isGallery = false;
    this.isUpload = false;
    this.isList = false;
  }
}
