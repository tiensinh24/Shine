import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierDetailComponent } from './supplier-detail/supplier-detail.component';
import { SupplierListHomeComponent } from './supplier-list/supplier-list-home.component';
import { SupplierComponent } from './supplier.component';

const routes: Routes = [
  {
    path: '',
    component: SupplierComponent,
    children: [
      { path: '', redirectTo: '/admin/supplier/home', pathMatch: 'full' },
      { path: 'home', component: SupplierListHomeComponent },
      { path: 'report', loadChildren: () => import('../../../main/_reports/supplier-report.module').then(m => m.SupplierReportModule) },
      { path: ':supplierId', component: SupplierDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }