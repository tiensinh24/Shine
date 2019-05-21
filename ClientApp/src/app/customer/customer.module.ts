import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { PhotoUploadSharedModule } from '../_shared/components/photo-upload/photo-upload-shared.module';
import { MaterialSharedModule } from '../_shared/material-shared.module';
import { SharedModule } from '../_shared/shared.module';

@NgModule({
  declarations: [
    CustomerHomeComponent,
    CustomerDetailComponent,
    CustomerEditComponent,
    CustomerListComponent,
    CustomerComponent
  ],
  imports: [CommonModule, CustomerRoutingModule, PhotoUploadSharedModule, SharedModule, MaterialSharedModule]
})
export class CustomerModule {}
