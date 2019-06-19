import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderBuyReportComponent } from './order-buy-report.component';
import { OrderBuyReportHomeComponent } from './order-buy-report-home/order-buy-report-home.component';
import { OrderBuyReportEmployeeComponent } from './order-buy-report-employee/order-buy-report-employee.component';
import { OrderBuyReportSupplierComponent } from '../../buy_reports/order-buy-report-supplier/order-buy-report-supplier.component';


const routes: Routes = [
  {
    path: '',
    component: OrderBuyReportComponent,
    children: [
      { path: '', redirectTo: '/order-buy/report/home', pathMatch: 'full' },
      { path: 'home', component: OrderBuyReportHomeComponent },
      { path: 'employee', component: OrderBuyReportEmployeeComponent },
      { path: 'supplier', component: OrderBuyReportSupplierComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderBuyReportRoutingModule { }
