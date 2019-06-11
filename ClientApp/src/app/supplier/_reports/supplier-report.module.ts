import { NgModule } from '@angular/core';

import { SupplierReportRoutingModule } from './supplier-report-routing.module';
import { SupplierReportComponent } from './supplier-report.component';
import { SupplierReportHomeComponent } from './supplier-report-home/supplier-report-home.component';
import { SupplierReportDebtComponent } from './supplier-report-debt/supplier-report-debt.component';
import { SharedModule } from 'src/app/_shared/shared.module';
import { MaterialSharedModule } from 'src/app/_shared/material-shared.module';

@NgModule({
  declarations: [SupplierReportComponent,
    SupplierReportHomeComponent,
    SupplierReportDebtComponent
  ],
  imports: [
    // Shared module
    SharedModule,

    // Material
    MaterialSharedModule,

    // Routing
    SupplierReportRoutingModule
  ]
})
export class SupplierReportModule { }
