import { SupplierReportHomeComponent } from './supplier-report-home/supplier-report-home.component';
import { SupplierReportRoutingModule } from './supplier-report-routing.module';
import { SupplierReportComponent } from './supplier-report.component';
import { NgModule } from '@angular/core';
import { SupplierReportDebtModule } from 'src/app/_shared/components/_buy/suppliers/_reports/supplier-report-debt/supplier-report-debt.module';
import { MaterialSharedModule } from 'src/app/_shared/material-shared.module';
import { SharedModule } from 'src/app/_shared/shared.module';

@NgModule({
  declarations: [SupplierReportComponent, SupplierReportHomeComponent],
  imports: [
    // Shared module
    SharedModule,

    // Material
    MaterialSharedModule,

    // Report
    SupplierReportDebtModule,

    // Routing
    SupplierReportRoutingModule
  ]
})
export class SupplierReportModule {}
