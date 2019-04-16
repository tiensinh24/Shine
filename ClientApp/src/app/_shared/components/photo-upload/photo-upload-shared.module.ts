import { NgModule } from '@angular/core';
import { FileUploadModule } from 'ng2-file-upload';

import { PhotoUploadComponent } from './photo-upload.component';
import { SharedModule } from '../../shared.module';
import { MaterialSharedModule } from '../../material-shared.module';

@NgModule({
  declarations: [PhotoUploadComponent],
  exports: [PhotoUploadComponent],
  imports: [SharedModule, MaterialSharedModule, FileUploadModule]
})
export class PhotoUploadSharedModule {}
