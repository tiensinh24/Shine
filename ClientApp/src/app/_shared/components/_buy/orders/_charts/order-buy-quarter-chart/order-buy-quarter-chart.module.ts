import { OrderBuyQuarterChartComponent } from './order-buy-quarter-chart.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GoogleChartsModule } from 'angular-google-charts';
import { SharedModule } from 'src/app/_shared/shared.module';

@NgModule({
  declarations: [OrderBuyQuarterChartComponent],
  imports: [
    // Google chart
    GoogleChartsModule
  ],
  exports: [OrderBuyQuarterChartComponent]
})
export class OrderBuyQuarterChartModule {}
