import { NgModule } from '@angular/core';

import { SupplierEditDialogComponent } from './supplier-edit-dialog.component';
import { SharedModule } from '../../../shared.module';
import { MaterialSharedModule } from '../../../material-shared.module';
import { PhotoUploadComponent } from '../../photo-upload/photo-upload.component';
import { PhotoUploadSharedModule } from '../../photo-upload/photo-upload-shared.module';

@NgModule({
  declarations: [SupplierEditDialogComponent],
  entryComponents: [SupplierEditDialogComponent],
  exports: [SupplierEditDialogComponent],
  imports: [SharedModule, MaterialSharedModule, PhotoUploadSharedModule]
})
export class SupplierEditDialogSharedModule {}
