import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxGalleryAction, NgxGalleryImage, NgxGalleryOptions } from 'ngx-gallery';
import { PhotoForProduct } from 'src/app/photo/_interfaces/photo-for-product';
import { PhotoService } from 'src/app/photo/_services/photo.service';
import { environment } from 'src/environments/environment';
import { ConfirmDialogService } from '../../_services/confirm-dialog.service';

@Component({
  selector: 'app-product-photo-gallery',
  templateUrl: './product-photo-gallery.component.html',
  styleUrls: ['./product-photo-gallery.component.css']
})
export class ProductPhotoGalleryComponent implements OnChanges {
  baseUrl = environment.URL;

  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];

  @Input() photos: PhotoForProduct[] = [];

  @Output() newMainPhoto = new EventEmitter<PhotoForProduct>();

  constructor(
    private photoService: PhotoService,
    private confirmService: ConfirmDialogService,
    private snackBar: MatSnackBar
  ) {}

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
        width: '100%',
        imageSize: 'contain',
        imageActions: deleteAction,
        imageInfinityMove: true,
        thumbnailsMoveSize: 4
      }
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

  deletePhoto(event: Event, index: number): void {
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

  setMainPhoto(event: Event, index: number): void {
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
