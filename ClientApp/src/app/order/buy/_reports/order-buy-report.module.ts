import { OrderBuyReportEmployeeComponent } from './order-buy-report-employee/order-buy-report-employee.component';
import { OrderBuyReportHomeComponent } from './order-buy-report-home/order-buy-report-home.component';
import { OrderBuyReportRoutingModule } from './order-buy-report-routing.module';
import { OrderBuyReportComponent } from './order-buy-report.component';
import { NgModule } from '@angular/core';
import { StarRatingModule } from 'angular-star-rating';
import { OrderBuyMonthChartModule } from 'src/app/_shared/components/_buy/_reports/_charts/order-buy-month-chart/order-buy-month-chart.module';
import { OrderBuyReportSupplierPivotMonthModule } from 'src/app/_shared/components/_buy/_reports/order-buy-report-supplier-pivot-month/order-buy-report-supplier-pivot-month.module';
import { OrderBuyReportSupplierPivotQuarterModule } from 'src/app/_shared/components/_buy/_reports/order-buy-report-supplier-pivot-quarter/order-buy-report-supplier-pivot-quarter.module';
import { SupplierReportDebtModule } from 'src/app/_shared/components/_buy/_reports/supplier-report-debt/supplier-report-debt.module';
import { MaterialSharedModule } from 'src/app/_shared/material-shared.module';
import { SharedModule } from 'src/app/_shared/shared.module';


@NgModule({
  declarations: [OrderBuyReportComponent, OrderBuyReportHomeComponent, OrderBuyReportEmployeeComponent],
  imports: [
    // Shared module
    SharedModule,

    // Material
    MaterialSharedModule,

    // Feather modules
    OrderBuyReportSupplierPivotMonthModule,
    OrderBuyReportSupplierPivotQuarterModule,
    OrderBuyMonthChartModule,
    StarRatingModule,
    SupplierReportDebtModule,

    // Routing
    OrderBuyReportRoutingModule
  ]
})
export class OrderBuyReportModule {}
