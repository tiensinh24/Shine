import { NgModule } from '@angular/core';
import { PhotoGalleryComponent } from './photo-gallery.component';
import { MaterialSharedModule } from '../../material-shared.module';
import { SharedModule } from '../../shared.module';

@NgModule({
  declarations: [PhotoGalleryComponent],
  exports: [PhotoGalleryComponent],
  imports: [SharedModule, MaterialSharedModule]
})
export class PhotoGallerySharedModule {}
