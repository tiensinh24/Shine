import { NgModule } from '@angular/core';

import { AdminBuyRoutingModule } from './admin-buy-routing.module';
import { SharedModule } from 'src/app/_shared/shared.module';
import { MaterialSharedModule } from 'src/app/_shared/material-shared.module';
import { AdminBuyComponent } from './admin-buy.component';
import { AdminBuyHomeComponent } from './admin-buy-home/admin-buy-home.component';

@NgModule({
  declarations: [AdminBuyComponent, AdminBuyHomeComponent],
  imports: [
    // Shared module
    SharedModule,

    // Material
    MaterialSharedModule,

    // Routing
    AdminBuyRoutingModule
  ]
})
export class AdminBuyModule {}
