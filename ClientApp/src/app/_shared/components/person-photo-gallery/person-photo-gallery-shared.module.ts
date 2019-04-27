import { NgModule } from '@angular/core';
import { PersonPhotoGalleryComponent } from './person-photo-gallery.component';
import { MaterialSharedModule } from '../../material-shared.module';
import { SharedModule } from '../../shared.module';

@NgModule({
  declarations: [PersonPhotoGalleryComponent],
  exports: [PersonPhotoGalleryComponent],
  imports: [SharedModule, MaterialSharedModule]
})
export class PersonPhotoGallerySharedModule {}
