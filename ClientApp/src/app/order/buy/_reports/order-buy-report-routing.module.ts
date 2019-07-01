import { OrderBuyReportHomeComponent } from './order-buy-report-home/order-buy-report-home.component';
import { OrderBuyReportComponent } from './order-buy-report.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderBuyReportSupplierPivotMonthComponent } from 'src/app/_shared/components/_buy/orders/_reports/order-buy-report-supplier-pivot-month/order-buy-report-supplier-pivot-month.component';
import { OrderBuyReportSupplierPivotQuarterComponent } from 'src/app/_shared/components/_buy/orders/_reports/order-buy-report-supplier-pivot-quarter/order-buy-report-supplier-pivot-quarter.component';


const routes: Routes = [
  {
    path: '',
    component: OrderBuyReportComponent,
    children: [
      { path: '', redirectTo: '/order-buy/report/home', pathMatch: 'full' },
      { path: 'home', component: OrderBuyReportHomeComponent },
      { path: 'supplier/pivot-month', component: OrderBuyReportSupplierPivotMonthComponent },
      { path: 'supplier/pivot-quarter', component: OrderBuyReportSupplierPivotQuarterComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderBuyReportRoutingModule {}
