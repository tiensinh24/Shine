import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerListComponent } from './customer-list/customer-list.component';

const routes: Routes = [
  {
    path: '', component: CustomerHomeComponent, children:
      [
        { path: '', redirectTo: '/customer/home', pathMatch: 'full' },
        { path: 'home', component: CustomerHomeComponent },
        { path: 'detail', component: CustomerDetailComponent },
        { path: 'edit', component: CustomerEditComponent },
        { path: 'list', component: CustomerListComponent }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
