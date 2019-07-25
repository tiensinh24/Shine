import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/_guards/auth.guard';
import { AdminComponent } from './admin.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';

// Lazy-load child routes
const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: '/admin/home', pathMatch: 'full' },
      { path: 'home', component: AdminHomeComponent },
      {
        path: 'buy',
        canActivate: [AuthGuard],
        loadChildren: () => import('./_buy/admin-buy.module').then(m => m.AdminBuyModule)
      },
      { path: 'employee', canActivate: [AuthGuard], loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule) },
      { path: 'storage', canActivate: [AuthGuard], loadChildren: () => import('./storage/storage.module').then(m => m.StorageModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
