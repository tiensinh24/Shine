import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerComponent } from './customer.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PhotoUploadComponent } from '../_shared/components/photo-upload/photo-upload.component';
import { FileUploadModule } from 'ng2-file-upload';
import { PhotoUploadSharedModule } from '../_shared/components/photo-upload/photo-upload-shared.module';

@NgModule({
  declarations: [
    CustomerHomeComponent,
    CustomerDetailComponent,
    CustomerEditComponent,
    CustomerListComponent,
    CustomerComponent
  ],
  imports: [CommonModule, CustomerRoutingModule, PhotoUploadSharedModule]
})
export class CustomerModule {}
