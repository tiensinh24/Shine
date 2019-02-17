import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupplierHomeComponent } from './supplier-home/supplier-home.component';
import { SupplierDetailComponent } from './supplier-detail/supplier-detail.component';
import { SupplierEditComponent } from './supplier-edit/supplier-edit.component';
import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { SupplierComponent } from './supplier.component';

const routes: Routes = [
  {
    path: '', component: SupplierComponent, children:
      [
        { path: '', redirectTo: '/supplier/home', pathMatch: 'full' },
        { path: 'home', component: SupplierHomeComponent },
        { path: 'detail', component: SupplierDetailComponent },
        { path: 'edit', component: SupplierEditComponent },
        { path: 'list', component: SupplierListComponent }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }
