import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ManagerUserComponent } from './manager-user/manager-user.component';
import { ManagerRoleComponent } from './manager-role/manager-role.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatTabsModule } from '@angular/material';

@NgModule({
  declarations: [
    AdminComponent,
    ManagerUserComponent,
    ManagerRoleComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    AdminRoutingModule
  ],
})
export class AdminModule {}
