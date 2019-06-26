import { NgModule } from '@angular/core';
import { GoogleChartsModule } from 'angular-google-charts';
import { OrderBuyMonthChartComponent } from './order-buy-month-chart.component';

@NgModule({
  declarations: [OrderBuyMonthChartComponent],
  imports: [
    // Google charts
    GoogleChartsModule
  ],
  exports: [
    OrderBuyMonthChartComponent,

    // Google charts
    GoogleChartsModule,
  ]
})
export class OrderBuyMonthChartModule {}
