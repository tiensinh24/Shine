import { NgModule } from '@angular/core';
import { MaterialSharedModule } from '../../material-shared.module';
import { SharedModule } from '../../shared.module';
import { PersonPhotoGalleryComponent } from '../person-photo-gallery/person-photo-gallery.component';

@NgModule({
  declarations: [PersonPhotoGalleryComponent],
  exports: [PersonPhotoGalleryComponent],
  imports: [SharedModule, MaterialSharedModule]
})
export class PersonPhotoGallerySharedModule {}