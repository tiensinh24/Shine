import { OrderBuyMonthChartComponent } from './order-buy-month-chart.component';
import { NgModule } from '@angular/core';
import { GoogleChartsModule } from 'angular-google-charts';

@NgModule({
  declarations: [OrderBuyMonthChartComponent],
  imports: [
    // Google charts
    GoogleChartsModule
  ],
  exports: [OrderBuyMonthChartComponent]
})
export class OrderBuyMonthChartModule {}
