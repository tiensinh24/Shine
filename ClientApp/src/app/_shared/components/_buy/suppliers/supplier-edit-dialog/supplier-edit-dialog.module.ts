import { SupplierEditDialogComponent } from './supplier-edit-dialog.component';
import { PhotoUploadModule } from '../../../photo-upload/photo-upload.module';
import { NgModule } from '@angular/core';
import { MaterialSharedModule } from 'src/app/_shared/material-shared.module';
import { SharedModule } from 'src/app/_shared/shared.module';



@NgModule({
  declarations: [SupplierEditDialogComponent],
  entryComponents: [SupplierEditDialogComponent],
  exports: [SupplierEditDialogComponent],
  imports: [SharedModule, MaterialSharedModule, PhotoUploadModule]
})
export class SupplierEditDialogModule {}
