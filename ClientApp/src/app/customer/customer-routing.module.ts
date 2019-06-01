import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerComponent } from './customer.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    children: [
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
export class CustomerRoutingModule {}
