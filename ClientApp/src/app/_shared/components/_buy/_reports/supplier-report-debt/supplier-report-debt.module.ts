import { NgModule } from '@angular/core';
import { SupplierReportDebtComponent } from './supplier-report-debt.component';
import { SharedModule } from 'src/app/_shared/shared.module';
import { MaterialSharedModule } from 'src/app/_shared/material-shared.module';

@NgModule({
  declarations: [SupplierReportDebtComponent],
  imports: [
    // Share module
    SharedModule,

    // Material
    MaterialSharedModule
  ],
  exports: [
    // Components
    SupplierReportDebtComponent
  ]
})
export class SupplierReportDebtModule {}
