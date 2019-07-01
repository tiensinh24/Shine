import { NgModule } from '@angular/core';
import { GoogleChartsModule } from 'angular-google-charts';
import { OrderBuyMonthChartComponent } from './order-buy-month-chart.component';
import { AngularResizedEventModule } from 'angular-resize-event';

@NgModule({
  declarations: [OrderBuyMonthChartComponent],
  imports: [
    // Google charts
    GoogleChartsModule,

    // Resize event
    AngularResizedEventModule
  ],
  exports: [
    OrderBuyMonthChartComponent,

    // Google charts
    GoogleChartsModule
  ]
})
export class OrderBuyMonthChartModule {}
