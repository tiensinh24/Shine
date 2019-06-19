import { NgModule } from '@angular/core';

import { OrderBuyReportRoutingModule } from './order-buy-report-routing.module';
import { SharedModule } from 'src/app/_shared/shared.module';
import { MaterialSharedModule } from 'src/app/_shared/material-shared.module';
import { OrderBuyReportComponent } from './order-buy-report.component';
import { OrderBuyReportHomeComponent } from './order-buy-report-home/order-buy-report-home.component';
import { OrderBuyReportEmployeeComponent } from './order-buy-report-employee/order-buy-report-employee.component';
import { OrderBuyReportSupplierComponent } from '../../buy_reports/order-buy-report-supplier/order-buy-report-supplier.component';


@NgModule({
  declarations: [
    OrderBuyReportComponent,
    OrderBuyReportHomeComponent,
    OrderBuyReportEmployeeComponent,
    OrderBuyReportSupplierComponent
  ],
  imports: [
    // Shared module
    SharedModule,

    // Material
    MaterialSharedModule,

    // Routing
    OrderBuyReportRoutingModule
  ]
})
export class OrderBuyReportModule { }
