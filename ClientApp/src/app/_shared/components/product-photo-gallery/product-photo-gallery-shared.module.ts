import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductPhotoGalleryComponent } from './product-photo-gallery.component';
import { MaterialSharedModule } from '../../material-shared.module';
import { SharedModule } from '../../shared.module';

@NgModule({
  declarations: [ProductPhotoGalleryComponent],
  exports: [ProductPhotoGalleryComponent],
  imports: [SharedModule, MaterialSharedModule]
})
export class ProductPhotoGallerySharedModule {}
