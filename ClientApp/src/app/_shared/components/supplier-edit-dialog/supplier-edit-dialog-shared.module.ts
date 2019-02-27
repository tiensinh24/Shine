import { NgModule } from '@angular/core';

import { SupplierEditDialogComponent } from './supplier-edit-dialog.component';
import { SharedModule } from '../../shared.module';
import { MaterialSharedModule } from '../../material-shared.module';

@NgModule({
  declarations: [SupplierEditDialogComponent],
  entryComponents: [SupplierEditDialogComponent],
  exports: [SupplierEditDialogComponent],
  imports: [
    SharedModule,
    MaterialSharedModule,

  ]
})
export class SupplierEditDialogSharedModule { }
