import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxGalleryAction, NgxGalleryImage, NgxGalleryOptions, NgxGalleryImageSize } from 'ngx-gallery';
import { PhotoForProduct } from 'src/app/_shared/intefaces/public/photo-for-product';
import { PhotoService } from 'src/app/_shared/services/public/photo.service';
import { environment } from 'src/environments/environment';
import { ConfirmDialogService } from '../../services/public/confirm-dialog.service';

@Component({
  selector: 'app-product-photo-gallery',
  templateUrl: './product-photo-gallery.component.html',
  styleUrls: ['./product-photo-gallery.component.css']
})
export class ProductPhotoGalleryComponent implements OnChanges {
  baseUrl = environment.URL;

  
  galleryImages: NgxGalleryImage[] = [];

  @Input() photos: PhotoForProduct[] = [];
  galleryOptions: NgxGalleryOptions[];

  @Output() newMainPhoto = new EventEmitter<PhotoForProduct>();

  constructor(private photoService: PhotoService, private confirmService: ConfirmDialogService, private snackBar: MatSnackBar) {}

  ngOnChanges(changes: SimpleChanges) {
    const change = changes['photos'];
    if (change.currentValue !== change.previousValue) {
      this.getImagesForGallery(change.currentValue);
    }
  }

  private getImagesForGallery(photos: PhotoForProduct[]) {
    const deleteAction: NgxGalleryAction[] = [
      {
        icon: 'fa fa-trash',
        titleText: 'Delete photo',
        onClick: this.deletePhoto.bind(this)
      },
      {
        icon: 'fa fa-check-circle',
        titleText: 'Set main',
        onClick: this.setMainPhoto.bind(this)
      }
    ];

    this.galleryOptions = [
      {
        width: '600px',
        height: '545px',
        imageSize: NgxGalleryImageSize.Contain,
        imageAutoPlay: true,
        imageAutoPlayPauseOnHover: true,
        thumbnailActions: deleteAction,
        previewAutoPlay: true,
        previewAutoPlayPauseOnHover: true,
        previewInfinityMove: true,
        thumbnailsMargin: 32
      },
      { breakpoint: 500, width: '300px', height: '300px', thumbnailsColumns: 3 },
      { breakpoint: 300, width: '100%', height: '200px', thumbnailsColumns: 2 }
    ];

    if (photos) {
      photos.forEach(photo => {
        if (this.galleryImages.findIndex(p => p.url === photo.photoId.toString()) === -1) {
          const image = <NgxGalleryImage>{
            small: photo.photoUrl,
            medium: photo.photoUrl,
            big: photo.photoUrl,
            url: photo.photoId.toString()
          };

          this.galleryImages.push(image);
        }
      });
    } else {
      const image = <NgxGalleryImage>{
        small: 'assets/default.jpg',
        medium: 'assets/default.jpg',
        big: 'assets/default.jpg'
      };
      this.galleryImages.push(image);
    }
  }

  deletePhoto(index: number): void {
    const dialogRef = this.confirmService.openDialog('Are you sure to delete this photo?');

    dialogRef.afterClosed().subscribe((res: boolean) => {
      if (res) {
        const photoId = +this.galleryImages[index].url;
        this.galleryImages.splice(index, 1);

        this.photoService.deletePhoto(photoId).subscribe((photo: PhotoForProduct) => {
          if (photo) {
            this.snackBar.open('Photo deleted', 'Success');
          }
        });
      }
    });
  }

  setMainPhoto(index: number): void {
    const photoId = +this.galleryImages[index].url;

    const photoToUpdate = <PhotoForProduct>{
      photoId: photoId,
      productId: this.photos[0].productId,
      isMain: true
    };

    this.photoService.setMainPhotoForProduct(photoToUpdate).subscribe((photo: PhotoForProduct) => {
      if (photo) {
        this.newMainPhoto.emit(photo);
        this.snackBar.open('Photo has set to main', 'Success');
      }
    });
  }
}
