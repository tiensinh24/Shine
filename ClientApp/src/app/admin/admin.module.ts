import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AppComponent } from '../app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { PageNotFoundComponent } from '../_shared/components/page-not-found/page-not-found.component';
import { LogInComponent } from '../_shared/components/log-in/log-in.component';
import { SidenavBuyComponent } from './nav-menu/sidenav-buy/sidenav-buy.component';
import { SidenavSellComponent } from './nav-menu/sidenav-sell/sidenav-sell.component';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../_shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MaterialSharedModule } from '../_shared/material-shared.module';
import { ConfirmDialogSharedModule } from '../_shared/components/confirm-dialog/confirm-dialog-shared.module';
import { CoreModule } from '../_shared/core/core.module';

@NgModule({
  declarations: [AdminComponent, AdminDashboardComponent, NavMenuComponent, SidenavBuyComponent, SidenavSellComponent],
  imports: [
    // rwa modules
    SharedModule,

    // Material
    MaterialSharedModule,

    AdminRoutingModule
  ]
})
export class AdminModule {}
