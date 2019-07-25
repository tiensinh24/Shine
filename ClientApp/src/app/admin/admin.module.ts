import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../_shared/shared.module';
import { MaterialSharedModule } from '../_shared/material-shared.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';

@NgModule({
  declarations: [AdminComponent, AdminHomeComponent],
  imports: [
    // rwa modules
    SharedModule,

    // Material
    MaterialSharedModule,

    AdminRoutingModule
  ]
})
export class AdminModule {}
