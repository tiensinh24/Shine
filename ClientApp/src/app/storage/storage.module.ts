import { NgModule } from '@angular/core';
import { StorageProductEditDialogComponent } from './_dialogs/storage-product-edit-dialog/storage-product-edit-dialog.component';
import { StorageAddImportComponent } from './storage-add-import/storage-add-import.component';
import { StorageDetailComponent } from './storage-detail/storage-detail.component';
import { StorageListComponent } from './storage-list/storage-list.component';
import { StorageRoutingModule } from './storage-routing.module';
import { StorageComponent } from './storage.component';
import { MaterialSharedModule } from '../_shared/material-shared.module';
import { SharedModule } from '../_shared/shared.module';
import { StorageProductsListComponent } from './storage-products-list/storage-products-list.component';

@NgModule({
  declarations: [
    StorageComponent,
    StorageListComponent,
    StorageDetailComponent,
    StorageAddImportComponent,
    StorageProductEditDialogComponent,
    StorageProductsListComponent
  ],
  imports: [
    // Shared Module
    SharedModule,

    // Material Module
    MaterialSharedModule,

    // Routing
    StorageRoutingModule
  ],
  entryComponents: [StorageProductEditDialogComponent]
})
export class StorageModule {}
