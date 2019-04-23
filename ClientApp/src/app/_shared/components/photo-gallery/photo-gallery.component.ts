import { Component, Input, OnInit } from '@angular/core';
import { NgxGalleryAction, NgxGalleryImage, NgxGalleryImageSize, NgxGalleryOptions } from 'ngx-gallery';
import { PhotoForPerson } from 'src/app/photo/_interfaces/photo-for-person';
import { PhotoService } from 'src/app/photo/_services/photo.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.css']
})
export class PhotoGalleryComponent implements OnInit {
  baseUrl = environment.URL;

  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];

  @Input() photos: PhotoForPerson[] = [];

  constructor(private photoService: PhotoService) {}

  ngOnInit() {
    this.getImagesForGallery(this.photos);
  }

  private getImagesForGallery(photos: PhotoForPerson[]) {
    const deleteAction: NgxGalleryAction = {
      icon: 'fa fa-trash',
      titleText: 'Delete photo',
      onClick: (event: Event) => {
        this.photoService.deletePhoto(`${this.baseUrl}api/photo/${event.currentTarget.}`)
      }

    };

    this.galleryOptions = [
      {
        width: '545px',
        height: '545px',
        imageSize: NgxGalleryImageSize.Contain,
        imageAutoPlay: true,
        imageAutoPlayPauseOnHover: true,
        thumbnailActions: [deleteAction],
        previewAutoPlay: true,
        previewAutoPlayPauseOnHover: true,
        previewInfinityMove: true,
        thumbnailsMargin: 32
      },
      { breakpoint: 500, width: '300px', height: '300px', thumbnailsColumns: 3 },
      { breakpoint: 300, width: '100%', height: '200px', thumbnailsColumns: 2 }
    ];

    if (photos.length > 0) {
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
}
