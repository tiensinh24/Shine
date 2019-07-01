import { SupplierReportHomeComponent } from './supplier-report-home/supplier-report-home.component';
import { SupplierReportComponent } from './supplier-report.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierReportDebtComponent } from 'src/app/_shared/components/_buy/suppliers/_reports/supplier-report-debt/supplier-report-debt.component';


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
