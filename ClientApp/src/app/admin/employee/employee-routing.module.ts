import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeComponent } from './employee.component';
import { EmployeeListHomeComponent } from './employee-list/employee-list-home.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent,
    children: [
      { path: '', redirectTo: '/admin/employee/home', pathMatch: 'full' },
      { path: 'home', component: EmployeeListHomeComponent },
      { path: 'create', component: EmployeeEditComponent },
      { path: ':employeeId/edit', component: EmployeeEditComponent },
      { path: ':employeeId', component: EmployeeDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {}
