import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeHomeComponent } from './employee-home/employee-home.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';

const routes: Routes = [
  {
    path: '', component: EmployeeHomeComponent, children:
      [
        { path: '', redirectTo: '/employee/home', pathMatch: 'full' },
        { path: 'home', component: EmployeeHomeComponent },
        { path: 'detail', component: EmployeeDetailComponent },
        { path: 'edit', component: EmployeeEditComponent },
        { path: 'list', component: EmployeeListComponent }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
