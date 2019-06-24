import { NgModule } from '@angular/core';
import { OrderBuyReportSupplierPivotQuarterComponent } from './order-buy-report-supplier-pivot-quarter.component';
import { OrderBuyReportSupplierPivotQuarterChartComponent } from './chart/order-buy-report-supplier-pivot-quarter-chart.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'src/app/_shared/shared.module';
import { GoogleChartsModule } from 'angular-google-charts';

@NgModule({
  declarations: [OrderBuyReportSupplierPivotQuarterComponent, OrderBuyReportSupplierPivotQuarterChartComponent],
  imports: [
    // Material
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,

    // Share module
    SharedModule,

    // Google charts
    GoogleChartsModule
  ],
  exports: [
    // Material
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,

    // Share module
    SharedModule,

    // Google charts
    GoogleChartsModule
  ]
})
export class OrderBuyReportSupplierPivotQuarterModule {}
