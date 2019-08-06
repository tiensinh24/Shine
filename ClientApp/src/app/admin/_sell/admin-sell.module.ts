import { NgModule } from "@angular/core";

import { AdminSellRoutingModule } from "./admin-sell-routing.module";
import { AdminSellComponent } from "./admin-sell.component";
import { MaterialSharedModule } from "src/app/_shared/material-shared.module";
import { SharedModule } from "src/app/_shared/shared.module";
import { AdminSellHomeComponent } from "./admin-sell-home/admin-sell-home.component";

@NgModule({
  declarations: [AdminSellComponent, AdminSellHomeComponent],
  imports: [
    // Shared module
    SharedModule,

    // Material
    MaterialSharedModule,

    // Routing
    AdminSellRoutingModule
  ]
})
export class AdminSellModule {}
