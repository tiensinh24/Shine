import { NgModule } from '@angular/core';
import { GoogleChartsModule } from 'angular-google-charts';

import { OrderBuyReportRoutingModule } from './order-buy-report-routing.module';
import { SharedModule } from 'src/app/_shared/shared.module';
import { MaterialSharedModule } from 'src/app/_shared/material-shared.module';
import { OrderBuyReportComponent } from './order-buy-report.component';
import { OrderBuyReportHomeComponent } from './order-buy-report-home/order-buy-report-home.component';
import { OrderBuyReportEmployeeComponent } from './order-buy-report-employee/order-buy-report-employee.component';
import { OrderBuyReportSupplierPivotMonthComponent } from '../../../_shared/components/_buy/_reports/order-buy-report-supplier-pivot-month/order-buy-report-supplier-pivot-month.component';
import { OrderBuyReportSupplierPivotMonthChartComponent } from '../../../_shared/components/_buy/_reports/order-buy-report-supplier-pivot-month/chart/order-buy-report-supplier-pivot-month-chart.component';
import { OrderBuyReportSupplierPivotMonthModule } from 'src/app/_shared/components/_buy/_reports/order-buy-report-supplier-pivot-month/order-buy-report-supplier-pivot-month.module';

@NgModule({
  declarations: [
    OrderBuyReportComponent,
    OrderBuyReportHomeComponent,
    OrderBuyReportEmployeeComponent,
    // OrderBuyReportSupplierPivotMonthComponent,
    // OrderBuyReportSupplierPivotMonthChartComponent
  ],
  imports: [
    // Shared module
    SharedModule,

    // Material
    MaterialSharedModule,

    OrderBuyReportSupplierPivotMonthModule,

    // Routing
    OrderBuyReportRoutingModule
  ]
})
export class OrderBuyReportModule {}
