import { NgModule } from "@angular/core";
import { CustomerRoutingModule } from "./customer-routing.module";
import { CustomerComponent } from "./customer.component";
import { PhotoUploadModule } from "src/app/_shared/components/photo-upload/photo-upload.module";
import { MaterialSharedModule } from "src/app/_shared/material-shared.module";
import { SharedModule } from "src/app/_shared/shared.module";
import { CustomerListHomeComponent } from './customer-list/customer-list-home.component';
import { CustomerListComponent } from './customer-list/customer-list/customer-list.component';
import { CustomerCardComponent } from './customer-list/customer-card/customer-card.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';

@NgModule({
  declarations: [CustomerComponent, CustomerListHomeComponent, CustomerListComponent, CustomerCardComponent, CustomerEditComponent],
  imports: [
    // Shared module
    SharedModule,

    // Material
    MaterialSharedModule,

    // Dialog
    // CustomerEditDialogModule,

    // Photo upload
    PhotoUploadModule,

    // Routing
    CustomerRoutingModule
  ]
})
export class CustomerModule {}
