import { NgModule } from '@angular/core';
import { GoogleChartsModule } from 'angular-google-charts';

import { OrderBuyReportRoutingModule } from './order-buy-report-routing.module';
import { SharedModule } from 'src/app/_shared/shared.module';
import { MaterialSharedModule } from 'src/app/_shared/material-shared.module';
import { OrderBuyReportComponent } from './order-buy-report.component';
import { OrderBuyReportHomeComponent } from './order-buy-report-home/order-buy-report-home.component';
import { OrderBuyReportEmployeeComponent } from './order-buy-report-employee/order-buy-report-employee.component';
import { OrderBuyReportSupplierComponent } from './order-buy-report-supplier/order-buy-report-supplier.component';
import { OrderBuyReportSupplierChartComponent } from './order-buy-report-supplier/order-buy-report-supplier-chart/order-buy-report-supplier-chart.component';

@NgModule({
  declarations: [
    OrderBuyReportComponent,
    OrderBuyReportHomeComponent,
    OrderBuyReportEmployeeComponent,
    OrderBuyReportSupplierComponent,
    OrderBuyReportSupplierChartComponent
  ],
  imports: [
    // Shared module
    SharedModule,

    // Material
    MaterialSharedModule,

    // Google charts
    GoogleChartsModule,

    // Routing
    OrderBuyReportRoutingModule
  ]
})
export class OrderBuyReportModule {}
