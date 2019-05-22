import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StorageDetailComponent } from './storage-detail/storage-detail.component';
import { StorageListComponent } from './storage-list/storage-list.component';
import { StorageRoutingModule } from './storage-routing.module';
import { StorageComponent } from './storage.component';
import { MaterialSharedModule } from '../_shared/material-shared.module';
import { SharedModule } from '../_shared/shared.module';

@NgModule({
  declarations: [StorageComponent, StorageListComponent, StorageDetailComponent],
  imports: [
    // Shared Module
    SharedModule,

    // Material Module
    MaterialSharedModule,

    // Routing
    StorageRoutingModule
  ]
})
export class StorageModule {}
