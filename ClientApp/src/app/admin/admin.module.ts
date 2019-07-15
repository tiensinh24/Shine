import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { SidenavBuyComponent } from './nav-menu/sidenav-buy/sidenav-buy.component';
import { SidenavSellComponent } from './nav-menu/sidenav-sell/sidenav-sell.component';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../_shared/shared.module';
import { MaterialSharedModule } from '../_shared/material-shared.module';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';

@NgModule({
  declarations: [AdminComponent, AdminDashboardComponent, NavMenuComponent, SidenavBuyComponent, SidenavSellComponent],
  imports: [
    // rwa modules
    SharedModule,

    // Material
    MaterialSharedModule,

    AdminRoutingModule
  ],
           
})
export class AdminModule {}
