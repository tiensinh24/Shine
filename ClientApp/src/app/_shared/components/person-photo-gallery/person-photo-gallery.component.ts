import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxGalleryAction, NgxGalleryImage, NgxGalleryImageSize, NgxGalleryOptions } from 'ngx-gallery';
import { Photo } from 'src/app/photo/_interfaces/photo';
import { PhotoForPerson } from 'src/app/photo/_interfaces/photo-for-person';
import { PhotoService } from 'src/app/photo/_services/photo.service';
import { environment } from 'src/environments/environment';
import { ConfirmDialogService } from '../../_services/confirm-dialog.service';

@Component({
  selector: 'app-person-photo-gallery',
  templateUrl: './person-photo-gallery.component.html',
  styleUrls: ['./person-photo-gallery.component.css']
})
export class PersonPhotoGalleryComponent implements OnInit {
  baseUrl = environment.URL;

  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];

  @Input() photos: PhotoForPerson[] = [];

  @Output() newMainPhoto = new EventEmitter<PhotoForPerson>();

  constructor(
    private photoService: PhotoService,
    private confirmService: ConfirmDialogService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getImagesForGallery(this.photos);
  }

  private getImagesForGallery(photos: PhotoForPerson[]) {
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
        const image = <NgxGalleryImage>{
          small: photo.photoUrl,
          medium: photo.photoUrl,
          big: photo.photoUrl,
          url: photo.photoId.toString()
        };
        this.galleryImages.push(image);
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

        this.photoService.deletePhoto(photoId).subscribe((photo: PhotoForPerson) => {
          if (photo) {
            this.snackBar.open('Photo deleted', 'Success');
          }
        });
      }
    });
  }

  setMainPhoto(event: Event, index: number): void {
    const photoId = +this.galleryImages[index].url;

    const photoToUpdate = <PhotoForPerson>{
      photoId: photoId,
      personId: this.photos[0].personId,
      isMain: true
    };

    this.photoService.setMainPhotoForPerson(photoToUpdate).subscribe((photo: PhotoForPerson) => {
      if (photo) {
        this.newMainPhoto.emit(photo);
        this.snackBar.open('Photo has set to main', 'Success');
      }
    });
  }
}
