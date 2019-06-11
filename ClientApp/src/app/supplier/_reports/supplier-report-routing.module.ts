import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupplierReportComponent } from './supplier-report.component';
import { SupplierReportHomeComponent } from './supplier-report-home/supplier-report-home.component';
import { SupplierReportDebtComponent } from './supplier-report-debt/supplier-report-debt.component';

const routes: Routes = [
  {
    path: '',
    component: SupplierReportComponent,
    children: [
      { path: '', redirectTo: '/supplier/report/home', pathMatch: 'full' },
      { path: 'home', component: SupplierReportHomeComponent },
      { path: 'debt', component: SupplierReportDebtComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierReportRoutingModule { }
