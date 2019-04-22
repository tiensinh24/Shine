import { Component, Input, OnInit } from '@angular/core';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryImageSize, NgxGalleryOptions } from 'ngx-gallery';
import { PhotoForPerson } from 'src/app/photo/_interfaces/photo-for-person';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.css']
})
export class PhotoGalleryComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];

  @Input() photos: PhotoForPerson[] = [];

  constructor() {}

  ngOnInit() {
    this.getImagesForGallery(this.photos);
  }

  private getImagesForGallery(photos: PhotoForPerson[]) {
    this.galleryOptions = [
      {
        width: '545px',
        height: '545px',
        imageSize: NgxGalleryImageSize.Contain,
        imageAutoPlay: true,
        imageAutoPlayPauseOnHover: true,
        previewAutoPlay: true,
        previewAutoPlayPauseOnHover: true,
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
          big: photo.photoUrl
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
